import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        src: 'https://cdn-images-1.medium.com/max/1600/1*rZlNowT1EIcDay1uV8nzQw.jpeg',
        id: '1',
        title: 'Amsterdam',
        date: '2018-04-13'
      },
      {
        src: 'http://ukamenterprises.com/wp-content/uploads/2015/07/Ni7326971.jpg',
        id: '2',
        title: 'Kyiv',
        date: '2018-03-18'
      }
    ],
    user: {
      id: '11',
      registerMeetups: ['1']
    }
  },
  mutations: {},
  actions: {},
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
