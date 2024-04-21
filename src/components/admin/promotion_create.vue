<template>
  <div>
    <a-modal v-model:visible="props.visible" :title="editId ? '编辑广告' : '创建广告'"
             @cancel="emits('update:visible',false)" @before-open="beforeOpen" :on-before-ok="menuCreateOk">
      <a-form ref="formRef" :model="form" >
        <a-form-item field="title" label="广告标题"
                     :rules="[{required:true,message:'请输入广告标题'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="请输入广告标题"></a-input>
        </a-form-item>
        <a-form-item field="href" label="广告链接"
                     :rules="[{required:true,message:'请输入广告链接'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.href" placeholder="请输入广告链接"></a-input>
        </a-form-item>
        <a-form-item field="images" label="图片路径"
                     :rules="[{required:true,message:'请输入图片路径'}]"
                     :validate-trigger="['blur']">
          <gvb_upload_image v-model="form.images"/>
        </a-form-item>
        <a-form-item field="is_show" label="是否启用">
          <a-switch v-model="form.is_show"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import Gvb_upload_image from "@/components/common/gvb_upload_image.vue";
import {
  defaultPromotionForm,
  promotionCreateApi,
  type PromotionCreateRequest,
  type PromotionType,
  promotionUpdateApi
} from "@/api/promotion_api";

interface Props {
  visible:boolean,
  record:PromotionType
}

const props = defineProps<Props>()

const emits = defineEmits(['update:visible','ok']);

const editId = ref<number|undefined>(undefined)

const formRef =ref()

const form = reactive<PromotionCreateRequest>({
  title: "",
  images:"",
  href:"",
  is_show:false

})

// 打开弹出框前触发的事件
const beforeOpen = () =>{
  Object.assign(form,props.record)
  editId.value = props.record.id
}

const menuCreateOk = async () =>{
  let val = await formRef.value.validate()
  if (val) return false
  let res
  if (editId.value){
    res = await promotionUpdateApi(editId.value as number,form)
  }else{
    res = await promotionCreateApi(form)
  }
  if (res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(form,defaultPromotionForm)
  Message.success(res.msg)
  emits('update:visible',false) // 关闭弹出框
  emits('ok')


}




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