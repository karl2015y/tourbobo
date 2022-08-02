<template>
  <PostDB />
  <user-header />
  <post-list
    :postCategory="postCategory"
    :postArray="postArray"
  />
  <user-footer />

</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import PostList from '../components/Post/PostList.vue';
import { computed, ref } from 'vue';
import { usePostStore } from '@/stores/post.store';
import PostDB from '@/components/firestore/PostDB.vue';
const postStore = usePostStore()

const postCategory = computed(() => postStore.postCategoryArray)

const postArray = computed(() => postStore.postArray.sort((a, b) => {
  const aTime = (new Date(a.createDate).getTime())
  const bTime = (new Date(b.createDate).getTime())
  return bTime - aTime
})
.sort((a, b) => {
  const aIsTopPost = (a.isTopPost ?? false)
  const bIsTopPost = (b.isTopPost ?? false)
  if (aIsTopPost) {
    return -1
  } else if (bIsTopPost) {
    return 1
  } else {
    return 0
  }
})

)
</script>

<style>
body {
  font-family: 'Noto Sans TC';
}
</style>