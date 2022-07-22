import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AdminRouter from './admin';

export interface RouteMeta {
  name: string;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'home',
    }
  },

  {
    path: `/home`,
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: `/hotel-category`,
    name: 'hotelCategory',
    component: () => import('@/views/HotelCategory.vue')
  },
  {
    path: `/post`,
    name: 'post',
    component: () => import('@/views/Post.vue')
  },

  {
    name: 'Login',
    path: '/Login',
    meta: {
      title: '登入',
    },
    component: () => import('@/views/admin/Login.vue'),
  },
  AdminRouter.routes,

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const move2hash: { [key: string]: Boolean } = {
      home: true,
    }
    if (move2hash[to.name as string] && to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            top: to.meta.fixHeader ? 100 : 0,
            behavior: 'smooth',

          })

        }, 300)
      })
    }
    return { top: 0, behavior: 'smooth', }
  },
})

export default router
