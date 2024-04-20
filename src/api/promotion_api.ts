import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";
import {reactive} from "vue";

export interface PromotionType{
    id?:number
    title: string
    href: string
    images: string
    is_show: boolean
}

export const PromotionListApi = (params:paramsType):Promise<listResponse<PromotionType>> =>{
    return useAxios.get("/api/adverts",{params,
    headers:{
        'Gvb_referer':location.pathname
    }})
}

export interface PromotionCreateRequest{
    title: string
    href: string
    images: string
    is_show: boolean
}

// 表单默认值
export const defaultPromotionForm = reactive<PromotionCreateRequest>({
    title:"",
    href:"",
    images:"",
    is_show:false
})

// 创建广告
export const promotionCreateApi = (data:PromotionCreateRequest):Promise<baseResponse<string>> =>{
    return useAxios.post('/api/adverts',data)
}

// 修改广告
export const promotionUpdateApi = (id:number,data:PromotionCreateRequest):Promise<baseResponse<string>> =>{
    return useAxios.put('/api/adverts/'+id,data)
}