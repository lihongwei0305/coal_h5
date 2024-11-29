import request from "@/request";

export function create(data) {
    return request({
        url: "/deviceSupplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/deviceSupplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/deviceSupplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/deviceSupplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/deviceSupplier/getById",
        method: "POST",
        data
    })
}
