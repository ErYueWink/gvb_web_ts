import {type baseResponse, useAxios} from "@/api/index";

export interface loginEmailType{
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType):Promise<baseResponse<string>>{
    return useAxios.post('/api/email_login',request)
}

export function logout(): Promise<baseResponse<string>>{
    return useAxios.post('/api/user_logout')
}