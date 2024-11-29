/***
 网盘
 */
import request from "@/request";

export function create(data) {
    return request({
        url: "/netDisk/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/netDisk/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/netDisk/remove",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/netDisk/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/netDisk/getById",
        method: "POST",
        data
    })
}

/*** 创建文件夹*/
export function createDir(data) {
    return request({
        url: "/netDisk/createDir",
        method: "POST",
        data
    })
}

export function batchCreateDir(data) {
    return request({
        url: "/netDisk/batchCreateDir",
        method: "POST",
        data
    })
}



/*** 列出下级文件和文件夹 */
export function ls(data) {
    return request({
        url: "/netDisk/ls",
        method: "POST",
        data
    })
}


export function pathToId(data) {
    return request({
        url: "/netDisk/pathToId",
        method: "POST",
        data
    })
}

export function idToPath2(data) {
    return request({
        url: "/netDisk/idToPath2",
        method: "POST",
        data
    })
}

export function rename(data) {
    return request({
        url: "/netDisk/rename",
        method: "POST",
        data
    })
}


export function preCreateFile(data) {
    return request({
        url: "/netDisk/preCreateFile",
        method: "POST",
        data
    })
}


export function createFile(data,onUploadProgress) {
    return request({
        url: "/netDisk/createFile",
        method: "POST",
        data,
        onUploadProgress,
    })
}
export function dirTree(data) {
    return request({
        url: "/netDisk/dirTree",
        method: "POST",
        data
    })
}

export function tree(data) {
    return request({
        url: "/netDisk/tree",
        method: "POST",
        data
    })
}

export function move(data) {
    return request({
        url: "/netDisk/move",
        method: "POST",
        data
    })
}

export function copy(data) {
    return request({
        url: "/netDisk/copy",
        method: "POST",
        data
    })
}


export function downloadFile(data) {
    return request({
        url: `/netDisk/downloadFile?id=${data}`,
        method: "GET",
        data
    })
}








