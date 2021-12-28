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

/**
 * 热门歌手
 * @param limit
 */
export function topArtists(limit:Number) {
    return request({
        url: '/top/artists',
        method: MethodType.GET,
        params: {
            limit
        }
    })
}

/**
 * 新歌速递
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 * @param type
 */
export function newMusicSend(type: Number) {
    return request({
        url: '/top/song',
        method: MethodType.GET,
        params: {
            type
        }
    })
}