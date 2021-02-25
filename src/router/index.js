import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import TrendsServices from "../views/TrensdServices.vue";
import Home from "../views/Home.vue";
import PageSettigs from "../views/Settings.vue";
import PageUsers from "../views/Users.vue";
import { Services } from "../services";

Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
  },
  {
    path: "",
    component: Home,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta:{title:"Dashboard"}
      },
      {
        path: "/trends",
        name: "TrendsServices",
        component: TrendsServices,
      },
      {
        path: "/settings",
        name: "Settings",
        component: PageSettigs,
        meta:{title:"Settings"}
      },
      {
        path:"/users",
        name:"Users",
        title:"Users",
        component:PageUsers,
        meta:{title:"Users"}        
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {  
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!Services.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next("/");
  }
  const titlePage= to.meta.title;
  store.dispatch("dashboard/setTitlePage", titlePage);
  next();
});

export default router;
