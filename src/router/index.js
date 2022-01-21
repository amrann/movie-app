import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home'
import Movies from '../views/Movies'
import WatchList from '../views/WatchList'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/toprated',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/upcoming',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/playing',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/popular',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/popularshow',
      name: 'Shows',
      component: Movies
    },
    {
      path: '/top',
      name: 'Shows',
      component: Movies
    },
    {
      path: '/onshow',
      name: 'Shows',
      component: Movies
    },
    {
      path: '/airing',
      name: 'Shows',
      component: Movies
    },
    {
      path: '/watch',
      name: 'WatchList',
      component: WatchList
    }
  ]
})
