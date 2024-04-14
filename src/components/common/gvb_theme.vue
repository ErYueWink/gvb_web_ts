<template>
  <div @click="store.setTheme()">
    <IconSun class="theme_icon" v-if="store.theme"/>
    <IconMoon class="theme_icon" v-else/>
  </div>
</template>

<script setup lang="ts">
import {IconSun,IconMoon} from "@arco-design/web-vue/es/icon";
import {useStore} from "@/stores/counter";

const store = useStore()
</script>


<style scoped>
.theme_icon{
  cursor: pointer;
}
</style>