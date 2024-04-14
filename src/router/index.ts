import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'web',
      // @ts-ignore
      component: () => import('../views/web/web.vue'),
      children: [
        { // 前台首页
          path: '',
          name:'index',
          component: () => import('../views/web/index.vue'),
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/login/index.vue'),
    },
    {
      path:'/admin',
      name:"admin",
      meta:{
        title:'首页'
      },
      component: () => import('../views/admin/index.vue'),
      children:[
        { // 后台首页
          path: '',
          name:'home',
          meta:{
            title:'Home'
          },
          component: () => import('../views/admin/home/index.vue'),
        },
        {
          path:'article',
          name:'article',
          meta:{
            title:'文章管理'
          },
          children:[
            {
              path:'article_list',
              name:'article_list',
              meta:{
                title:'文章列表'
              },
              component:()=>import('../views/admin/article/article_list.vue'),
            }
          ]
        },
        {
          path:'user',
          name:'user',
          meta:{
            title:'用户管理'
          },
          children:[
            {
              path: 'user_list',
              name:'user_list',
              meta:{
                title:'用户列表'
              },
              component: ()=>import('../views/admin/users/user_list.vue')
            }
          ]
        },
        {
          path: 'user_center',
          name:'user_center',
          meta:{
            title:'个人中心'
          },
          children:[
            {
              path: 'user_info',
              name:'user_info',
              meta:{
                title:'个人信息'
              },
              component:()=>import('../views/admin/user_center/user_info.vue'),
            }
          ]
        },
        {
          path: 'chat_group',
          name:'chat_group',
          meta:{
            title:'群聊管理'
          },
          children:[
            {
              path: 'chat_list',
              name:'chat_list',
              meta:{
                title:'聊天记录'
              },
              component:()=>import('../views/admin/chat_group/chat_list.vue'),
            }
          ]
        },
        {
          path:'system',
          name:'system',
          meta:{
            title:'系统管理'
          },
          children:[
            {
              path: 'menu_list',
              name:'menu_list',
              meta:{
                title:'菜单管理'
              },
              component:()=>import('../views/admin/system/menu_list.vue'),
            },
            {
              path: 'log_list',
              name:'log_list',
              meta:{
                title:'系统日志'
              },
              component:()=>import('../views/admin/system/log_list.vue'),
            }

          ]
        }
      ]
    }
  ]
})

export default router
