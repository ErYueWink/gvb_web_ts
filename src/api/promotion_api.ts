import {type listResponse, type paramsType, useAxios} from "@/api/index";

export interface PromotionType{
    id:number
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