/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemsRouter = {
  path: '/systems-info',
  component: Layout,
  name: 'systems-info',
  redirect: '/systems-info',
  children: [
    {
      path: '',
      component: () => import('@/views/system/index'),
      name: 'systems',
      meta: { title: 'Thống kê hệ thống', icon: 'el-icon-s-claim', affix: true }
    }
  ]
}
export default systemsRouter
