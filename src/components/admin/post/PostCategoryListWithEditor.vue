<template>
    <!-- 按鈕區 -->
    <q-btn
        label="修改文章分類"
        @click="showDialog = true"
    />
    <!-- 列表區 -->
    <q-dialog v-model="showDialog">

        <q-card class="sm:w-[80vw]">
            <q-card-section class="row items-center q-pb-none">
               
            </q-card-section>

            <q-card-section class="q-pt-none">
                <e-q-select
                    v-model="postCategoryArray"
                    name="文章分類"
                    key1-name="postCategory_name"
                    key1-label="分類名稱"
                />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    @click="handleSave()"
                    label="儲存"
                />
                <q-btn
                    flat
                    label="關閉"
                    color="primary"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import EQSelect from '../elements/EQSelect.vue';
import { usePostStore } from '@/stores/post.store';

import { ref, watchEffect } from 'vue';
import { map } from 'lodash';
import { db } from '@/common/firebase';
import { useNotify } from '@/composables/notify';

const Notify = useNotify()
const showDialog = ref(false)
const postStore = usePostStore()
const postCategoryArray = ref([

])

watchEffect(() => {
    postCategoryArray.value = map(
        postStore.postCategoryArray
        , (o) => ({ id: Number(o.postCategory_id), postCategory_name: o.postCategory_name })) as never[];

})


const handleSave = () => {
    console.log(postCategoryArray.value);
    const data = map(postCategoryArray.value, (o) => ({ postCategory_id: `${o['id']}`, postCategory_name: o['postCategory_name'] }))
    console.log(data);
    const postCategoryDB = db().collection('Sites/travel-tbb/Posts').doc('Setting');
    postCategoryDB.set({
        postCategoryArray: data
    }).then(() => {
        Notify.handleSuccess('已儲存')
    })

}


</script>

<style scoped>
</style>