import request from "@/request";

export function create(data) {
    return request({
        url: "/organization/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/organization/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/organization/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/organization/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/organization/getById",
        method: "POST",
        data
    })
}


export function permissions(data) {
    return request({
        url: "/user/permissions",
        method: "POST",
        data
    })
}


export function resetOrgAdminPassword(data) {
    return request({
        url: "/organization/resetOrgAdminPassword",
        method: "POST",
        data
    })
}
