import request from "@/request";

export function upload(data) {
    return request.postForm("/file/upload",data)
}
export function remove(data) {
    return request({
        url: "/file/delete",
        method: "POST",
        data
    })
}
export function list(data) {
    return request({
        url: "/file/list",
        method: "POST",
        data
    })
}

