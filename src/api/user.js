import request from "@/request";

export function create(data) {
    return request({
        url: "/user/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/user/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/user/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/user/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/user/getById",
        method: "POST",
        data
    })
}

export function changePwd(data) {
    return request({
        url: "/user/changePwd",
        method: "POST",
        data
    })
}
export function resources(data) {
    return request({
        url: "/user/resources",
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
export function clearCache(data) {
    return request({
        url: "/user/clearCache",
        method: "POST",
        data
    })
}

export function updateByCode(data) {
    return request({
        url: "/userPreference/updateByCode",
        method: "POST",
        data
    })
}


export function getByCode(data) {
    return request({
        url: "/userPreference/getByCode",
        method: "POST",
        data
    })
}

