import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeet (state, payload) {
      const id = payload.id
      if (state.user.registerMeetups.findIndex(meet => {
        return meet.id === id
      }) >= 0) {
        return
      }
      state.user.registerMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeet (state, payload) {
      const registerMeetups = state.user.registerMeetups
      registerMeetups.splice(registerMeetups.findIndex(meet => {
        return meet.id === payload
      }), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeet ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registration/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeet', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeet ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeet', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)

          const newUser = {
            id: user.uid,
            registerMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)

          const newUser = {
            id: user.uid,
            registerMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registerMeetups: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
        .then(data => {
          const facts = data.val()
          let registerMeetups = []
          let swapped = {}
          for (let key in facts) {
            registerMeetups.push(facts[key])
            swapped[facts[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registerMeetups: registerMeetups,
            fbKeys: swapped
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
