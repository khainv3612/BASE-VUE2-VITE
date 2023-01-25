/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tokenRouter = {
  path: '/token',
  component: Layout,
  name: 'token',
  redirect: '/token',
  children: [
    {
      path: '',
      component: () => import('@/views/token/list'),
      name: 'token_list',
      meta: { title: 'Token', icon: 'el-icon-star-on', affix: true }
    }
  ]
}
export default tokenRouter
