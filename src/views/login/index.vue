<template>
  <div class="gvb_login">

    <div class="gvb_login_mask">
      <gvb_login_form @ok="ok"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, type Ref} from "vue";
import "@/assets/font.css"
import Gvb_login_form from "@/components/common/gvb_login_form.vue";
import {useRouter} from "vue-router";

const visible:Ref<Boolean> = ref(false)

const router = useRouter()

const form = reactive({
  user_name:"",
  password:""
})

const ok = () =>{
  let back = window.history.state.back
  if (back === null){ // 直接访问登录页面在登录成功后跳转到首页
    router.push({name:'index'})
    return
  }
  router.push(back)
}
</script>

<style lang="scss">
.gvb_login{
  background: url(/image/R-C.jpg) 50%/cover no-repeat;
  width: 100%;
  height: 100vh;
  .gvb_login_mask{
    width: 400px;
    height: 100%;
    position: absolute;
    right: 0;
    background-color: var(--login_bg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
  }
}
</style>