import request from "@/request";

export function create(data) {
    return request({
        url: "/coalWashingDailyAnalysisParam/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/coalWashingDailyAnalysisParam/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalWashingDailyAnalysisParam/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/coalWashingDailyAnalysisParam/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/coalWashingDailyAnalysisParam/getById",
        method: "POST",
        data
    })
}
