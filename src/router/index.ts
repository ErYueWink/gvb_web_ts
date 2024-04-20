import {createRouter, createWebHistory, type RouteMeta} from 'vue-router'
import {useStore} from "@/stores/counter";
import {Message} from "@arco-design/web-vue";

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
        title:'首页',
        isLogin:true
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
            title:'文章管理',
            isLogin:true,
            isAdmin:false,
            isTourist:false
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
            title:'用户管理',
            isLogin:true,
            isAdmin:true,
            isTourist:false
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
            title:'个人中心',
            isLogin:true
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
            title:'群聊管理',
            isLogin:true,
            isAdmin:true,
            isTourist:false
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
            title:'系统管理',
            isLogin:true,
            isAdmin:true,
            isTourist:false
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
              path: 'promotion_list',
              name:'promotion_list',
              meta:{
                title:'广告管理'
              },
              component:()=>import('../views/admin/system/promotion_list.vue'),
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

// 路由前置导航
router.beforeEach((to,from,next) =>{
  const store = useStore()
  const meta = to.meta
  if (meta.isLogin && !store.isLogin){
    // 需要登录，但是没有登录
    Message.warning("请先登录")
    router.push({name:from.name as string})
    return
  }
  /**
   * isLogin 登录就能访问
   * isAdmin 管理员能访问
   * isTourist 游客能访问
   */
  if (store.userInfo.role === 2 && (meta.isAdmin || meta.isTourist)){
    // 普通用户不能访问管理员或者游客的页面
    Message.warning("权限不足")
    router.push({name:from.name as string})
    return;
  }
  // 如果我是游客那就不能访问游客权限为false的
  if (store.isTourist && meta.isTourist == false){
    Message.warning("权限不足")
    router.push({name:from.name as string})
    return;
  }
  next()
})

export default router
