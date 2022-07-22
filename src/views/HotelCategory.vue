<template>
    <user-header />
    <category-list :hotelCategoryData="hotelCategoryData" />
    <user-footer />

</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import CategoryList from '@/components/HotelCategory/CategoryList.vue';
import { computed, ref } from 'vue';
import { usePageHotelCategoryStore } from '@/stores/page-hotelCategory.store';
const pageHotelCategoryStore = usePageHotelCategoryStore()
const hotelCategoryData = computed(() => pageHotelCategoryStore.hotelCategoryData)
</script>

<style scoped>
</style>