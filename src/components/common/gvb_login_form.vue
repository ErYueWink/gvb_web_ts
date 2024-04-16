<template>
    <a-form class="gvb_login_form" ref="formRef"  :model="form" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
      <div class="title">用户登录</div>
      <a-form-item field="user_name" label="用户名"
                   :rules="[{required:true,message:'请输入用户名'}]"
                   :validate-trigger="['blur']"
      >
        <a-input v-model="form.user_name" placeholder="请输入用户名">
          <template #prefix>
            <IconUser />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" label="密码"
                   :rules="[{required:true,message:'请输入密码'}]"
                   :validate-trigger="['blur']"
      >
        <a-input v-model="form.password" placeholder="请输入密码" type="password">
          <template #prefix>
            <IconLock />
          </template>
        </a-input>
      </a-form-item>
      <a-button type="primary" @click="loginEmail">
        登录
      </a-button>
      <div class="other-login">
        <div class="label">第三方登录</div>
        <div class="icons">
          <a href="#">
            <img src="/image/icon/qq.png" />
          </a>
          <a href="#">
            <img src="/image/icon/no_public.png" />
          </a>
        </div>
      </div>
    </a-form>
</template>
<script setup lang="ts">

import {IconLock, IconUser} from "@arco-design/web-vue/es/icon";
import "@/assets/font.css"
import {reactive, ref} from "vue";
import {loginEmailApi} from "@/api/user_api";
import {loginEmailType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores/counter";

const form = reactive<loginEmailType>({
  user_name:"",
  password:""
})

const store = useStore()

const formRef = ref()

const emits = defineEmits(['ok'])

// 邮箱登录
async function loginEmail(){
  // 进行表单校验
  let val = await formRef.value.validate()
  // 校验失败
  if (val){
    Message.error("表单校验失败")
    return
  }
  let res = await loginEmailApi(form)
  console.log(res)
  if (res.code){
    return
  }
  Message.success(res.msg)
  // 登录成功保存token
  store.setToken(res.data)
  console.log(res.data)
  // 登录成功后关闭弹窗，传递自定义事件
  emits('ok')
}

// 重置表单数据
function formReset(){
  formRef.value.resetFields(Object.keys(form))
  formRef.value.clearValidate(Object.keys(form))
}

// 导出，父类可以访问
defineExpose({
  formReset
})
</script>
<style lang="scss">
.title{
  font-size: 24px;
  font-weight: 700;
  color: var(--active);
  text-align: center;
  margin-bottom: 20px;
  font-family: xindong;
}
.other-login{
  margin-top: 20px;
  .label{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-3);
    &::before{
      display: inline-flex;
      width: 35%;
      height: 1px;
      content: "";
      background-color: var(--color-text-4);
    }
    &::after{
      display: inline-flex;
      content: "";
      height: 1px;
      width: 35%;
      background-color: var(--color-text-4);
    }
  }
  .icons{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    > a {
      margin-right: 10px;
    }
    &:last-child{
      margin-right: 0;
    }
    img{
      width: 40px;
      height: 40px;
    }
  }
}
</style>