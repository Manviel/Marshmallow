import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
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
    }
  },
  actions: {
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
    }
  }
}
