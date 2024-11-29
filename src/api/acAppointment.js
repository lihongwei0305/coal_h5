import request from "@/request";

export function create(data) {
    return request({
        url: "/acAppointment/create",
        method: "POST",
        data
    })
}
export function batchCreate(data) {
    return request({
        url: "/acAppointment/batchCreate",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/acAppointment/update",
        method: "POST",
        data
    })
}

export function cancel(data) {
    return request({
        url: "/acAppointment/cancel",
        method: "POST",
        data
    })
}


export function remove(data) {
    return request({
        url: "/acAppointment/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/acAppointment/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/acAppointment/getById",
        method: "POST",
        data
    })
}
