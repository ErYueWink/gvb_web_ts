# GVB前端TS重构
技术栈
vue3    `typescript`   `ArcoDesign ` `axios` `pinal`
## 项目搭建
### 安装
```shell
npm init vue@latest
```
```shell
npm install --save-dev @arco-design/web-vue
npm i axios
npm i mockjs
npm i @types/mockjs
npm install sass --save-dev
```
## 项目BUG汇总
1. `ts`无法识别后缀名为`.vue`的文件 新建`vite-env.d.ts`文件，放在与`app.vue`同级的目录下
   代码如下所示：
    ```vue
   declare module '*.vue' {
       import Vue from "vue";
       export default Vue
      }
   ```
2. `@click.stop`阻止事件冒泡，如果父子元素都有点击事件，子元素触发点击事件时不希望触发父元素的点击事件，只需在子元素的`@click`中添加`.stop`即可阻止事件冒泡
3. 标签页持久化方案：
   - 定义一个函数，将标签页列表保存到本地
   - 定义一个监听器，监听标签页列表的变化，标签页列表发生变化，调用持久话的函数
   - 定义页面刷新时执行的函数
     - 获取本地存储的json字符串
     - 定义空标签列表
     - 使用`try catch`解析json字符串赋值给空标签列表
     - 没有异常则对标签列表进行重新赋值

## 常用组件
### Menu
#### API
1. `selected-keys(v-model):string[]`:选中的菜单项key数组
2. `open-keys(v-model):string[]`:展开的子菜单key数组
3. `show-collapse-button:boolean default:false`:是否显示折叠菜单按钮
4. `collapsed (v-model):boolean`:是否折叠菜单
#### Events
1. `collapse:boolean`:折叠状态改变时触发
### DropDown
#### Events
1. `select value:string`:用户选择时触发 value默认为文本内容，可以使用`value`修改选项值