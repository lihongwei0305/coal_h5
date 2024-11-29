import request from "@/request";

export function create(data) {
    return request({
        url: "/pdcDeviceData/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/pdcDeviceData/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/pdcDeviceData/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/pdcDeviceData/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/pdcDeviceData/getById",
        method: "POST",
        data
    })
}
export function getReport(data) {
    return request({
        url: "/pdcDeviceData/getReport",
        method: "POST",
        data
    })
}

export function getReport2(data) {
    return request({
        url: "/pdcDeviceData/getReport2",
        method: "POST",
        data
    })
}
