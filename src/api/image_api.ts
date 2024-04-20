import {type baseResponse, useAxios} from "@/api/index";

export interface imageIDType{
    id: number
    path: string
    name: string
}

export function imagesNameListApi() :Promise<baseResponse<imageIDType[]>> {
    return useAxios.get('/api/images_name')
}