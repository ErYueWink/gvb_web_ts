<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useStore} from "@/stores/counter";

const store = useStore()
store.loadTheme()
store.loadToken()
</script>

<template>
  <RouterView />
</template>
