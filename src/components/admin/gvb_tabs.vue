<template>
  <div class="gvb_tags">
    <span
        :class="{gvb_tab:true, active:item.name === route.name}"
        v-for="item in tabList"
        @click="clickTab(item)">
      {{item.title}}
      <IconClose @click.stop="closeTab(item)" v-if="item.name !== 'home'"></IconClose>
    </span>
    <span @click="closeAllTabs" class="gvb_tab close_all_tab">全部关闭</span>
  </div>
</template>

<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
interface tabType {
  name: string
  title: string
}
const tabList:Ref<tabType[]> = ref([
  {name:'home',title:"首页"},
])


// clickTab 点击tab标签页时触发的事件
function clickTab (item: tabType)  {
  router.push({name :item.name })
}

// persistence tabs持久化
function persistence(){
  localStorage.setItem("tabList",JSON.stringify(tabList.value))
}

// 监听路由名称的变化
watch(() => route.name,()=>{
  if (!inList(route.name as string)){
    // 当前路由不在列表里面，那就把当前路由加在列表里面
      tabList.value.push({
        name:route.name as string,
        title:(route.meta as MetaType).title
      })
  }
},{immediate:true})

watch(()=>tabList.value.length,()=>{
  persistence()
})

// 加载本地保存的标签页
function loadTabs(){
  let val = localStorage.getItem("tabList")
  console.log(JSON.parse(val))
  if (val === null){ // 说明本地没有保存的标签页
    return
  }
  let tabs = []
  try {
    tabs = JSON.parse(val)
  }catch (e){
    return;
  }
  tabList.value = tabs
}

loadTabs()

interface MetaType {
  title: string
}

// closeTab 关闭标签页
function closeTab (item: tabType){
  // 首页不能删除
  if (item.name === "home"){
    return
  }
  // 删除当前tab
  // 找当前tab在列表里面的索引
  let index = tabList.value.findIndex((tab) =>item.name === tab.name)
  tabList.value.splice(index,1)
  // 点的是当前页面的tab
  // 判断删除的这个name是不是和路由是一样的
  if (item.name === route.name){
    let beforeIndex = index - 1
    let beforeItem = tabList.value[beforeIndex]
    router.push({name:beforeItem.name})
    console.log(beforeItem.name)
  }

}

// closeAllTabs 关闭所有标签页
const closeAllTabs = () =>{
  tabList.value = [
    {name:'home',title:'首页'}
  ]
  router.push({name:'home'})
}

// inList 判断标签页是否存在
function inList(name: string) :boolean {
  for (const tab of tabList.value) {
    if (tab.name === name){
      return true
    }
  }
  return false
}



</script>

<style scoped>
.gvb_tags{
  width: 100%;
  height: 30px;
  border-bottom: 1px solid var(--bg);
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-1);
  .gvb_tab{
    border: 1px solid var(--bg);
    padding: 2px 8px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    &.active{
      background-color: var(--active);
      color: white;
      border: none;
      svg:hover{
        background-color: rgb(var(--arcoblue-4));
      }
    }
    svg{
      font-size: 12px;
      border-radius: 50%;
      &:hover{
        background-color: var(--bg);
      }
    }
  }
  .close_all_tab{
    position: absolute;
    right: 10px;
  }
}
</style>