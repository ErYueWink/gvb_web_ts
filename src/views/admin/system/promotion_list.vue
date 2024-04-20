<template>
  <div class="menu_list_view">
    <promotion_create v-model:visible="visible" :record="recordData" @ok="gvbTable.getList()"/>
    <gvb_table ref="gvbTable"
               :url="PromotionListApi"
               :columns="columns"
               default-delete
               no-confirm
               no-action-group
               add-label="创建广告"
               @add="add"
               @edit="edit"
               search-plack-holder="搜索广告名称">
      <template #images="{record}:{record:PromotionType}">
          <a-image height="40px" :src="record.images"/>
      </template>
      <template #href="{record}:{record:PromotionType}">
        <a-link :href="record.href" target="_blank">{{record.href}}</a-link>
      </template>
      <template #is_show="{record}:{record:PromotionType}">
        <a-tag v-if="record.is_show" color="arcoblue">显示</a-tag>
        <a-tag v-else>不显示</a-tag>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import {
  defaultPromotionForm,
  type PromotionCreateRequest,
  PromotionListApi,
  type PromotionType
} from "@/api/promotion_api";
import Promotion_create from "@/components/admin/promotion_create.vue";

const columns = [
  {title:'标题',dataIndex:'title'},
  {title:'图片',slotName:'images'},
  {title:'链接',slotName:'href'},
  {title:'是否显示',slotName:'is_show'},
  {title:'更新时间',slotName:'created_at'},
  {title:'操作',slotName:'action'},
]
const recordData = reactive<PromotionType>({
  title:"",
  href:"",
  images:"",
  is_show:false
})

const gvbTable = ref()

const visible = ref<boolean>(false)

const add = () =>{
  Object.assign(recordData,defaultPromotionForm)
  recordData.id = undefined
  visible.value = true
}

const edit = (record:PromotionType)=>{
  Object.assign(recordData,record)
  visible.value = true
}
</script>


<style lang="scss">

</style>