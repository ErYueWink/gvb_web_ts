<template>
  <div>
    <a-modal width="400px" modal-class="gvb_login_modal" :visible="props.visible" :footer="false" title="用户登录" @cancel="cancel">
      <gvb_login_form ref="gvbLoginForm" @ok="cancel"/>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import "./gvb_login_form.vue"
import gvb_login_form from "@/components/common/gvb_login_form.vue";
import {ref} from "vue";
const props = defineProps({
  visible:{
    type:Boolean,
  }
})
const gvbLoginForm = ref()

const emits = defineEmits(["update:visible"])
function cancel(){
  emits("update:visible",false)
  gvbLoginForm.value.formReset()
}
</script>
<style lang="scss">
.gvb_login_modal{
  .arco-modal-header{
    display: none;
  }
}
</style>