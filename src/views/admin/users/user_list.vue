<template>
  <div>
    <gvb_table :url="userListApi" :columns="columns" default-delete @add="add" @edit="edit" @remove="remove">
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar_id" />
      </template>
    </gvb_table>
  </div>
</template>
<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";

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

}

const edit = (record) =>{
  console.log(record)
}

const remove = (id) =>{
  console.log(id)
}
</script>

<style scoped>

</style>