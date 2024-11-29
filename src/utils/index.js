import {isArrayBuffer, isString} from "lodash-es";


export const fileSize = (size) => {
    let number = size;
    let unit = 'bype';
    if (number >= 1024 ** 3) {
        number = number / 1024 ** 3;
        unit = 'G';
    } else if (number >= 1024 ** 2) {
        number = number / 1024 ** 2;
        unit = 'M';
    } else if (number >= 1024) {
        number = number / 1024;
        unit = 'KB';
    }
    number = number.toFixed(2);
    return +number + unit;
};

export const extname = (name) => {
    const i = name.lastIndexOf('.');
    if (i >= 0) {
        return name.substring(i).toLowerCase();
    }
    return '';
};


export function inputIntAndFloat(e) {
    e.target.value = e.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')
}


export function inputInt(e) {
    e.target.value = e.target.value.replace(/[^0-9-]/g, '');
}

export function addLevel(list, level = 1) {
    list.forEach((v, i) => {
        v.level = level
        if (v.children && v.children.length) {
            v.hasChild = true;
            v.children.forEach(y => y.parentName = v.name)
            addLevel(v.children, level + 1);

        }

    })
}


export function printHTML(htmlContent) {
    const printWindow = window.open('　', '_blank');
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}


export function getDictSelect(obj) {
    let _obj = {}
    Object.entries(obj).map(([k, v]) => {
        _obj[k.replace('Ref', 'Name')] = v.value.getCurrentSelect().name || ''
    })
    return _obj;
}


// export function base64ToBlob(base64) {
//     let u8arr = Base64.toUint8Array(base64);
//     return new Blob([u8arr]);
// }
//
// export function downFile(data, fileName,type='text/plain') {
//
//     let blob = data ?? new Blob([],{type});
//
//
//     if (blob instanceof Uint8Array) {
//         blob = new Blob([data],{type});
//     }else if (isString(data)){
//         blob = new Blob([Base64.toUint8Array(data)],{type})
//     }else if (blob instanceof Blob) {
//         blob = data;
//
//     }
//     console.log(blob)
//     const url = URL.createObjectURL(blob);
//     let a = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     document.body.appendChild(a)
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
// }

/**
 * 比较数组的值是否一样
 */
export function arraysAreEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return false;
    }
    // 比较数组长度
    if (arr1.length !== arr2.length) {
        return false;
    }

    // 比较每个元素
    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];

        // 如果元素是对象，则使用深度比较
        if (typeof obj1 === 'object' && typeof obj2 === 'object') {
            if (!objectsAreEqual(obj1, obj2)) {
                return false;
            }
        } else {
            // 如果元素不是对象，直接比较
            if (obj1 !== obj2) {
                return false;
            }
        }
    }

    // 如果数组长度相同且每个元素也相同，则两个数组相同
    return true;
}

// 深度比较两个对象
export function objectsAreEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (!objectsAreEqual(obj1[key], obj2[key])) {
                return false;
            }
        } else {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }

    return true;
}


export function isObjectEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === undefined) {
                continue;
            }
            // 如果值是数组或对象，则递归检查
            if (Array.isArray(obj[key]) && obj[key].length === 0) {
                continue;
            }
            if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
                continue;
            }
            return false;
        }
    }
    return true;
}

export function isArrayEmpty(arr) {
    return Array.isArray(arr) && !!arr.length;
}


export function groupBy_tree(arr, key) {
    let result = [];
    let grouped = {};

    arr.forEach(item => {
        // 根据pathName分组
        if (!grouped[item[key]]) {
            grouped[item[key]] = {
                name: item[key],
                children: []
            };
            result.push(grouped[item[key]]);
        }

        // 将name属性按照'-'分割，并构建子节点
        let parts = item.name.split('-');
        let currentLevel = grouped[item[key]].children;

        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (i === parts.length - 1) {
                // 如果是最后一个部分，直接添加到当前层级
                currentLevel.push({...item, name: part});
            } else {
                // 否则，检查当前层级是否有对应的子节点
                let found = currentLevel.find(child => child.name === part);
                if (!found) {
                    found = {name: part, children: []};
                    currentLevel.push(found);
                }
                currentLevel = found.children; // 移动到下一层
            }
        }
    });

    return result;
}

/**
 *
 * 生成uuid
 */
export function getUuid() {
    const url_uuid = URL.createObjectURL(new Blob()) //生成一个url
    const uuid = url_uuid.toString() //生成的url转为字符串
    URL.revokeObjectURL(url_uuid) //释放这个url
    return uuid.substr(uuid.lastIndexOf('/') + 1) //链接 / 后面的就是我们要的uuid
}

/***
 随机触发事件
 */
// export function maybeTriggerEvent(probability, callback) {
//     if (Math.random() < probability) {
//         callback();
//     }
//     return Math.random() < probability;
// }
//
// export function isBot() {
//     return new Promise(resolve => {
//         load().then(botd => botd.detect()).then((result) => {
//             resolve(result)
//         })
//     })
//
// }
