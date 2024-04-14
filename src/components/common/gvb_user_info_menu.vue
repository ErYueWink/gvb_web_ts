<template>
  <div class="gvb_user_info_menu">
    <a-dropdown @select="select" class="gvb_dropdown">
      <div class="gvb_user_info_menu_dropdown">
        <a-image :src="store.userInfo.avatar" />
        <span class="gvb_user_info_menu_dropdown_span">{{store.userInfo.nick_name}}</span>
        <IconDown />
      </div>
      <template #content>
        <template v-for="(item,index) in dropInfoList" :key="index" >
          <a-dgroup v-if="item.type === 'line'"></a-dgroup>
          <a-doption v-else :value="item.name">{{item.title}}</a-doption>
        </template>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">

import {IconDown} from "@arco-design/web-vue/es/icon";
import {useStore} from "@/stores/counter";
import type {tabType} from "@/types";
import {useRouter} from "vue-router";
import {Message} from "@arco-design/web-vue";

const dropInfoList: dopType[] = [
  {title:'文章管理',name:'article_list'},
  {title:'用户列表',name:'user_list'},
  {title:'系统日志',name:'log_list'},
  {title:"",name:"",type:"line"},
  {title:'注销退出',name:'logout'},
  {title:'登录',name:'login'},
]

const store = useStore()
const router = useRouter()

interface dopType extends tabType{
  type?:string
}

const select = (value :any) =>{
  let val = (value as string)
  if (val === 'logout'){
    store.logout() // 退出登录
    router.push({name:'index'}) // 跳转到首页
    Message.success('注销成功')
    return
  }
  router.push({
    name:val
  })
}
</script>

<style lang="scss">
.gvb_dropdown{
  .arco-dropdown-group-title{
    &::after{
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--bg);


    }
  }
}
</style>