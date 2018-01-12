import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
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
    setLoadedEvents (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meet = state.loadedMeetups.find(meet => {
        return meet.id === payload.id
      })
      if (payload.title) {
        meet.title = payload.title
      }
      if (payload.description) {
        meet.description = payload.description
      }
      if (payload.date) {
        meet.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state, payload) {
      state.error = null
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
    loadEvents ({commit}) {
      commit('setLoading', true)

      firebase.database().ref('events').once('value')
        .then(data => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            events.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              src: obj[key].src,
              location: obj[key].location,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedEvents', events)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', true)
        })
    },
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let key
      let src
      firebase.database().ref('events').push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('events/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          src = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('events').child(key).update({src: src})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            src: src,
            id: key
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('events').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
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
    logOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeet (state) {
      return (meetID) => {
        return state.loadedMeetups.find((meet) => {
          return meet.id === meetID
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
