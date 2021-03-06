import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/catalog/Catalog'
import vCart from '../components/cart/Cart'
import vMainPage from '../components/main-page/MainPage'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: vMainPage
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: vCatalog,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true
    }
  ]
})

export default router;
