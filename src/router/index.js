import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'
import Coupons from '@/components/pages/Coupons'
import InformationCreate from '@/components/pages/InformationCreate'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Shopping from '@/components/Shopping'
import Home from '@/components/pages/Home'
import Beef from '@/components/pages/Beef'
import Chicken from '@/components/pages/Chicken'
import Pork from '@/components/pages/Pork'
import Seafood from '@/components/pages/Seafood'
import Meat from '@/components/pages/Meat'
import Location from '@/components/pages/Location'
import CartConfirm from '@/components/pages/CartConfirm'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login     
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Shopping',
      component: Shopping,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'beef',
          name: 'Beef',
          component: Beef,
        },
        {
          path: 'chicken',
          name: 'Chicken',
          component: Chicken,
        },
        {
          path: 'pork',
          name: 'Pork',
          component: Pork,
        },
        {
          path: 'seafood',
          name: 'Seafood',
          component: Seafood,
        },
        {
          path: 'meat/:productId',
          name: 'Meat',
          component: Meat,
        },
        {
          path: 'location',
          name: 'Location',
          component: Location,
        },
        {
          path: 'cart_confirm',
          name: 'CartConfirm',
          component: CartConfirm,
        },
        {
          path: 'information_create',
          name: 'InformationCreate',
          component: InformationCreate,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    }  
  ]
})
