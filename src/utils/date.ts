import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh-cn.js"
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")
// 年月日 时分秒
export function dateTimeFormat(date: string){
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

// 年月日
export function dateFormat(date: string){
    return dayjs(date).format("YYYY-MM-DD")
}

// 距离现在的相对时间
export function relativeCurrentTime(date: string){
    return dayjs(date).fromNow()
}