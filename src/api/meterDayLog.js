import request from "@/request";

export function create(data) {
    return request({
        url: "/meterDayLog/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/meterDayLog/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/meterDayLog/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/meterDayLog/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/meterDayLog/getById",
        method: "POST",
        data
    })
}
