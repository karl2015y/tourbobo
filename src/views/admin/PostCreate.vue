<template>
    <div class="p-7 flex justify-between items-center">
        <div class="font-bold text-xl "> 新增文章</div>
        <q-btn
            @click="clickCreate()"
            text-color="black"
            label="送出"
        />
    </div>
    <div class="p-5 bg-grey-1 shadow-md mx-5">

        <q-select
            v-model="categoryItem"
            :options="postStore.postCategoryArray"
            label="文章分類"
            option-label="postCategory_name"
        />
        <div class="flex justify-between mt-4 mb-3">
            <div class="flex">
                <q-toggle
                    label="置頂"
                    v-model="formData.isTopPost"
                />
                <q-toggle
                    label="在看板上顯示（僅手機可見）"
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
            path="tbb/posts"
            v-model="formData.image"
            name="文章主圖片"
        />


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
import { useFilter } from '@/composables/filters';
import { usePostStore } from '@/stores/post.store';
import { PostType, PostCategoryType } from '@/types/post.type';
import { ref, watchEffect } from 'vue';
import EImageUploader from '@/components/admin/elements/EImageUploader.vue'
import EQEditor from '@/components/admin/elements/EQEditor.vue';
import EQSelect from '@/components/admin/elements/EQSelect.vue';
import { db } from '@/common/firebase';
import { useNotify } from '@/composables/notify';

import { useRoute } from 'vue-router';
import { useRouteQuery } from '@vueuse/router';
const category_id = useRouteQuery('category_id')

const route = useRoute()
const postDB = db().collection('Sites/travel-tbb/Posts');
const Notify = useNotify()
const { formatDate } = useFilter()
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
const formData = ref(formDefault)

const categoryItem = ref<PostCategoryType>()
watchEffect(() => {
    if (category_id.value) {
        categoryItem.value = postStore.postCategoryArray?.find(pc => (pc.postCategory_id == category_id.value))
    }
})

watchEffect(() => {
    formData.value.category_id = categoryItem.value?.postCategory_id ?? ''
    formData.value.createDate = new Date().toLocaleString().split(' ')[0]
})
const resetForm = (form?: PostType) => {
    if (form) {
        formData.value = JSON.parse(JSON.stringify(form))
    } else {
        formData.value = JSON.parse(JSON.stringify(formDefault))
    }
}
const clickCreate = () => {
    postDB.add(formData.value).then(() => {
        Notify.handleSuccess("成功")
    }).catch(error => {
        Notify.handleError("錯誤")
        console.log(error);
    })
}




</script>

<style scoped>
</style>