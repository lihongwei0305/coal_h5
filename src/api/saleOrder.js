import request from "@/request";

export function create(data) {
    return request({
        url: "/saleOrder/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/saleOrder/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/saleOrder/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/saleOrder/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/saleOrder/getById",
        method: "POST",
        data
    })
}


export function updateWeightData(data) {
    return request({
        url: "/saleOrder/updateWeightData",
        method: "POST",
        data
    })
}

export function report(data) {
    return request({
        url: "/saleOrder/report",
        method: "POST",
        data
    })
}