/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const historyTokenRouter = {
  path: '/history-token',
  component: Layout,
  name: 'history-token',
  redirect: '/history-token',
  meta: { title: 'Lịch sử Token', icon: 'el-icon-share', affix: true },
  children: [
    {
      path: 'buy',
      component: () => import('@/views/history-token/history-buy'),
      name: 'buy',
      meta: { title: 'Lịch sử mua', icon: 'el-icon-money', affix: true }
    },
    {
      path: 'open-box',
      component: () => import('@/views/history-token/history-openbox'),
      name: 'open-box',
      meta: { title: 'Lịch sử mở hộp', icon: 'el-icon-present', affix: true }
    },
    {
      path: 'reward',
      component: () => import('@/views/history-token/history-reward'),
      name: 'reward',
      meta: { title: 'Lịch sử trả thưởng', icon: 'el-icon-star-on', affix: true }
    }
  ]
}
export default historyTokenRouter
