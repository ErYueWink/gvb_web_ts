import axios from "axios";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores/counter";

export const useAxios = axios.create({
    baseURL:'',
})

// 公共的返回结果
export interface baseResponse<T>{
    code: number
    data: T
    msg: string
}

// 请求拦截
useAxios.interceptors.request.use((config) =>{
    const store = useStore()
    config.headers["token"] = store.userInfo.token
    return config
})

// 响应拦截
useAxios.interceptors.response.use((response) =>{
    if (response.status !== 200){
        console.log("服务失败", response.status)
        Message.error(response.statusText)
        return Promise.reject(response.statusText)
    }
    const { data } = response
    return data
},(err) =>{
    Message.error(err.message)
    return Promise.reject(err)
})