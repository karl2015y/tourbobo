<template>
    <q-page-sticky
        @click="handleSave()"
        position="top-right"
        :offset="[18, 18]"
        class="z-10"
    >
        <div class="text-right ">
            <q-btn
                :color="isDifferent ? 'negative' : 'secondary'"
                :label="isDifferent ? '未儲存' : '已儲存'"
            >
                <q-tooltip v-if="TimeNote && TimeNote?.length > 0"> 上次存檔時間：{{ TimeNote[0].time }}，更新人：{{
                        TimeNote[0].adminName
                }}</q-tooltip>
            </q-btn>

        </div>

    </q-page-sticky>
    <!-- 聯絡方式 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">聯絡方式</div>

        </div>
        <div class="p-3 w-full ">
            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">Line</div>
                    <q-input
                        filled
                        v-model="contactForm.line"
                    />
                </div>
            </div>

            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">Facebook</div>
                    <q-input
                        filled
                        v-model="contactForm.facebook"
                    />
                </div>
            </div>

            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">Message</div>
                    <q-input
                        filled
                        v-model="contactForm.message"
                    />
                </div>
            </div>

            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">Instagram</div>
                    <q-input
                        filled
                        v-model="contactForm.instagram"
                    />
                </div>
            </div>

            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">連絡電話</div>
                    <q-input
                        filled
                        v-model="contactForm.phone"
                    />
                </div>
            </div>

            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">Google Play</div>
                    <q-input
                        filled
                        v-model="contactForm.googlePlay"
                    />
                </div>
            </div>

            <div class=" flex gap-3">
                <div class="w-[30vw] max-w-[500px]">
                    <div class="font-bold text-lg mt-6">APP Store</div>
                    <q-input
                        filled
                        v-model="contactForm.appStore"
                    />
                </div>
            </div>

        </div>



    </div>

</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { useNotify } from '@/composables/notify';
import { useAdminStore } from '@/stores/admin.store';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { cloneDeep, isEmpty } from 'lodash';
import md5 from 'md5';
import { computed, ref, watchEffect } from 'vue';
const adminStore = useAdminStore()

const Notify = useNotify()

// DB
const PageContactDB = db().collection('Sites/travel-tbb/Pages').doc('Contact')
const PageContactData = ref((useFirestore(PageContactDB)) as any)
const TimeNote = ref<Array<any | null>>((useFirestore(PageContactDB.collection('TimeNote').orderBy('timestamp', 'desc').limit(1))) as any)
watchEffect(() => {
    if (PageContactData.value) {
        contactForm.value = PageContactData.value.contactForm
    }
})

const preSaveData = computed(() => {
    if (PageContactData.value === null || PageContactData.value) {
        return {
            contactForm: contactForm.value,
        }
    }
    return {}
})

const dataDefaultMd5 = ref('')
const preSaveDataMd5 = computed(() => {
    if (!isEmpty(preSaveData.value)) {
        const _md5 = md5(JSON.stringify(preSaveData.value))
        if (dataDefaultMd5.value == '') dataDefaultMd5.value = _md5
        return _md5
    }
    return ''
})
const isDifferent = computed(() => PageContactData.value === null || (dataDefaultMd5.value !== preSaveDataMd5.value))
const handleSave = () => {
    if (!isDifferent.value) return;
    PageContactDB.collection('TimeNote').add({
        timestamp: (new Date).getTime(),
        time: (new Date).toLocaleString(),
        adminName: adminStore.userName

    })
    PageContactDB.set(preSaveData.value).then(() => {
        Notify.handleSuccess("成功")
        dataDefaultMd5.value = preSaveDataMd5.value

    }).catch(error => {
        Notify.handleError("錯誤")
        console.log(error);
    })
}

// 聯絡方式
type ContactType = {
    line: string;
    facebook: string;
    message: string;
    instagram: string;
    phone: string;
    googlePlay: string;
    appStore: string

}
const ContactDefault: ContactType = {
    line: '',
    facebook: '',
    message: '',
    instagram: '',
    phone: '',
    googlePlay: '',
    appStore: '',
}

const contactForm = ref<ContactType>(cloneDeep(ContactDefault))

</script>

<style scoped>
</style>