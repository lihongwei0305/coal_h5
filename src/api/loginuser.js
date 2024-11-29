import request from "@/request";

export function create(data) {
    return request({
        url: "/loginUser/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/loginUser/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/loginUser/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/loginUser/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/loginUser/getById",
        method: "POST",
        data
    })
}
export function logout(data) {
    return request({
        url: "/loginUser/logout",
        method: "POST",
        data
    })
}
