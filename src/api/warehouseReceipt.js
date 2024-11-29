import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseReceipt/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseReceipt/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseReceipt/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseReceipt/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseReceipt/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseReceipt/roots",
        method: "POST",
        data
    })
}
export function archive(data){
    return request({
        url: "/warehouseReceipt/archive",
        method:"POST",
        data
    })
}

export function unarchive(data){
    return request({
        url: "/warehouseReceipt/unarchive",
        method:"POST",
        data
    })
}