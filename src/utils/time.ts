// 格式化时间
export const handleFormatDuration = (duration: number):string => {
    const mins = Math.floor(duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : Math.floor(duration / 60)
    const sec = Math.floor(duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : Math.floor(duration % 60)
    return `${mins}:${sec}`
}

