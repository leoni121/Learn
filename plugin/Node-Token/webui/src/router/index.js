import Vue from 'vue';
import Router from 'vue-router';
import Login from 'views/login.vue';
import store from '../store';
const notFind = () => import('components/notFind.vue');
const checkToken = () => import(/* webpackChunkName: "about" */ 'views/checkToken.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/checkToken',
      name: 'about',
      meta: {
        requireAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: checkToken()
    },
    {
      path: '/notFind',
      name: 'notFind',
      meta: {
        requireAuth: false
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: notFind
    },
    {
      path: '*',
      meta: {
        requireAuth: false
      },
      component: notFind
    }
  ]
});

router.beforeEach((to, form, next) => {
  const token = store.getters.getToken;
  if (!to.meta.requireAuth) { // 不需要登录
    next();
  } else { // 需要登录
    // localStorage.getItem('token')
    if (token) { // token
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }
});

router.afterEach(route => {
  window.scroll(0, 0);
});

export default router;
