<template>
  <div class="menu_list_view">
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
import {ref} from "vue";
import {PromotionListApi, type PromotionType} from "@/api/promotion_api";

const columns = [
  {title:'标题',dataIndex:'title'},
  {title:'图片',slotName:'images'},
  {title:'链接',slotName:'href'},
  {title:'是否显示',slotName:'is_show'},
  {title:'更新时间',slotName:'created_at'},
  {title:'操作',slotName:'action'},
]

const gvbTable = ref()

const visible = ref<boolean>(false)

const add = () =>{
  visible.value = true
}

const edit = (record:PromotionType)=>{
  visible.value = true
}
</script>


<style lang="scss">

</style>