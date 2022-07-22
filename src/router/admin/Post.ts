
import { RouteRecordRaw } from 'vue-router'
import { prefixRoutes } from '../menu'

const routes: RouteRecordRaw =
{
    name: 'Posts',
    path: 'posts',
    meta: {
        title: '文章管理',
        icon: 'description',
        showInMenu: true
    },
    component: () => import('@/views/admin/Layout.vue'),

    redirect: {
        name: 'PostList',
    },
    children: [
        {
            name: 'PostList',
            path: 'list',
            meta: {
                title: '文章列表',
                icon: 'format_list_numbered',
                showInMenu: true
            },
            component: () => import('@/views/admin/PostList.vue'),
        },
        {
            name: 'PostCreate',
            path: 'create',
            meta: {
                title: '新增文章',
                icon: 'playlist_add',
                showInMenu: true
            },
            component: () => import('@/views/admin/PostCreate.vue'),
        },  
          {
            name: 'PostEdit',
            path: 'edit/:id',
            meta: {
                title: '編輯文章',
                icon: 'auto_awesome_mosaic',
            },
            component: () => import('@/views/admin/PostEdit.vue'),
        },

    ]
};


export default routes




