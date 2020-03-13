import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/video',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/Video.vue'),
                    meta: { title: '视频监控' }
                },
                {
                    path: '/alarm',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/Alarm.vue'),
                    meta: { title: '预警信息' }
                },
                {
                    path: '/attendance',
                    component: () => import(/* webpackChunkName: "403" */ '../pages/AttendanceRecord.vue'),
                    meta: { title: '考勤记录' }
                },
                {
                    path: '/gis',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/GIS.vue'),
                    meta: { title: 'GIS应用' }
                },
                {
                    path: '/identify',
                    component: () => import(/* webpackChunkName: "403" */ '../pages/IdentifyRecord.vue'),
                    meta: { title: '识别记录' }
                },
                {
                    path: '/mission',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/Mission.vue'),
                    meta: { title: '任务信息' }
                },
                {
                    path: '/person',
                    component: () => import(/* webpackChunkName: "403" */ '../pages/PersonRecord.vue'),
                    meta: { title: '人员记录' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../pages/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
                    meta: { title: '404' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
