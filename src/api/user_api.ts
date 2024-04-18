import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index";

export interface loginEmailType{
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType):Promise<baseResponse<string>>{
    return useAxios.post('/api/email_login',request)
}

export interface userInfoType {
    id: number
    created_at: string
    nick_name: string
    user_name: string
    avatar: string
    email: string
    tel: string
    addr: string
    token: string
    ip: string
    role: string
    role_id: number
    sign_status: "QQ" | "gitee" | "邮箱"
    integral: number // 积分
    sign: string // slogan
    link: string // 跳转链接
}

export interface userCreateType{
    user_name:string
    nick_name:string
    role:number
    password:string
}

export function logout(): Promise<baseResponse<string>>{
    return useAxios.post('/api/user_logout')
}

export function userListApi(params:paramsType) :Promise<listResponse<userInfoType>>{
    return useAxios.get('/api/users', {params})
}

export function userCreateApi(data: userCreateType) :Promise<baseResponse<string>>{
    return useAxios.post('/api/users',data)
}