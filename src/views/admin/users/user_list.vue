<template>
  <div>
    <user_create v-model:visible="visible" @ok="ok" />
    <a-modal v-model:visible="updateVisible" title="修改用户" :on-before-ok="updateUserOk">
      <a-form ref="formRef" :model="updateForm" >
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入用昵称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="updateForm.nick_name" placeholder="请输入昵称"></a-input>
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select v-model="updateForm.role" :options="roleOptions"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb_table ref="gvbTable" :url="userListApi"
               :columns="columns"
               default-delete
               add-label="创建用户"
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
import {type userInfoType, userListApi, userUpdateApi, type userUpdateType} from "@/api/user_api";
import {roleIdListApi} from "@/api/role_api";
import type {RecordType} from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import User_create from "@/components/admin/user_create.vue";
import {roleOptions} from "@/global/global";
import {Message} from "@arco-design/web-vue";
const formRef = ref();
const gvbTable = ref()

// 默认不显示
const updateVisible = ref<boolean>(false)

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

const visible = ref<boolean>(false)

const add = () =>{
  visible.value = true
}

const updateForm = reactive<userUpdateType>({
  user_id:0,
  nick_name:"",
  role:0
})


const edit = (record:RecordType<userInfoType>) =>{
  updateForm.user_id = record.id
  updateForm.nick_name = record.nick_name
  updateForm.role = record.role_id
  // 打开弹出框
  updateVisible.value = true
}

const remove = (id) =>{
  console.log(id)
}


const updateUserOk = async () =>{
  let val = await formRef.value.validate()
  // 校验失败
  if (val) return false
  let res = await userUpdateApi(updateForm)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  gvbTable.value.getList()
  return true
}


const ok = () =>{
  gvbTable.value.getList()
}
</script>

<style scoped>

</style>