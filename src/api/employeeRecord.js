import request from "@/request";

export function create(data) {
    return request({
        url: "/employeeRecord/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/employeeRecord/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/employeeRecord/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/employeeRecord/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/employeeRecord/getById",
        method: "POST",
        data
    })
}

export function archive(data) {
    return request({
        url: "/employeeRecord/archive",
        method: "POST",
        data
    })
}


export function unarchive(data) {
    return request({
        url: "/employeeRecord/unarchive",
        method: "POST",
        data
    })
}
