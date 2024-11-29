import request from "@/request";

export function create(data) {
    return request({
        url: "/coalAnalysis/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/coalAnalysis/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalAnalysis/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/coalAnalysis/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/coalAnalysis/getById",
        method: "POST",
        data
    })
}

export function calculate(data) {
    return request({
        url: "/coalAnalysis/calculate",
        method: "POST",
        data
    })
}


export function archive(data) {
    return request({
        url: "/coalAnalysis/archive",
        method: "POST",
        data
    })
}


export function unarchive(data) {
    return request({
        url: "/coalAnalysis/unarchive",
        method: "POST",
        data
    })
}
