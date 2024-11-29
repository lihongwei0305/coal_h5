import request from "@/request";

export function create(data) {
    return request({
        url: "/meterMonthLog/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/meterMonthLog/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/meterMonthLog/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/meterMonthLog/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/meterMonthLog/getById",
        method: "POST",
        data
    })
}
