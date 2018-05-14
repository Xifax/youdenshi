import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'parser',
      component: require('@/components/Parser').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
