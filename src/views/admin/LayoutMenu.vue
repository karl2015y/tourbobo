
<template>
    <PostDB />
    <q-layout view="hHh lpR fFf">

        <q-header
            elevated
            class="bg-primary text-white"
        >
            <q-toolbar>
                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title>
                    Tourbobo 管理後台
                </q-toolbar-title>
                <div>
                    <span> Hi，{{ adminStore.userName }} 工作加油！ </span>
                    <q-btn
                        @click="_signOut()"
                        label="登出"
                    />
                </div>

            </q-toolbar>

        </q-header>

        <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            side="left"
            bordered
        >
            <!-- drawer content -->
            <q-scroll-area class="fit">


                <q-list>
                    <template
                        v-for="routes in adminRoutes.childrenArray"
                        :key="routes.routerName"
                    >
                        <template v-if="(routes.childrenArray?.length ?? 0) > 0">
                            <q-expansion-item
                                v-if="routes.showInMenu"
                                :content-inset-level="0.5"
                                expand-separator
                                :label="routes.title"
                                default-opened
                                :icon="routes.icon"
                                :to="{ name: routes.routerName }"
                                :active="currentRoute.name == routes.routerName"
                            >
                                <template
                                    v-for="item in routes.childrenArray"
                                    :key="item.routerName"
                                >
                                    <q-item
                                        v-if="item.showInMenu"
                                        :to="{ name: item.routerName }"
                                        exact
                                        clickable
                                        :active="currentRoute.name == item.routerName"
                                    >
                                        <q-item-section avatar>
                                            <q-icon :name="item.icon" />
                                        </q-item-section>
                                        <q-item-section>
                                            {{ item.title }}
                                        </q-item-section>
                                    </q-item>
                                    <!-- <q-separator
                                :key="'sep' + index"
                                v-if="menuItem.separator"
                            /> -->
                                </template>
                            </q-expansion-item>
                        </template>
                        <template v-else>
                            <q-item
                                v-if="routes.showInMenu"
                                :to="{ name: routes.routerName }"
                                exact
                                clickable
                                :active="currentRoute.name == routes.routerName"
                            >
                                <q-item-section avatar>
                                    <q-icon :name="routes.icon" />
                                </q-item-section>
                                <q-item-section>
                                    {{ routes.title }}
                                </q-item-section>
                            </q-item>
                        </template>
                    </template>

                </q-list>

            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <div
                v-if="currentRoute.name == 'admin'"
                class="flex justify-center items-center h-[85vh]"
            >
                這裡是後台管理，點擊旁邊的選項開始工作吧

            </div>
            <router-view v-else />
        </q-page-container>

    </q-layout>



</template>


<script lang="ts">




export default {
    name: 'AdminLayoutWithMenu',
}
</script>


<script lang="ts" setup>
import AdminRoutes from '@/router/admin'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, db, signOut } from '@/common/firebase'
import { useNotify } from '@/composables/notify';
import { useAdminStore } from '@/stores/admin.store';
import { useAuth } from '@vueuse/firebase';
import PostDB from '../../components/firestore/PostDB.vue'
import { setCssVar } from 'quasar';
const { user } = useAuth(auth)

const adminStore = useAdminStore()
console.log(user.value);





const Notify = useNotify()

const router = useRouter()
const _signOut = () => {
    signOut().then(() => {
        Notify.handleSuccess("成功登出")
        router.push({ name: 'Login', })
    })
}
setTimeout(() => {
    if (user.value == null) {
        Notify.handleWarnings('請重新登入')
        router.push({ name: 'Login', })
    }
    else if (user.value && user.value.email) {
        db().collection('Admin').doc(user.value.email).onSnapshot((doc) => {
            if (doc.exists) {
                const name = (doc.data() as any).name
                adminStore.userName = name
            } else {
                Notify.handleWarnings('權限不夠')
                signOut()
                router.push({ name: 'Login', })

            }
        })
    }

}, 1000);
const currentRoute = useRoute()

const adminRoutes = ref(AdminRoutes.routesMenu)

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};

setCssVar('primary', '#00586E')

</script>



<style >
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>