import request from "@/request";

export function create(data) {
    return request({
        url: "/meterLog/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/meterLog/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/meterLog/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/meterLog/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/meterLog/getById",
        method: "POST",
        data
    })
}


export function archive(data){
    return request({
        url: "/meterLog/archive",
        method:"POST",
        data
    })
}

export function unarchive(data){
    return request({
        url: "/meterLog/unarchive",
        method:"POST",
        data
    })
}
