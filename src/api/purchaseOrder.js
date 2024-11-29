import request from "@/request";

export function create(data) {
    return request({
        url: "/purchaseOrder/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/purchaseOrder/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/purchaseOrder/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/purchaseOrder/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/purchaseOrder/getById",
        method: "POST",
        data
    })
}


export function updateWeightData(data) {
    return request({
        url: "/purchaseOrder/updateWeightData",
        method: "POST",
        data
    })
}

export function report(data) {
    return request({
        url: "/purchaseOrder/report",
        method: "POST",
        data
    })
}

export function archive(data) {
    return request({
        url: "/purchaseOrder/archive",
        method: "POST",
        data
    })
}

export function unarchive(data) {
    return request({
        url: "/purchaseOrder/unarchive",
        method: "POST",
        data
    })
}