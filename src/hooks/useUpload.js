import {ref} from "vue";
import * as fileApi from "@/api/file.js";

export function useUpload() {

    const fileList = ref([]);
    const afterRead = async (file) => {
        file.status = 'uploading';
        file.message = '上传中...';


        let {data} = await fileApi.upload({
            file: file.file,
            name: file.file.name,
            dir: '',
        }).catch(v => {
            file.status = 'failed';
            file.message = '上传失败';
        })
        file.status = 'done';
        file.id = data.id
    };

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
        fileList,
        afterRead,
        getFileList
    }
}
