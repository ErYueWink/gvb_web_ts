<template>
  <div class="gvb_logo">
    <img :src="logoInfo.avatar" />
    <div class="logo_head">
      <div>{{logoInfo.nickName}}</div>
      <div>xiaoxiaozhidao</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "@/stores/counter";
import {reactive} from "vue";
const store = useStore()
const logoInfo = reactive({
  avatar:"",
  nickName:""
})
logoInfo.avatar = store.userInfo.avatar
logoInfo.nickName = store.userInfo.nick_name
</script>

<style lang="scss">
.gvb_logo{
  height: 90px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--bg);
  transition: all .3s;
  img{
    height: 60px;
    width: 60px;
    border-radius: 50%;
    transition: all .3s;
  }
  .logo_head{
    margin-left: 22px;
    transition: all .3s;
    >div:nth-child(1){
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    >div:nth-child(2){
      font-size: 12px;
    }
  }
}
.collapsed{
  .gvb_logo{
    padding: 2px;
    img{
      width: 42px;
      height: 42px;
    }
    .logo_head{
      display: none;
    }
  }
}
</style>