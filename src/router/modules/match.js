/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const matchRouter = {
  path: '/match',
  component: Layout,
  name: 'match',
  redirect: '/match',
  children: [
    {
      path: '',
      component: () => import('@/views/match/list'),
      name: 'match_list',
      meta: { title: 'Trận đấu', icon: 'el-icon-video-play', affix: true }
    }
  ]
}
export default matchRouter
