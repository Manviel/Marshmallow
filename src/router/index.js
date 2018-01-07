import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import Create from '@/components/Meetup/Create'
import Meet from '@/components/Meetup/Meet'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'

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
      component: Create
    },
    {
      path: '/meetups/:id',
      name: 'Meet',
      component: Meet
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
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
