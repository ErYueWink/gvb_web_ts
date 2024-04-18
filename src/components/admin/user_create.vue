<template>
  <a-modal v-model:visible="props.visible" title="创建用户" :on-before-ok="createUser">
    <a-form ref="formRef" :model="form" >
      <a-form-item field="user_name" label="用户名"
                   :rules="[{required:true,message:'请输入用户名'}]"
                   :validate-trigger="['blur']"
      >
        <a-input v-model="form.user_name" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item field="nick_name" label="昵称"
                   :rules="[{required:true,message:'请输入用昵称'}]"
                   :validate-trigger="['blur']"
      >
        <a-input v-model="form.nick_name" placeholder="请输入昵称"></a-input>
      </a-form-item>
      <a-form-item field="password" label="密码"
                   :rules="[{required:true,message:'请输入密码'}]"
                   :validate-trigger="['blur']"
      >
        <a-input v-model="form.password" placeholder="请输入密码" type="password"></a-input>
      </a-form-item>
      <a-form-item field="re_password" label="确认密码"
                   :rules="[{required:true,message:'请再次输入密码'},{validator:restPasswordValidator}]"
                   :validate-trigger="['blur']"
      >
        <a-input v-model="form.re_password" placeholder="请再次输入密码" type="password"></a-input>
      </a-form-item>
      <a-form-item field="role" label="权限">
        <a-select v-model="form.role" :options="roleOptions"></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {userCreateApi, type userCreateType} from "@/api/user_api";
import {roleOptions} from "@/global/global";
import {Message} from "@arco-design/web-vue";

const formRef = ref();

const props = defineProps({
  visible:{
    type:Boolean
  }
})

const emits = defineEmits(["update:visible","ok"])
// 表单数据对象
const form = reactive<userCreateType&{re_password:string}>({
  user_name:"",
  nick_name:"",
  role:2,
  password:"",
  re_password:""
})

// 表单数据默认值
const defaultForm = reactive<userCreateType&{re_password:string}>({
  user_name:"",
  nick_name:"",
  role:2,
  password:"",
  re_password:""
})

// 密码二次校验
const restPasswordValidator = ( value: string , callback: (error?: string) => void ) => {
  if (value!==form.password) return callback("确认密码不一致")
}
// 创建用户
const createUser = async () =>{
  let value = await formRef.value.validate()
  // 校验失败
  if (value) return false

  let res = await userCreateApi(form)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("update:visible",false)
  emits("ok")

  Object.assign(form,defaultForm)
  return  true
}
</script>
<style scoped>

</style>