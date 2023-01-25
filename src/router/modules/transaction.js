/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const usersRouter = {
  path: '/transactions',
  component: Layout,
  name: 'transactions',
  redirect: '/transactions',
  children: [
    {
      path: '',
      component: () => import('@/views/transactions/index'),
      name: 'transactions_list',
      meta: { title: 'Lịch sử giao dịch', icon: 'el-icon-refresh', affix: true }
    }
  ]
}
export default usersRouter
