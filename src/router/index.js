import {createRouter, createWebHashHistory} from 'vue-router';
import {useUserStore} from "@/store/user.js";
import {useKeepAlive} from "@/store/keepAlive.js";
import {useTabbar} from '@/store/useTabbar.js'

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
        component: () => import('@/views/workbench/index.vue'),
        meta: {
            tabbar: true,

        }
    },
    //设备
    {
        path: '/device',
        name: 'device',
        component: () => import('@/views/device/index.vue'),
        meta: {
            keepAlive: true
        },
    },
    {
        path: '/device/operate',
        component: () => import('@/views/device/operate.vue')
    },
    {
        path: '/workOrder',
        component: () => import('@/views/workOrder/index.vue')
    },
    {
        path: '/workOrder/operate',
        component: () => import('@/views/workOrder/operate.vue')
    },
    {
        path: '/coalanalysis',
        component: () => import('@/views/coalanalysis/index.vue')
    },
    {
        path: '/coalanalysis/operate',
        component: () => import('@/views/coalanalysis/operate.vue')
    },
    {
        path: '/pdc/realTimeData',
        component: () => import('@/views/pdc/realTimeData.vue')
    },
    //生产
    {
        path: '/prod/coalWashingDailyAnalysis',
        name: 'coalWashingDailyAnalysis',
        component: () => import('@/views/prod/coalWashingDailyAnalysis/index.vue'),
        meta: {
            keepAlive: true,
        }
    },

    //磅房
    {
        path: '/weight/data',
        name: 'weightData',
        component: () => import('@/views/weight/data/index.vue'),
        meta: {
            keepAlive: true,
        }
    },
    //订单
    {
        path: '/order/purchaseOrder',
        name: 'purchaseOrder',
        component: () => import('@/views/order/purchaseOrder/index.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        path: '/order/saleOrder',
        name: 'saleOrder',
        component: () => import('@/views/order/saleOrder/index.vue'),
        meta: {
            keepAlive: true,
        }
    },

    // 门禁
    {
        path: '/accessgate/data',
        component: () => import('@/views/accessgate/data/index.vue')
    },


    {
        path: '/accessgate/appointment',
        name: 'accessgateAppointment',
        component: () => import('@/views/accessgate/appointment/index.vue'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/accessgate/appointment/operate',
        component: () => import('@/views/accessgate/appointment/operate.vue')
    },
    //水电表
    {
        path: '/meter/meterLog',
        component: () => import('@/views/meter/meterLog/index.vue')
    },
    //库房
    {
        path: '/warehouse/warehouseGoodsSummary',
        component: () => import('@/views/warehouse/warehouseGoodsSummary/index.vue')
    },
    {
        path: '/warehouse/warehouseGoods',
        component: () => import('@/views/warehouse/warehouseGoods/index.vue')
    },
    {
        path: '/warehouse/warehouseGoods/operate',
        component: () => import('@/views/warehouse/warehouseGoods/operate.vue')
    },
    {
        path: '/warehouse/warehouseReceipt',
        component: () => import('@/views/warehouse/warehouseReceipt/index.vue')
    },

    //我的
    {
        path: '/my',
        component: () => import('@/views/my/my.vue'),
        meta: {
            tabbar: true,
        }
    },
    //登录
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }
]

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


    if (from.meta?.keepAlive) {
        if (['/device/operate', '/accessgate/appointment/operate'].includes(to.path)) {
            keepAliveStore.setIncludes('add', from.name);
        } else {
            keepAliveStore.setIncludes('remove', from.name);
        }
    }
    next();
});


export default router;
