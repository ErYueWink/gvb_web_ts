import {type baseResponse, useAxios} from "@/api/index";

export interface imageIDType{
    id: number
    path: string
    name: string
}

/**
 * 七牛云
 */
export interface qiniuyunType{
    file_name: string
    is_success:boolean
    msg: string
}


export function imagesNameListApi() :Promise<baseResponse<imageIDType[]>> {
    return useAxios.get('/api/images_name')
}