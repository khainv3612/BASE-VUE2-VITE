/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const teamRouter = {
  path: '/team',
  component: Layout,
  name: 'team-info',
  redirect: '/team',
  meta: { title: 'World Cup', icon: 'el-icon-user-solid', affix: true },
  children: [
    {
      path: 'groups',
      component: () => import('@/views/team/group'),
      name: 'groups',
      meta: { title: 'Nhóm hạt giống', icon: 'el-icon-s-claim', affix: true }
    },
    {
      path: 'list',
      component: () => import('@/views/team/list'),
      name: 'list-team',
      meta: { title: 'Đội tuyển', icon: 'el-icon-football', affix: true }
    }
  ]
}
export default teamRouter
