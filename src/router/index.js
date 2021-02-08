import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import TrendsServices from '../views/TrensdServices.vue'
import Home from '../views/Home.vue'
import store from '../plugins/store.js';
import PageSettigs from '../views/Settings.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'',
    component:Home,
    beforeEnter:(to,from,next)=>{            
      if(!store.state.status) {                        
        next({path:'/login'})
      }
      else next()
    },    
    children:[     
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard    
      },
      {
        path:'/trends',
        name:'TrendsServices',
        component:TrendsServices
      },
      {
        path:'/settings',
        name:'Settings',
        component:PageSettigs
      }    
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
