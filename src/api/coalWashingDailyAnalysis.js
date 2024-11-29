import request from "@/request";

export function calculate(data){
    return request({
        url: "/coalWashingDailyAnalysis/calculate",
        method:"POST",
        data
    })
}

export function create(data){
    return request({
        url: "/coalWashingDailyAnalysis/create",
        method:"POST",
        data
    })
}
export function update(data){
    return request({
        url: "/coalWashingDailyAnalysis/update",
        method:"POST",
        data
    })
}


export function list(data){
    return request({
        url: "/coalWashingDailyAnalysis/list",
        method:"POST",
        data
    })
}


export function getById(data){
    return request({
        url: "/coalWashingDailyAnalysis/getById",
        method:"POST",
        data
    })
}
export function remove(data){
    return request({
        url: "/coalWashingDailyAnalysis/delete",
        method:"POST",
        data
    })
}

export function archive(data){
    return request({
        url: "/coalWashingDailyAnalysis/archive",
        method:"POST",
        data
    })
}

export function unarchive(data){
    return request({
        url: "/coalWashingDailyAnalysis/unarchive",
        method:"POST",
        data
    })
}
