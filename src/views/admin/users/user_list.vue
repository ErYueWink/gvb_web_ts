<template>
  <div>
    <a-modal v-model:visible="visible" title="创建用户" :on-before-ok="createUser">
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
          <a-select v-model="form.role" :options="options"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb_table ref="gvbTable" :url="userListApi"
               :columns="columns"
               default-delete
               @add="add"
               @edit="edit"
               @remove="remove"
               :action-group="actionGroup"
               :action-filter-group="actionFilterGroup"
               search-plack-holder="搜索用户"
               >
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar_id" />
      </template>
    </gvb_table>
  </div>
</template>
<script setup lang="ts">
import Gvb_table, {type optionType} from "@/components/admin/gvb_table.vue";
import {userCreateApi, type userCreateType, type userInfoType, userListApi} from "@/api/user_api";
import {roleIdListApi} from "@/api/role_api";
import type {RecordType} from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import type {commonOptionType} from "@/types";
import {Message} from "@arco-design/web-vue";

const formRef = ref();
const gvbTable = ref()
// 控制弹出框显示与隐藏
const visible = ref<boolean>(false)

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

// 用户权限
const options = ref<commonOptionType[]>([
  {label:'超级管理员',value:1},
  {label:'普通用户',value:2},
  {label:'游客',value:3}
])
const actionGroup :optionType[]= [
  {label:'批量拉黑',
    callback:async (idList: (string | number)[]) :Promise<boolean> =>{
      return true
    }
  }
]

const actionFilterGroup = [
  {
    label:'角色过滤',
    value:0,
    column:'role',
    source: roleIdListApi

  }
]
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '昵称',
    dataIndex: 'nick_name',
  },
  {
    title: '头像',
    slotName: 'avatar',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '注册来源',
    dataIndex: 'sign_status',
  },
  {
    title: 'ip',
    dataIndex: 'ip',
  },
  {
    title: '地址',
    dataIndex: 'addr',
  },
  {
    title: '注册时间',
    slotName: 'created_at',
  },
  {
    title:'操作',
    slotName: 'action'
  }

]

const add = () =>{
  visible.value = true
}

const edit = (record:RecordType<userInfoType>) =>{
  console.log(record)
}

const remove = (id) =>{
  console.log(id)
}

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
  // 关闭弹出框
  visible.value = false
  // 刷新列表
  gvbTable.value.getList()
  Object.assign(form,defaultForm)
  return  true
}
</script>

<style scoped>

</style>