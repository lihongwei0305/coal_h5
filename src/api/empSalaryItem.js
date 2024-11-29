import request from "@/request";



export function create(data) {
    return request({
        url: "/empSalaryItem/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/empSalaryItem/update",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/empSalaryItem/list",
        method: "POST",
        data
    })
}
export function getById(data) {
    return request({
        url: "/empSalaryItem/getById",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/empSalaryItem/delete",
        method: "POST",
        data
    })
}


export function init(data) {
    return request({
        url: "/empSalaryItem/init",
        method: "POST",
        data
    })
}



