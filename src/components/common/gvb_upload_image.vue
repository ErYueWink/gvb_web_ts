<template>
  <div class="gvb_upload_image">
    <div class="line">
      <a-input placeholder="请输入图片链接" v-model="text"/>
      <a-upload action="/api/images" :show-file-list="false" name="images" @success="successImageHandle"></a-upload>
    </div>
    <a-image :src="props.modelValue" height="80px" v-if="text"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import type {baseResponse, qiniuyunResponse} from "@/api";
import {Message} from "@arco-design/web-vue";
import type {qiniuyunType} from "@/api/image_api";

const props = defineProps({
  modelValue:{
    type: String
  }
})

const text = ref("")
const emits = defineEmits(['update:modelValue'])

const successImageHandle = (file) =>{
  let res :qiniuyunResponse<qiniuyunType>= file.response
  if (res.code){
    Message.error(res.data[0].msg)
    return
  }
  Message.success(res.data[0].msg)
  text.value = res.data[0].file_name
  console.log(res.data)
}
watch(text,()=>{
  console.log(text.value)
  emits('update:modelValue',text.value)
})
</script>

<style scoped lang="scss">
.gvb_upload_image{
  width: 100%;
  .line{
    display: flex;
    justify-content: space-between;
    .arco-btn{
      margin-left: 15px;
    }
  }
}
</style>