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
    <div class="p-7 flex justify-between items-center">
        <div class="font-bold text-xl "> 編輯文章</div>
    </div>
    <div class="p-5 bg-grey-1 shadow-md">

        <div class="flex ">
            <q-select
                class="flex-1"
                v-model="categoryItem"
                :options="postStore.postCategoryArray"
                label="文章分類"
                option-label="postCategory_name"
            />

            <post-category-list-with-editor class="w-32" />
        </div>

        <div class="flex justify-between mt-4 mb-3">
            <div class="flex">
                <q-toggle
                    label="置頂"
                    v-model="formData.isTopPost"
                />
                <q-toggle
                    label="在看板上顯示"
                    v-model="formData.showOnBoard"
                />
            </div>

        </div>

    </div>
    <div class="p-5 shadow-md">
        <div class="font-bold text-lg mt-4 text-gray-600">文章標題</div>
        <q-input
            v-model="formData.title"
            outlined
        />

        <div class="font-bold text-lg mt-4 text-gray-600">文章次標題</div>
        <q-input
            v-model="formData.subTitle"
            outlined
            hint="僅電腦可見"
        />


        <e-image-uploader
            v-model="formData.image"
            name="文章主圖片"
        />

        <!---->

        <e-q-editor
            v-model="formData.content"
            name="內文編輯器"
        />
        <e-q-editor
            v-model="formData.note"
            name="注意事項編輯器"
        />
    </div>
</template>

<script setup lang="ts">
import PostCategoryListWithEditor from '@/components/admin/post/PostCategoryListWithEditor.vue';
import { usePostStore } from '@/stores/post.store';
import { PostType, PostCategoryType } from '@/types/post.type';
import { computed, ref, watchEffect } from 'vue';
import EImageUploader from '@/components/admin/elements/EImageUploader.vue'
import EQEditor from '@/components/admin/elements/EQEditor.vue';
import EQSelect from '@/components/admin/elements/EQSelect.vue';
import { db } from '@/common/firebase';
import { useNotify } from '@/composables/notify';

import { useRoute } from 'vue-router';
import { assign, cloneDeep, isEmpty } from 'lodash';
import md5 from 'md5';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { useAdminStore } from '@/stores/admin.store';
const route = useRoute()
const Notify = useNotify()
const adminStore = useAdminStore()

// DB
const postDB = db().collection('Sites/travel-tbb/Posts').doc(String(route.params.id));
const postData = ref((useFirestore(postDB)) as any)
const TimeNote = ref<Array<any | null>>((useFirestore(postDB.collection('TimeNote').orderBy('timestamp', 'desc').limit(1))) as any)
const DBLock = ref<boolean>(false)
watchEffect(() => {
    if (postData.value) {
        console.log(1);
        if (!DBLock.value) {
            console.log(2);
            formData.value = postData.value
            DBLock.value = true
        }


    }
})
const preSaveData = computed(() => {
    if (postData.value === null || postData.value) {
        formData.value.category_id = categoryItem.value?.postCategory_id ?? ''

        return formData.value
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
const isDifferent = computed(() => postData.value === null || (dataDefaultMd5.value !== preSaveDataMd5.value))
const handleSave = () => {
    if (!isDifferent.value) return;
    postDB.collection('TimeNote').add({
        timestamp: (new Date).getTime(),
        time: (new Date).toLocaleString(),
        adminName: adminStore.userName
    })
    postDB.set(formData.value).then(() => {
        DBLock.value = false
        Notify.handleSuccess("成功")
        dataDefaultMd5.value = preSaveDataMd5.value

    }).catch(error => {
        Notify.handleError("錯誤")
        console.log(error);
    })
}



const postStore = usePostStore()
const formDefault = {
    available: true,
    isTopPost: false,
    showOnBoard: true,
    category_id: '',
    title: '',
    subTitle: '',
    createDate: '',
    content: '',
    image: '',
    note: '',
}
const formData = ref(cloneDeep(formDefault))
const categoryItem = ref<PostCategoryType>()
watchEffect(() => {
    categoryItem.value = postStore.postCategoryArray?.find(pc => (pc.postCategory_id == formData.value.category_id))
})




</script>

<style scoped>
</style>