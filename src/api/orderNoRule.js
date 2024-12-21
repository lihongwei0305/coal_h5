import request from "@/request";

export function create(data) {
    return request({
        url: "/orderNoRule/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/orderNoRule/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/orderNoRule/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/orderNoRule/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/orderNoRule/getById",
        method: "POST",
        data
    })
}


export function initDefault(data) {
    return request({
        url: "/orderNoRule/initDefault",
        method: "POST",
        data
    })
}
export function previewOrderNo(data) {
    return request({
        url: "/orderNoRule/previewOrderNo",
        method: "POST",
        data
    })
}
export function genOrderNo(data) {
    return request({
        url: "/orderNoRule/genOrderNo",
        method: "POST",
        data
    })
}
export function updateOrderSeq(data) {
    return request({
        url: "/orderNoRule/updateOrderSeq",
        method: "POST",
        data
    })
}
