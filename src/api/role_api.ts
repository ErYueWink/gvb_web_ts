import { useAxios} from "@/api/index";
import type {commonOptionType} from "@/types";
import type {paramsType,baseResponse} from "@/api/index";

export function roleIdListApi(params?:paramsType): Promise<baseResponse<commonOptionType[]>>{
    return useAxios.get("/api/users/role_ids",{params})
}