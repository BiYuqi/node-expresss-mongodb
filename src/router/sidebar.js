import Main from '@/views/Main'
// 侧边栏路由一般都放在这里 需要权限校验
export const baseRoute = [
  {
    path: '',
    component: Main,
    title: '商品管理',
    icon: 'dashboard',
    name: 'dashboard',
    redirect: '/shop-list',
    children: [
      {
        path: 'shop-list',
        name: 'shop-list',
        meta: {
          title: '商品列表'
        },
        component: () => import('@/views/components/shopList.vue')
      },
      {
        path: 'shop-add',
        name: 'shop-add',
        meta: {
          title: '添加商品'
        },
        component: () => import('@/views/components/shopAdd.vue')
      }
    ]
  },
  {
    path: '/icon',
    title: '系统设置',
    name: 'icon',
    icon: 'icon',
    component: Main,
    children: [
      {
        path: 'class-list',
        name: 'class-list',
        meta: {
          title: '用户创建'
        },
        component: () => import('@/views/icon-page/index.vue')
      },
      {
        path: 'class-add',
        name: 'class-add',
        meta: {
          title: '全局设置'
        },
        component: () => import('@/views/icon-page/index.vue')
      }
    ]
  }
]
