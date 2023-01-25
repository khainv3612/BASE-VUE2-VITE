/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const treeRouter = {
  path: '/tree',
  component: Layout,
  name: 'tree',
  redirect: '/tree',
  children: [
    {
      path: '',
      component: () => import('@/views/tree/index'),
      name: 'tree_list',
      meta: { title: 'Mạng lưới', icon: 'el-icon-s-data', affix: true }
    }
  ]
}
export default treeRouter
