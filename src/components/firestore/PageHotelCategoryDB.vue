<template>
    <div class="hidden">PAGEHOTELCATEGORYDB</div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { ref, watchEffect } from 'vue';
import { HotelCategoryType } from '@/types/hotel.type';
import { usePageHotelCategoryStore } from '@/stores/page-hotelCategory.store';



const pageHotelCategoryStore = usePageHotelCategoryStore()
const pageHotelCategoryDB = db().collection('Sites/travel-tbb/Pages').doc('HotelCategory');
const pageHotelCategoryData = ref<{
    hotelCategoryData: HotelCategoryType[],
}>((useFirestore(pageHotelCategoryDB)) as any)
watchEffect(() => {
    if (pageHotelCategoryData.value) {
        pageHotelCategoryStore.hotelCategoryData = pageHotelCategoryData.value.hotelCategoryData;
    }
})

</script>

<style scoped>
</style>