/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  name: 'users',
  redirect: '/users',
  children: [
    {
      path: '',
      component: () => import('@/views/users/index'),
      name: 'users_list',
      meta: { title: 'Quản lý người dùng', icon: 'el-icon-user', affix: true }
    }
  ]
}
export default usersRouter
