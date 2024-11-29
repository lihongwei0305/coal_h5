import request from "@/request";

export function create(data) {
    return request({
        url: "/weightColumnConfig/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/weightColumnConfig/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/weightColumnConfig/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/weightColumnConfig/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/weightColumnConfig/getById",
        method: "POST",
        data
    })
}
export function initDefault(data) {
    return request({
        url: "/weightColumnConfig/initDefault",
        method: "POST",
        data
    })
}
