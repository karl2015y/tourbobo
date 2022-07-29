<template>
    <div class="hidden">PAGEHOMEDB</div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { PostCategoryType, PostType } from '@/types/post.type';
import { ref, watchEffect } from 'vue';
import { find, findIndex } from 'lodash';
import { usePageHomeStore } from '@/stores/page-home.store';
import { ActivityType, AreaType, BannerListType, CityType } from '@/types/home.type';



const pageHomeStore = usePageHomeStore()
const pageHomeDB = db().collection('Sites/travel-tbb/Pages').doc('Home');
const pageHomeData = ref<{
    bannerList: BannerListType[],
    activityList: ActivityType[],
    cities: CityType[],
    areaArray: AreaType[],
    aboutObj: {
        content: string
    }
}>((useFirestore(pageHomeDB)) as any)
watchEffect(() => {
    if (pageHomeData.value) {
        pageHomeStore.bannerList = pageHomeData.value.bannerList;
        pageHomeStore.activityList = pageHomeData.value.activityList;
        pageHomeStore.cities = pageHomeData.value.cities;
        pageHomeStore.areaArray = pageHomeData.value.areaArray;
        pageHomeStore.aboutObj = pageHomeData.value.aboutObj;

    }
})

</script>

<style scoped>
</style>