import {createRouter, createWebHashHistory} from 'vue-router';
import {useUserStore} from "@/store/user.js";
import {useKeepAlive} from "@/store/keepAlive.js";
import {useTabbar} from '@/store/useTabbar.js'
import {defineAsyncComponent} from "vue";
import LoadingComponent from "@/components/LoadingComponent.vue";



function createAsyncComp(ins) {
    return Promise.resolve(defineAsyncComponent({
        loader: () => ins,
        loadingComponent: LoadingComponent,
        delay: 2000,
    }));
}
function addKey(routes) {
    routes.forEach(route => {
        if (route.children?.length) {
            addKey(route.children);
        }
        if ('meta' in route) {
            route.meta.key = route.path + new Date().getTime();
        } else {
            route.meta = {
                key: route.path + new Date().getTime(),
            }
        }
    })
}

let routes = [
    {
        path: '/',
        redirect: '/workbench',
        // meta: {
        //     tabbar: true,
        // }
    },
    //工作台
    {
        path: '/workbench',
        component: () => createAsyncComp(import('../views/workbench/index.vue')),
        meta: {
            tabbar: true,

        }
    },
    //设备
    {
        path: '/device',
        name: 'device',
        component: () => createAsyncComp(import('../views/device/index.vue')),
        meta: {
            keepAlive: true,
            dynamicKeepAlve: true,

        },
    },
    {
        path: '/device/operate',
        component: () => createAsyncComp(import('../views/device/operate.vue')),
    },
    {
        path: '/workOrder',
        component: () => createAsyncComp(import('../views/workOrder/index.vue')),
    },
    {
        path: '/workOrder/operate',
        component: () => createAsyncComp(import('../views/workOrder/operate.vue')),
    },
    {
        path: '/coalanalysis',
        component: () => createAsyncComp(import('../views/coalanalysis/index.vue')),
    },
    {
        path: '/coalanalysis/operate',
        component: () => createAsyncComp(import('../views/coalanalysis/operate.vue')),
    },
    {
        path: '/pdc/realTimeData',
        component: () => createAsyncComp(import('../views/pdc/realTimeData.vue'))
    },
    //生产
    {
        path: '/prod/coalWashingDailyAnalysis',
        name: 'coalWashingDailyAnalysis',
        component: () => createAsyncComp(import('../views/prod/coalWashingDailyAnalysis/index.vue')),
        meta: {
            keepAlive: true,
        }
    },

    //磅房
    {
        path: '/weight/data',
        name: 'weightData',
        component: () => createAsyncComp(import('../views/weight/data/index.vue')),
        meta: {
            keepAlive: true,
        }
    },
    //订单
    {
        path: '/order/purchaseOrder',
        name: 'purchaseOrder',
        component: () => createAsyncComp(import('../views/order/purchaseOrder/index.vue')),
        meta: {
            keepAlive: true,
        }
    },
    {
        path: '/order/saleOrder',
        name: 'saleOrder',
        component: () => createAsyncComp(import('../views/order/saleOrder/index.vue')),
        meta: {
            keepAlive: true,
        }
    },

    // 门禁
    {
        path: '/accessgate/data',
        component: () => createAsyncComp(import('../views/accessgate/data/index.vue'))
    },


    {
        path: '/accessgate/appointment',
        name: 'accessgateAppointment',
        component: () => createAsyncComp(import('../views/accessgate/appointment/index.vue')),
        meta: {
            keepAlive: true,
            dynamicKeepAlve: true,
        }
    },
    {
        path: '/accessgate/appointment/operate',
        component: () => createAsyncComp(import('../views/accessgate/appointment/operate.vue'))
    },
    //水电表
    {
        path: '/meter/meterLog',
        component: () => createAsyncComp(import('../views/meter/meterLog/index.vue'))
    },
    //库房
    {
        path: '/warehouse/warehouseGoodsSummary',
        name: 'warehouseGoodsSummary',
        component: () => createAsyncComp(import('../views/warehouse/warehouseGoodsSummary/index.vue')),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/warehouse/warehouseGoods',
        component: () => createAsyncComp(import('../views/warehouse/warehouseGoods/index.vue'))
    },
    {
        path: '/warehouse/warehouseGoods/operate',
        component: () => createAsyncComp(import('../views/warehouse/warehouseGoods/operate.vue'))
    },
    {
        path: '/warehouse/warehouseReceipt',
        name: 'warehouseReceipt',
        component: () => createAsyncComp(import('../views/warehouse/warehouseReceipt/index.vue')),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/warehouse/warehouseReceiptEnter',
        name: 'warehouseReceiptEnter',
        component: () => createAsyncComp(import('../views/warehouse/warehouseReceiptEnter/index.vue')),
        meta: {
            // keepAlive: true
            title: 'test',

        }
    },
    {
        path: '/warehouse/receiptHistory/:goods/:warehouse',
        name: 'receiptHistory',
        component: () => createAsyncComp(import('../views/warehouse/receiptHistory/index.vue')),
        props: true,
        meta: {
            keepAlive: true,
        }
    },

    //我的
    {
        path: '/my',
        component: () => createAsyncComp(import('../views/my/my.vue')),
        meta: {
            tabbar: true,
        }
    },
    //登录
    {
        path: '/login',
        component: () => createAsyncComp(import('../views/login/index.vue'))
    },
    {
        path: '/qrcode',
        component: () => createAsyncComp(import('../views/qrcode/index.vue')),
        meta: {
            tabbar: false,
        }
    }
];

addKey(routes)

const router = createRouter({
        routes,
        history: createWebHashHistory(),

    }
)


router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const keepAliveStore = useKeepAlive();
    const tabbar = useTabbar();
    tabbar.changeShow(to.meta?.tabbar);

    if (to.path === '/login' && userStore.userInfo?.sessionId) {
        console.log('to.path === \'/login\' && userStore.userInfo?.sessionId')
        tabbar.changeShow(true);
        return next('/workbench');
    }

    if (to.path === '/login') {
        return next();
    }
    if (!userStore.userInfo?.sessionId) {
        console.log('!userStore.userInfo?.sessionId')
        // ElMessage.warning("请先登录")
        return next('/login')
    }
    // if (to.meta?.keepAlive) {
    //     keepAliveStore.setIncludes('add', to.name);
    // }
    if (from.meta?.keepAlive || to.meta?.keepAlive) {
        keepAliveStore.setIncludes('add', from.name);
    }else {
        keepAliveStore.setIncludes('remove', from.name);
    }
    next();
});


export default router;
