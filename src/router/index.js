import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import TrendsServices from '../views/TrensdServices.vue'
import Home from '../views/Home.vue'

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
      if(!sessionStorage.getItem('status')) {     
        alert("belum login")           
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
