import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/components/layout/index.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/home/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router