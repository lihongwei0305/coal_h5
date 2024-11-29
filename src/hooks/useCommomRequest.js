
import * as fileApi from "@/api/file.js";


export const useCommonRequest = (Api, getList) => {
    // const remove = (item, {selectionChange: purchaseOrder}) => {
    //
    //
    //     if (isEmpty(purchaseOrder)) {
    //         return ElMessage.warning("请勾选需要操作的数据")
    //     }
    //
    //     commonMessageConfirm(purchaseOrder, async () => {
    //         await Api.remove({ids: purchaseOrder.map(v => v.id)})
    //         ElMessage.success('删除成功')
    //         await getList()
    //     },{
    //         options: {
    //             dangerouslyUseHTMLString: true,
    //         },
    //         msg: `确定对选中的<strong>${purchaseOrder.length}条</strong>数据进行<strong style="color: red">删除</strong>操作吗?`,
    //     });
    // }
    //
    // const handleArchive = async (item, {selectionChange}) => {
    //
    //     commonMessageConfirm(selectionChange, async () => {
    //         await Api.archive({ids: selectionChange.map(v => v.id)})
    //         ElMessage.success('归档成功')
    //         await getList()
    //     }, {
    //         options: {
    //             dangerouslyUseHTMLString: true,
    //         },
    //         msg: `确定对选中的<strong>${selectionChange.length}条</strong>数据进行<strong style="color: red">归档</strong>操作吗?`,
    //
    //     });
    //
    // };
    //
    //
    // const handleUnarchive = async (item, {selectionChange}) => {
    //
    //     commonMessageConfirm(selectionChange, async () => {
    //         await Api.unarchive({ids: selectionChange.map(v => v.id)})
    //         ElMessage.success('取消归档成功')
    //         await getList()
    //     }, {
    //         options: {
    //             dangerouslyUseHTMLString: true,
    //         },
    //         msg: `确定对选中的<strong>${selectionChange.length}条</strong>数据进行<strong style="color: red">取消归档</strong>操作吗?`,
    //
    //     });
    //
    // };

    const getFileList = async (fileIds) => {
        if (!fileIds.length) {
            return [];
        }
        let {data} = await fileApi.list({
            pageSize: fileIds.length,
            items: [
                {
                    key: 'id',
                    opt: 'in',
                    value: fileIds
                }
            ]
        }).finally();

        return data.map(v => {
            return {
                ...v,
                url: v.publicUrl,
            }
        });

    }


    return {
        // remove,
        // handleArchive,
        // handleUnarchive,
        getFileList,

    }
}


