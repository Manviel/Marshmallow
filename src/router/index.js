import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import Create from '@/components/Meetup/Create'
import Meet from '@/components/Meetup/Meet'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Guard from './guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/new',
      name: 'Create',
      component: Create,
      beforeEnter: Guard
    },
    {
      path: '/meetups/:id',
      name: 'Meet',
      props: true,
      component: Meet
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
