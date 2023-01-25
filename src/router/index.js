import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

// import blogsRouter from '@/router/modules/blogs'
import usersRouter from '@/router/modules/user'
import transactionsRouter from '@/router/modules/transaction'
import footerRouter from '@/router/modules/footer'
import systemsRouter from '@/router/modules/system'
import treeRouter from '@/router/modules/tree'
import teamRouter from '@/router/modules/team'
import matchRouter from '@/router/modules/match'
import tokenRouter from '@/router/modules/token'
import historyTokenRouter from '@/router/modules/history-token';

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/reset-password',
    component: () => import('@/views/login/reset-password'),
    name: 'Reset Password',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500'),
    hidden: true
  }
]

export const asyncRoutes = [
  // blogsRouter,
  usersRouter,
  transactionsRouter,
  footerRouter,
  systemsRouter,
  treeRouter,
  teamRouter,
  matchRouter,
  tokenRouter,
  historyTokenRouter,
  {
    path: '/',
    component: Layout,
    name: 'users',
    redirect: '/users'
  },
  {
    path: '/change-password',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/change-password/index'),
        name: 'Change Password',
        hidden: true
      }
    ]
  },
  {
    path: '/users/:id',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/users/_id'),
        name: 'Detail User',
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
