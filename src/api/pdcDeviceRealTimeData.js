import request from "@/request";

export function create(data) {
    return request({
        url: "/pdcDeviceRealTimeData/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/pdcDeviceRealTimeData/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/pdcDeviceRealTimeData/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/pdcDeviceRealTimeData/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/pdcDeviceRealTimeData/getById",
        method: "POST",
        data
    })
}
export function getRealTimeReport(data) {
    return request({
        url: "/pdcDeviceRealTimeData/getRealTimeReport",
        method: "POST",
        data
    })
}
