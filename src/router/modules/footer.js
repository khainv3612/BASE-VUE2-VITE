/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const footerRouter = {
  path: '/footer',
  component: Layout,
  name: 'footer',
  redirect: '/footer',
  children: [
    {
      path: '',
      component: () => import('@/views/setting/index'),
      name: 'footer_list',
      meta: { title: 'Cài đặt Footer', icon: 'el-icon-s-tools', affix: true }
    }
  ]
}
export default footerRouter
