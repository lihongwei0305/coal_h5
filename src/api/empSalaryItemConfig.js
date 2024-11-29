import request from "@/request";



export function create(data) {
    return request({
        url: "/empSalaryItemConfig/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/empSalaryItemConfig/update",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/empSalaryItemConfig/list",
        method: "POST",
        data
    })
}
export function getById(data) {
    return request({
        url: "/empSalaryItemConfig/getById",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/empSalaryItemConfig/delete",
        method: "POST",
        data
    })
}


export function init(data) {
    return request({
        url: "/empSalaryItemConfig/init",
        method: "POST",
        data
    })
}



