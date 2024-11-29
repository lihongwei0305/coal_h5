import request from "@/request";



export function create(data) {
    return request({
        url: "/empSalaryBatch/create",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/empSalaryBatch/list",
        method: "POST",
        data
    })
}
export function getById(data) {
    return request({
        url: "/empSalaryBatch/getById",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/empSalaryBatch/delete",
        method: "POST",
        data
    })
}



