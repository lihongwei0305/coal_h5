import {showToast, showConfirmDialog} from "vant";

export function confirmDialog(operate, {length, confirm, confirmBefore, getList}, options) {
    let message =
        length <= 0 ? `确定对该数据进行<strong style="color: red">${operate}</strong>操作吗?` : `确定对选中的<strong>${length}条</strong>数据进行<strong style="color: red">${operate}</strong>操作吗?`;
    options = {
        message,
        ...options
    };
    return showConfirmDialog({
        title: '提示',
        allowHtml: true,
        confirmButtonColor: 'red',
        ...options,
        beforeClose: (action) => {
            return new Promise(async (resolve) => {
                if (action === 'cancel') {
                    resolve(true)
                } else {
                    confirm().then(() => {
                        showToast(operate + '成功');
                        confirmBefore?.();
                        resolve(true);
                        getList();
                    }).catch(() => {
                        resolve(false);
                    });


                }
            })

        }
    })
};