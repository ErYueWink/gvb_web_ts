<template>
  <div>
    <a-modal v-model:visible="props.visible" title="创建菜单" @cancel="emits('update:visible',false)" :on-before-ok="menuCreateOk">
      <a-form ref="formRef" :model="form" >
        <a-form-item field="title" label="菜单标题"
                     :rules="[{required:true,message:'请输入菜单标题'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="请输入菜单标题"></a-input>
        </a-form-item>
        <a-form-item field="path" label="菜单路径"
                     :rules="[{required:true,message:'请输入菜单路径'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.path" placeholder="请输入菜单路径"></a-input>
        </a-form-item>
        <a-form-item field="slogan" label="slogan">
          <a-input v-model="form.slogan" placeholder="请输入slogan"></a-input>
        </a-form-item>
        <a-form-item field="abstractString" label="简介">
          <a-textarea v-model="form.abstractString" placeholder="请输入简介" :auto-size="{minRows:2,maxRows:2}"></a-textarea>
        </a-form-item>
        <a-form-item field="banner_time" label="bannerT">
          <a-input-number v-model="form.banner_time" placeholder="请输入bannerT"></a-input-number>
          <template #extra>
            <div>轮播图切换时间</div>
          </template>
        </a-form-item>
        <a-form-item field="abstract_time" label="abstractT">
          <a-input-number v-model="form.abstract_time" placeholder="请输入abstractT"></a-input-number>
          <template #extra>
            <div>简介切换时间</div>
          </template>
        </a-form-item>
        <a-form-item field="sort" label="sort">
          <a-input-number v-model="form.sort" placeholder="请输入sort"></a-input-number>
          <template #extra>
            <div>数字越大优先级越高</div>
          </template>
        </a-form-item>
        <a-form-item field="banner图" label="banner图">
          <a-select v-model="form.image_sort_list" placeholder="请选择banner图"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import type { menuCreateRequest} from "@/api/menu_api";

const props = defineProps({
  visible:Boolean,
})

const emits = defineEmits(['update:visible']);

const formRef =ref()

const form = reactive<menuCreateRequest&{abstractString:string}>({
  title: "", // 菜单标题
  path: "", // 菜单路径
  slogan: "", // slogan
  abstract_time: 7, // 简介切换时间 default: 7s
  banner_time: 7, // 轮播图切换时间: 7s
  sort: 1, // 排序 优先级 数字越大优先级越高
  abstract:[], // 简介
  image_sort_list:[], // 图片列表
  abstractString:""
})

const menuCreateOk = async () =>{
  let val = await formRef.value.validate()
  if (val) return
  form.abstract = form.abstractString.split("\n")
  console.log(form)

}
</script>

<style lang="scss">

</style>