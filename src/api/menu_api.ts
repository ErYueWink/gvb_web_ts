import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface bannerType{
    id: number
    path: string
}

export interface menuType{
    id: number // 菜单ID
    created_at: string // 创建时间
    title: string // 菜单标题
    path: string // 菜单路径
    slogan: string // slogan
    banners: bannerType[] // 轮播图数组
    abstract_time: number // 简介切换时间 default: 7s
    banner_time: number // 轮播图切换时间: 7s
    sort: number // 排序 优先级 数字越大优先级越高
    abstract: string[] // 简介
}

export interface imageIDSortList{
    image_id: number
    sort: number
}

export interface menuCreateRequest{
    title: string // 菜单标题
    path: string // 菜单路径
    slogan: string // slogan
    abstract_time: number // 简介切换时间 default: 7s
    banner_time: number // 轮播图切换时间: 7s
    sort: number // 排序 优先级 数字越大优先级越高
    abstract: string[] // 简介
    image_sort_list:imageIDSortList[]
}

/**
 * 查询菜单列表
 */
export function menuListApi(params:paramsType) :Promise<listResponse<menuType>>{
    return useAxios.get('/api/menus',{params})
}

/**
 * 创建菜单
 */
export function menuCreateApi(data:menuCreateRequest):Promise<baseResponse<string>>{
    return useAxios.post('/api/menus',data)
}