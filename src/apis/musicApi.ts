import request from "@/utils/request";
import {MethodType} from "@/utils/type";

// 获取歌单详细信息
export function musicRcmdList(id:Number) {
    return request({
        url: '/playlist/detail',
        method: MethodType.GET,
        params: {
            id
        }
    })
}
// 根据音乐id获取音乐文件
export function getMusicFile(id:String) {
    return request({
        url: '/song/url',
        method: MethodType.GET,
        params: {
            id
        }
    })
}