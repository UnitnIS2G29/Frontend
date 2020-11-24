import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Categories from '../views/Categories.vue'
import Departments from '../views/Departments.vue'
import Timers from '../views/Timers.vue'
import RequestTimeOff from '../views/RequestTimeOff.vue'
import AcceptRequestTimeOff from '../views/AcceptRequestTimeOff.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/timers',
    name: 'Timers',
    component: Timers,
  },
  {
    path: '/requestTimeOff',
    name: 'RequestTimeOff',
    component: RequestTimeOff,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/acceptRequestTimeOff',
    name: 'AcceptRequestTimeOff',
    component: AcceptRequestTimeOff,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem("user-token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("user-token") == null) {
      next();
    } else {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});


export default router
