<template>
  <div class="menu_list_view">
    <menu_create v-model:visible="visible" @ok="gvbTable.getList()" :record="recordData"/>
    <gvb_table ref="gvbTable"
               :url="menuListApi"
               :columns="columns"
               default-delete
               no-confirm
               no-action-group
               no-check
               no-page
               add-label="创建菜单"
               @add="add"
               @edit="edit"
               search-plack-holder="搜索菜单名称">
      <template #banners="{record}:{record:menuType}">
        <div class="menu_column_image">
          <a-image v-for="item in record.banners" :key="item.id"
                   alt="图片加载失败" height="40px" :src="item.path"/>
        </div>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {type bannerType, defaultMenuForm, type menuCreateRequest, menuListApi, type menuType} from "@/api/menu_api";
import Menu_create from "@/components/admin/menu_create.vue";

const columns = [
  {title:'菜单标题',dataIndex:'title'},
  {title:'路径',dataIndex:'path'},
  {title:'slogan',dataIndex:'slogan'},
  {title:'简介',dataIndex:'abstract'},
  {title:'slogan切换时间',dataIndex:'banner_time'},
  {title:'简介切换时间',dataIndex:'abstract_time'},
  {title:'banner',slotName:'banners'},
  {title:'更新时间',slotName:'created_at'},
  {title:'操作',slotName:'action'},
]

const gvbTable = ref()

const recordData = reactive<menuCreateRequest & {banners:bannerType[]} & {id?:number}>({
  title: "", // 菜单标题
  path: "", // 菜单路径
  slogan: "", // slogan
  abstract_time: 7, // 简介切换时间 default: 7s
  banner_time: 7, // 轮播图切换时间: 7s
  sort: 1, // 排序 优先级 数字越大优先级越高
  abstract:[], // 简介
  image_sort_list:[], // 图片列表
  banners:[],
})

const visible = ref<boolean>(false)

const add = () =>{
  Object.assign(recordData,defaultMenuForm)
  recordData.id = undefined
  recordData.banners = []
  visible.value = true
}

const edit = (record:menuType)=>{
  Object.assign(recordData,record)
  visible.value = true
}
</script>


<style lang="scss">
.menu_list_view{
  .menu_column_image{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-row-gap:5px;
    .arco-image-img{
    border-radius: 5px;
  }

  }
}
</style>