<template>
    <div class="q-pa-md">
        <div class="my-3 flex gap-5">
            <q-btn-toggle
                v-model="categoryKeyword"
                toggle-color="primary"
                :options="
                [
                    { label: '全部種類', value: 'all' },
                    ...postStore.postCategoryArray.map(pc => ({ label: pc.postCategory_name, value: pc.postCategory_id }))
                ]"
            />

            <router-link
                :to="{ name: 'PostCreate', query: categoryKeyword == 'all' ? {} : { category_id: categoryKeyword } }">
                <q-btn
                    color="primary"
                    label="新增"
                />
            </router-link>

        </div>
        <q-table
            :rows="postArray"
            :columns="columns"
            row-key="name"
            hide-bottom
            selection="multiple"
            :rows-per-page-options="[0]"
        >
            <template v-slot:header-selection="scope">


            </template>
            <template v-slot:body-selection="scope">

                <router-link :to="{ name: 'PostEdit', params: { id: scope.row.post_id } }">
                    <q-btn
                        class="ml-1"
                        round
                        color="primary"
                        icon="edit"
                        size="sm"
                    >
                        <q-tooltip>編輯</q-tooltip>
                    </q-btn>

                </router-link>

                <q-btn
                    @click="clickRemovePost(scope.row.post_id)"
                    class="ml-1"
                    round
                    color="negative"
                    icon="delete_outline"
                    size="sm"
                >
                    <q-tooltip>刪除</q-tooltip>
                </q-btn>

            </template>

        </q-table>
    </div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { useDialog } from '@/composables/dialog';
import { useNotify } from '@/composables/notify';
import { usePostStore } from '@/stores/post.store';
import { PostType } from '@/types/post.type';
import { ref, watchEffect } from 'vue';
import { useRouteQuery } from '@vueuse/router'

const Dialog = useDialog()
const Notify = useNotify()
const postStore = usePostStore();

const columns = ref([
    { name: 'createDate', label: '建立時間', field: 'createDate' },
    { name: 'post_id', label: '文章編號', field: 'post_id' },
    { name: 'title', label: '文章標題', field: 'title' },
    {
        name: 'category_id', label: '文章分類', field: 'category_id',
        format: (val: string) => postStore.postCategoryArray.find(pc => (pc.postCategory_id == val))?.postCategory_name,
    },
    {
        name: 'showOnBoard', label: '在看板顯示', field: 'showOnBoard',
        format: (val: boolean) => `${val ? '是' : '否'}`,
    },

])

// const categoryKeyword = ref('all')
const categoryKeyword = useRouteQuery('category_id', 'all')
const postArray = ref<PostType[]>()
watchEffect(() => {
    postArray.value = JSON.parse(JSON.stringify(postStore.postArray))
    if (categoryKeyword.value != 'all') {
        postArray.value = postArray.value?.filter(item => (item.category_id == categoryKeyword.value))
    }
})



const clickRemovePost = (id: string) => {
    Dialog.create({
        title: '刪除確認',
        message: '是否要刪除?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        db().collection('Sites/travel-tbb/Posts').doc(id).delete().then(() => {
            Notify.handleSuccess("刪除成功")

        })

    })
}


</script>

<style scoped>
</style>