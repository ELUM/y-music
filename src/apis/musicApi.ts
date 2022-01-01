import request from "@/utils/request";
import {MethodType} from "@/utils/type";

// 获取歌单详细信息
export function musicRcmdList(id: Number) {
    return request({
        url: '/playlist/detail',
        method: MethodType.GET,
        params: {
            id
        }
    })
}

// 获取歌单全部信息
export function musicRcmdListAll(id: Number, limit: Number) {
    return request({
        url: '/playlist/track/all',
        method: MethodType.GET,
        params: {
            id,
            limit
        }
    })
}

// 根据音乐id获取音乐文件
export function getMusicFile(id: String) {
    return request({
        url: '/song/url',
        method: MethodType.GET,
        params: {
            id
        }
    })
}

// 根据音乐id获取详细音乐
export function getMusicMsg(id: String) {
    return request({
        url: '/song/detail',
        method: MethodType.GET,
        params: {
            id
        }
    })
}

// 根据歌手id获取最热门的50首歌曲
export function getArtistsTopMusic(id: Number) {
    return request({
        url: '/artist/songs',
        method: MethodType.GET,
        params: {
            id,
            limit: 50
        }
    })
}

// 获取音乐的歌词
export function getLyric(id: Number) {
    return request({
        url: '/lyric',
        method: MethodType.GET,
        params: {
            id
        }
    })
}

export function getMusicStatus(id: Number) {
    return request({
        url: '/check/music',
        method: MethodType.GET,
        params: {
            id
        }
    })
}