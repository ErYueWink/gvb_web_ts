<template>
  <div class="gvb_admin">
    <aside :class="{collapsed: store.collapse}">
      <gvb_logo />
      <gvb_menu />
    </aside>
    <main>
      <div class="gvb_head">
        <Gvb_bread_crumb />
        <div class="gvb_function_area">
          <IconMenu class="icon-action"/>
          <gvb_theme />
          <gvb_user_info_menu />
        </div>
      </div>
      <gvb_tabs />
      <div class="gvb_container">
        <router-view v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  IconMenu,
  IconSun,
  IconApps,
  IconBug,
  IconBulb,
  IconDown, IconUser
} from '@arco-design/web-vue/es/icon';
import {type Component, ref} from "vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useStore} from "@/stores/counter";
import Gvb_menu from "@/components/admin/gvb_menu.vue";
import Gvb_logo from "@/components/admin/gvb_logo.vue";
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import Gvb_tabs from "@/components/admin/gvb_tabs.vue";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";

const router = useRouter()
const route = useRoute()
const store = useStore()

</script>

<style lang="scss">
.gvb_admin{
  display: flex;
  color: var(--color-text-1);
  aside{
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--bg);
    background-color: var(--color-bg-1);
    transition: all .3s;
    position: relative;
  }
  aside.collapsed{
    width: 48px;
    &~main{
      width: calc(100% - 48px);
    }
  }
  main{
    width:calc(100% - 240px);
    transition: all .3s;
    .gvb_head{
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid var(--bg);
      background-color: var(--color-bg-1);
      .gvb_function_area{
        display: flex;
        align-items: center;
        .icon-action{
          margin-right: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        .gvb_user_info_menu{
          .gvb_user_info_menu_dropdown{
            display: flex;
            align-items: center;
            cursor: pointer;
            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            .gvb_user_info_menu_dropdown_span{
              margin: 0 5px;
            }
          }
        }
      }
    }

    .gvb_container{
      background-color: var(--bg);
      min-height: calc(100vh - 90px);
      padding: 20px;
    }
  }
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-active {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.fade-leave-active, .fade-enter-active {
  transition: all 0.3s ease-out;
}

</style>