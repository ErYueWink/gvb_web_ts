<template>
  <div>
    <a-modal v-model:visible="props.visible" :title="editId ? '编辑菜单' : '创建菜单'"
             @cancel="emits('update:visible',false)" @before-open="beforeOpen" :on-before-ok="menuCreateOk">
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
          <a-select v-model="form.imageIDList" multiple placeholder="请选择banner图" allow-clear>
            <a-option :value="item.id" v-for="item in imageList">
              <div class="gvb_banner_select">
                <a-image height="40" :src="item.path"/>
                <span>{{item.name}}</span>
              </div>
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {
  type bannerType,
  defaultMenuForm,
  type imageIDSortList,
  menuCreateApi,
  type menuCreateRequest, menuUpdateApi
} from "@/api/menu_api";
import type {imageIDType} from "@/api/image_api";
import {imagesNameListApi} from "@/api/image_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  visible:boolean,
  record:menuCreateRequest&{banners:bannerType[]}&{id?:number}
}

const props = defineProps<Props>()

const emits = defineEmits(['update:visible']);

const editId = ref<number|undefined>(undefined)

const formRef =ref()

const form = reactive<menuCreateRequest&{abstractString:string}&{imageIDList:number[]}>({
  title: "", // 菜单标题
  path: "", // 菜单路径
  slogan: "", // slogan
  abstract_time: 7, // 简介切换时间 default: 7s
  banner_time: 7, // 轮播图切换时间: 7s
  sort: 1, // 排序 优先级 数字越大优先级越高
  abstract:[], // 简介
  image_sort_list:[], // 图片列表
  abstractString:"",
  imageIDList:[]
})

// 打开弹出框前触发的事件
const beforeOpen = () =>{
  Object.assign(form,props.record)
  // abs
  form.abstractString = form.abstract.join("\n")
  // banners
  const imageIdList: number[] = []
  for (const banner of props.record.banners) {
    imageIdList.push(banner.id)
  }
  form.imageIDList = imageIdList
  editId.value = props.record.id
}

const menuCreateOk = async () =>{
  let val = await formRef.value.validate()
  if (val) return false
  form.abstract = form.abstractString.split("\n")
  let imageSortIDList: imageIDSortList[] = []
  for (let i = 0; i < form.imageIDList.length; i++) {
    let image = form.imageIDList[i]
    imageSortIDList.push({
      image_id: image,
      sort:form.imageIDList.length - i
    })
  }
  form.image_sort_list = imageSortIDList
  let res
  if (editId.value){
    res = await menuUpdateApi(editId.value as number,form)
  }else{
    res = await menuCreateApi(form)
  }
  if (res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(form,defaultMenuForm)
  Message.success(res.msg)
  emits('update:visible',false) // 关闭弹出框
  emits('ok')


}

const imageList = ref<imageIDType[]>([])

const getList = async () =>{

  let res = await imagesNameListApi()
  imageList.value = res.data
}
getList()



</script>

<style lang="scss">
.gvb_banner_select{
  display: flex;
  padding: 10px 0;
  img{
    margin-right: 10px;
    border-radius: 5px;
  }
}
</style>