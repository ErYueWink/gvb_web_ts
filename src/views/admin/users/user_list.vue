<template>
  <div>
    <user_create v-model:visible="visible" @ok="ok" />
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
import { type userInfoType, userListApi} from "@/api/user_api";
import {roleIdListApi} from "@/api/role_api";
import type {RecordType} from "@/components/admin/gvb_table.vue";
import { ref} from "vue";
import User_create from "@/components/admin/user_create.vue";
const formRef = ref();
const gvbTable = ref()

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

const edit = (record:RecordType<userInfoType>) =>{
  console.log(record)
}

const remove = (id) =>{
  console.log(id)
}



const ok = () =>{
  gvbTable.value.getList()
}
</script>

<style scoped>

</style>