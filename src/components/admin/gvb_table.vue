<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
        <div class="action_create">
          <a-button type="primary" @click="add">创建用户</a-button>
        </div>
        <div class="action_group">
          <a-select>分组</a-select>
        </div>
        <div class="action_search">
          <a-input-search @keydown.enter="search" placeholder="搜索" v-model="params.key" @search="search"></a-input-search>
        </div>
        <div class="action_other_search"></div>
        <div class="action_slot"></div>
        <div class="action_flush">
          <a-button @click="refresh">
            <IconRefresh/>
          </a-button>
        </div>
    </div>
    <div class="gvb_table_data">
      <div class="gvb_table_source">
        <a-table :row-key="rowKey" :columns="props.columns" :data="data.list" :row-selection="rowSelection"
                 v-model:selectedKeys="selectedKeys" :pagination="false">

<!--          自定义列单元格渲染-->
          <template #columns>
            <template  v-for="item in props.columns">
<!--                有render函数，优先执行render函数-->
              <a-table-column v-if="item.render" :title="item.title as string">
                <template #cell="data">
                  <component :id="item.render(data)"/>
                </template>
              </a-table-column>
<!--              没有slotName执行dataIndex-->
              <a-table-column  v-if="!item.slotName" :title="item.title as string" :data-index="item.dataIndex"></a-table-column>
<!--              有slotName-->
              <a-table-column  v-else :title="item.title as string">
<!--                操作-->
                  <template #cell="{record}" v-if="item.slotName === 'action'">
                    <div class="gvb_table_action">
                      <a-button type="primary" @click="edit(record)">编辑</a-button>

                      <a-popconfirm content="确定要删除吗?" @ok="remove(record)">
                        <a-button status="danger" type="primary" >删除</a-button>
                      </a-popconfirm>
                    </div>
                  </template>
<!--                日期格式化-->
                <template #cell="{record}" v-if="item.slotName === 'created_at'">
                  <span>{{dateFormat(record.created_at)}}</span>
                </template>
<!--                头像-->
                <template #cell="{record}" v-if="item.slotName === 'avatar'">
                  <slot :name="item.slotName" :record="record" />
                </template>
              </a-table-column>
            </template>
          </template>
        </a-table>
      </div>
      <div class="gvb_table_page">
        <a-pagination  v-model:current="params.page" :default-page-size="params.limit as number"
                       :total="data.count"
                       @change="pageChange"
                       show-jumper show-total/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import {Message, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import type {baseResponse, paramsType} from "@/api";
import {TableColumnData} from "@arco-design/web-vue";
import {dateFormat} from "@/utils/date";
import {defaultDelete} from "@/api";

interface Props {
  url:(params:paramsType)=>Promise<baseResponse<any>>
  columns: TableColumnData[],
  limit?:number,
  rowKey?:string,
  defaultDelete?:boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["add","edit","remove"])

// 设置页数默认值
const {
  limit = 10,
  rowKey = "id"
} = props

const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);

const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

// 列表数据
const data = reactive({
  list:[],
  count:0
})

// 查询参数
const params = reactive<paramsType>({
  page:1,
  limit:limit,
  key:""
})

async function getList(){
  let res = await  props.url(params)
  data.list = res.data.list
  data.count = res.data.count
}
getList()

function pageChange(){
  getList()
}

function search(){
  params.page = 1
  getList()
}

function refresh(){
    Message.success("刷新成功")
    getList()
}

const add = () =>{
  emits("add")
}

const  edit = (record: TableData) =>{
  emits("edit",record)
}

const urlRegex = /return useAxios.get\("(.*?)",.*?\)/

const remove = async (record: TableData) =>{
  let id = record["id"]
  // 启用默认删除
  if (props.defaultDelete){
    // 正则匹配
    let resRegex = urlRegex.exec(props.url.toString())
    console.log(resRegex)
    if (resRegex === null || resRegex.length !== 2){ // 正则匹配失败
      return
    }
    // 匹配成功，格式正确，默认删除
    let res = await defaultDelete(resRegex[1],[id])
    console.log(res)
    if (res.code){
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    getList()
    return
  }
  emits("remove",[id])
  return
}


</script>


<style lang="scss">
.gvb_table{
  background-color: var(--color-bg-1);
  border-radius: 5px;
  .gvb_table_head{
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    position: relative;
    >div{
      margin-right: 10px;
    }
    .action_flush{
      position: absolute;
      right: 20px;
      margin-right: 0;
      button{
        padding: 10px 10px;
      }
    }
  }
  .gvb_table_data{
    padding: 10px 20px 20px 20px;
    .gvb_table_source{
      .gvb_table_action{
        button{
          margin-right: 10px;
          &:last-child{
            margin-right: 0;
          }
        }

      }
    }
    .gvb_table_page{
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>