<template>

    <div class="w-72 fixed top-1/2 left-1/2 -ml-36 -mt-52">
        <q-tabs
            v-model="tab"
            class="text-teal"
        >
            <q-tab
                name="signIn"
                label="登入"
            />
            <q-tab
                name="signUp"
                label="註冊"
            />

        </q-tabs>
        <q-tab-panels
            v-model="tab"
            animated
        >
            <q-tab-panel name="signIn">
                <div class="">
                    <q-input
                        filled
                        v-model="email"
                        label="Email"
                    />
                    <q-input
                        class="mt-2"
                        filled
                        v-model="password"
                        label="密碼"
                        type="password"
                    />
                    <q-btn
                        class="w-full mt-3"
                        label="登入"
                        @click="signIn()"
                    />

                </div>
            </q-tab-panel>
            <q-tab-panel name="signUp">
                <div class="">
                    <q-input
                        filled
                        v-model="email"
                        label="Email"
                    />
                    <q-input
                        class="mt-2"
                        filled
                        v-model="password"
                        label="密碼"
                        type="password"
                    />
                    <q-input
                        class="mt-2"
                        filled
                        v-model="rePassword"
                        label="重複密碼"
                        type="password"
                    />
                    <q-btn
                        class="w-full mt-3"
                        label="註冊"
                        @click="signUp()"
                    />

                </div>
            </q-tab-panel>

        </q-tab-panels>

    </div>

</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useNotify } from '../../composables/notify';
import { useAuth } from '@vueuse/firebase/useAuth'
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { db, auth, signOut } from '../../common/firebase'
import { useDebounceFn } from '@vueuse/core'
import { useAdminStore } from '../../stores/admin.store'
const adminStore = useAdminStore()

const { user } = useAuth(auth)


watch(() => user.value, (_user) => {
    if (_user && _user.email) {
        email.value = _user.email
        go2AdminPages()
    }
})



const go2AdminPages = useDebounceFn(() => {
    Notify.handleSuccess('歡迎回來 ')
    router.push({ name: 'admin' })


}, 1000, { maxWait: 5000 })

const Notify = useNotify()
const router = useRouter()

const tab = ref('signIn')

const email = ref("")
const password = ref("")
const rePassword = ref("")
watch(() => tab.value, () => { rePassword.value = '' })



const signUp = () => {
    if (email.value == '') {
        Notify.handleError('Email必填')
    }
    else if (password.value == '') {
        Notify.handleError('密碼必填')
    }
    else if (rePassword.value == '' || rePassword.value != password.value) {
        Notify.handleError('重複密碼錯誤')
    }
    else {
        auth().createUserWithEmailAndPassword(email.value, password.value)
            .then(go2AdminPages)
            .catch((error) => {
                var errorMessage = error.message;
                Notify.handleError(errorMessage)

            });
    }

}
const signIn = () => {
    if (email.value == '') {
        Notify.handleError('Email必填')
    }
    else if (password.value == '') {
        Notify.handleError('密碼必填')
    }
    else {
        auth().signInWithEmailAndPassword(email.value, password.value)
            .then(go2AdminPages)
            .catch((error) => {
                var errorMessage = error.message;
                Notify.handleError(errorMessage)

            });
    }

}
    // Sign-out successful.




</script>

<style scoped>
@tailwind utilities;
</style>