import request from "@/request";

export function create(data) {
    return request({
        url: "/deviceWorkOrder/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/deviceWorkOrder/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/deviceWorkOrder/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/deviceWorkOrder/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/deviceWorkOrder/getById",
        method: "POST",
        data
    })
}

export function archive(data) {
    return request({
        url: "/deviceWorkOrder/archive",
        method: "POST",
        data
    })
}


export function unarchive(data) {
    return request({
        url: "/deviceWorkOrder/unarchive",
        method: "POST",
        data
    })
}
