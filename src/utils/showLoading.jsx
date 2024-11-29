import {showConfirmDialog, showLoadingToast, closeToast, showDialog, showToast} from 'vant';
import router from '@/router/index';


function Text({message}) {

    const handleClick = () => {
        showToast({
            message,
            overlay:true,
            duration: 0,
            closeOnClick:true,
            closeOnClickOverlay: true,
        });
    }

    return (
        <div onClick={handleClick}>加载异常，是否重新获取？</div>
    )
}

export async function showLoading(cb) {
    const toast = showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: '加载中...',
    });
    await cb().catch((e) => {
        showConfirmDialog({
            title: '提示',
            allowHtml: true,
            message: <Text message={e}/>,
            confirmButtonText: '确认',
        })
            .then(() => {
                showLoading(cb);
            })
            .catch(() => {
                // on cancel
                router.back();
            });
    }).finally(() => {
        closeToast();
    });
}