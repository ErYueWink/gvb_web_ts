import axios from "axios";
import { Message } from "@arco-design/web-vue";
import { useStore } from "@/stores/counter";
import type {commonOptionType} from "@/types";

export const useAxios = axios.create({
    baseURL:'',
})

// 公共的返回结果
export interface baseResponse<T>{
    code: number
    data: T
    msg: string
}

// 查询参数
export interface paramsType {
    page?: number,
    limit?: number,
    key?: string,
    sort?:number
}

// 列表查询返回结果
export interface listResponse<T> {
    code: number,
    data:{
        count:number,
        list:T[]
    },
    msg:string
}

export interface qiniuyunResponse<T>{
    code:number,
    data:T[]
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

export const defaultDelete = <T>(url:string,idList: T[]): Promise<baseResponse<string>> =>{
    return useAxios.delete(url,{
        data:{
            id_list:idList
        }
    })
}

export const defaultOptionList = (url: string,params?:paramsType) :Promise<baseResponse<commonOptionType[]>> =>{
    return useAxios.get("/api/users/role_ids",{params})
}