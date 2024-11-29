/***
 生产月报表
 */
import request from "@/request";

export function create(data) {
    return request({
        url: "/coalWashingMonthReport/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/coalWashingMonthReport/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalWashingMonthReport/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/coalWashingMonthReport/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/coalWashingMonthReport/getById",
        method: "POST",
        data
    })
}


