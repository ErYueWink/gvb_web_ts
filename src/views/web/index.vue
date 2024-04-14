<template>
  <h3>前台首页</h3>
  <Gvb_login_modal  v-model:visible="visible"/>
  <a-button @click="visible = true">登录</a-button>
  <router-link to="/login">登录</router-link>
</template>

<script setup lang="ts">
import Gvb_login_modal from "@/components/common/gvb_login_modal.vue";
import {ref} from "vue";

const visible = ref(false)

</script>



<style lang="scss">

</style>