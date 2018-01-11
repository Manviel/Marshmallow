import Vue from 'vue'
import * as firebase from 'firebase'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import Alert from './components/Shared/Alert'
import EditDetails from './components/Meetup/EditDetails'
import EditDate from './components/Meetup/EditDate'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-dialog', EditDetails)
Vue.component('app-edit-date', EditDate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD87UtZoN64bJ0NOKPvTiLZCuDeitrsGjQ',
      authDomain: 'devmeetup-b8728.firebaseapp.com',
      databaseURL: 'https://devmeetup-b8728.firebaseio.com',
      projectId: 'devmeetup-b8728',
      storageBucket: 'devmeetup-b8728.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadEvents')
  }
})
