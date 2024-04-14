<template>
  <div class="gvb_menu">
    <a-menu @menu-item-click="clickMenu"
            v-model:selected-keys="selectedKeys"
            v-model:open-keys="openKeys"
            show-collapse-button
            @collapse="collapse">
      <template v-for="item in MenuList" :key="item.key">
        <a-menu-item :key="item.name" v-if="item.child?.length === 0">
          {{item.title}}
          <template #icon>
            <component :is="item.icon"/>
          </template>
        </a-menu-item>
        <a-sub-menu v-else :key="item.name">
          <template #icon>
            <component :is="item.icon"/>
          </template>
          <template #title>
            {{item.title}}
          </template>
          <a-menu-item :key="sub.name" v-for="sub in item.child">
            {{sub.title}}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import  {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useStore} from "@/stores/counter";

import {type Component, ref, watch} from "vue";
import {IconMenu, IconUser} from "@arco-design/web-vue/es/icon";
const router = useRouter()
const route = useRoute()
const store = useStore()
interface MenuType{
  key: string
  title: string
  icon?: Component
  name?: string
  child: MenuType[]
}
const MenuList : MenuType[] = [
  {key:"1",title:"首页",icon:IconMenu,name:"home",child:[]},
  {key:"2",title:"个人中心",icon:IconUser,name:"user_center",child:[
      {key:"2_1",title:"我的信息",name:"user_info",child:[]},
    ]},
  {key:"3",title:"文章管理",icon:IconMenu,name:"article",child:[
      {key:"3_1",title:"文章列表",name:"article_list",child:[]},
    ]},
  {key:"4",title:"用户管理",icon:IconMenu,name:"user",child:[
      {key:"4_1",title:"用户列表",name:"user_list",child:[]},
    ]},
  {key:"5",title:"群聊管理",icon:IconMenu,name:"chat_group",child:[
      {key:"5_1",title:"聊天记录",name:"chat_list",child:[]},
    ]},
  {key:"6",title:"系统管理",icon:IconMenu,name:"system",child:[
      {key:"6_1",title:"菜单列表",name:"menu_list",child:[]},
      {key:"6_2",title:"系统日志",name:"log_list",child:[]},
    ]},

]

const selectedKeys = ref([route.name]) // 刷新页面后选中的路由
const openKeys = ref([route.matched[1].name])
// 点击菜单时触发的事件
const clickMenu = (name:string) =>{
  router.push({
    name:name
  })
}

// 侧边栏菜单跟随路由变化
watch(()=>route.name,()=>{
  selectedKeys.value = [route.name]// 刷新页面后选中的路由
  openKeys.value = [route.matched[1].name]
})

// 折叠菜单事件
const collapse = (collapsed :boolean) =>{
  store.setCollapse(collapsed)
}

</script>

<style lang="scss">
.gvb_menu{
  .arco-menu{
    position: inherit;
    .arco-menu-collapse-button{
      position: absolute;
      top: 50%;
      right: 0;
      opacity: 0;
      transition: all .3s;
      transform: translate(50%,-50%);
    }
  }
}
aside:hover{
  .arco-menu{
    .arco-menu-collapse-button{
      opacity: 1;
    }
  }
}
</style>