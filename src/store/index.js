import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        src: 'https://cdn-images-1.medium.com/max/1600/1*rZlNowT1EIcDay1uV8nzQw.jpeg',
        id: '1',
        title: 'React Amsterdam',
        date: '2018-04-13',
        location: 'Amsterdam',
        description: 'Come in'
      },
      {
        src: 'http://ukamenterprises.com/wp-content/uploads/2015/07/Ni7326971.jpg',
        id: '2',
        title: 'FwDays',
        date: '2018-03-18',
        location: 'Kyiv',
        description: 'Join us'
      }
    ],
    user: {
      id: '11',
      registerMeetups: ['1']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        src: payload.src,
        description: payload.description,
        id: '101',
        date: payload.date
      }
      commit('createMeetup', meetup)
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
})
