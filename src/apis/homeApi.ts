import request from "@/utils/request";
import {MethodType} from "@/utils/type";

// 歌单分类
export function hotMusicList() {
    return request({
        url: '/playlist/hot',
        method: MethodType.GET
    })
}

/**
 * 轮播图
 * 0.PC
 * 1.Android
 * 2.Iphone
 * 3.Ipad
 */
export function banner(type: Number) {
    return request({
        url: '/banner',
        method: MethodType.GET,
        params: {
            type
        }
    })
}

export function Recommend(limit: Number) {
    return request({
        url: '/personalized',
        method: MethodType.GET,
        params: {
            limit
        }
    })
}

export function test() {
    return request({
        url: '/playlist/detail?id=7189324795',
        method: MethodType.GET
    })
}