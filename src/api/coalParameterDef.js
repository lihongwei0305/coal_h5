import request from "@/request";

export function create(data) {
    return request({
        url: "/coalParameterDef/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/coalParameterDef/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalParameterDef/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/coalParameterDef/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/coalParameterDef/getById",
        method: "POST",
        data
    })
}
