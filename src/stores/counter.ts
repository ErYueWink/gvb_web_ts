import { defineStore } from 'pinia'
import {parseToken} from "@/utils/jwt";
import { logout } from '@/api/user_api'
import {Message} from "@arco-design/web-vue";


interface userInfoType{
  nick_name: string
  role: number
  user_id: number
  avatar: string
  token: string
  exp:number
}

const theme = true
const collapse :boolean = false // 默认不折叠
const userInfo :userInfoType = {
  nick_name: '',
  role: 0,
  user_id: 0,
  avatar:"",
  token:"",
  exp:0
}
export const useStore = defineStore('counter', {
  state() {
    return {
      theme: theme,
      collapse: collapse,
      userInfo:userInfo
    }
  },
  actions: {
    setTheme(localTheme?: boolean){
      if (localTheme != undefined){
        this.theme = localTheme
      }else {
        this.theme = !this.theme
      }
      document.body.setAttribute('arco-theme',this.themeString)
      // 持久化存储
      localStorage.setItem('theme', JSON.stringify(this.theme))
    },
    setCollapse(collapse: boolean){
      this.collapse = collapse
    },
    loadTheme(){
      let val = localStorage.getItem('theme')
      if (val === null){
        return
      }
      try {
        this.theme = JSON.parse(val)
        this.setTheme(this.theme)
      }catch (e){
        return;
      }
    },
    setToken(token:string){
      this.userInfo.token = token
      // 解析token
      let info = parseToken(token)
      // 将解析到的用户信息赋值给userInfo
      Object.assign(this.userInfo,info)
      localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
    },
    loadToken(){
      let info = localStorage.getItem('userInfo')
      if (info === null){
        return
      }
      try {
        this.userInfo = JSON.parse(info)
      }catch (e){
        this.clearUserInfo()
        return;
      }
      let exp = Number(this.userInfo.exp)  * 1000
      // 获取现在时间
      let nowTime = new Date().getTime()
      if (exp - nowTime <= 0){
        Message.warning("token已过期")
        this.clearUserInfo()
        return;
      }
    },
    async logout(){
      // 退出登录
      await logout()
      // 清除用户信息
      this.clearUserInfo()
    },
    // 清除用户信息
    clearUserInfo(){
      this.userInfo = userInfo
      localStorage.removeItem("userInfo")
    }
  },
  getters: {
    themeString() :string{
      return this.theme ? 'light' : 'dark'
    },
    // 判断是否登录
    isLogin():boolean{
      return this.userInfo.role !== 0
    },
    // 判断是否为管理员
    isAdmin():boolean{
      return this.userInfo.role == 1
    },
    // 判断是否为游客
    isTourist():boolean{
      return this.userInfo.role == 3
    }
  }
})
