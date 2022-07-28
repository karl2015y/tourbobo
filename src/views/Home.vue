<template>
    <div class="min-w-[375px]">
        <PageHomeDB />
        <user-header />
        <banner-swiper :bannerList="bannerList" />
        <searching-bar />
        <activity-swiper :activityList="activityList" />
        <cities :cities="cities" />
        <hotel-swiper
            v-if="areaArray && areaArray.length > 0"
            :areaArray="areaArray"
        />
        <hotel-category :hotelCategories="hotelCategories" />
        <activity-image-info />
        <about />
        <user-footer />


    </div>


</template>

<script setup lang="ts">
import PageHomeDB from '@/components/firestore/PageHomeDB.vue';
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import BannerSwiper from '@/components/Home/BannerSwiper.vue';
import SearchingBar from '@/components/Home/SearchingBar.vue';
import ActivitySwiper from '@/components/Home/ActivitySwiper.vue';
import Cities from '@/components/Home/Cities.vue';
import HotelSwiper from '../components/Home/HotelSwiper.vue';
import HotelCategory from '../components/Home/HotelCategory.vue';
import ActivityImageInfo from '../components/Home/ActivityImageInfo.vue';
import About from '../components/Home/About.vue';
import { setCssVar } from 'quasar';
import { computed, ref } from 'vue';
import { usePageHomeStore } from '@/stores/page-home.store';
import { usePageHotelCategoryStore } from '@/stores/page-hotelCategory.store';

setCssVar('primary', '#F6AC00')
setCssVar('secondary', '#00586E')
const pageHomeStore = usePageHomeStore()
const pageHotelCategoryStore = usePageHotelCategoryStore()
// BannerSwiper
const bannerList = computed(() => pageHomeStore.bannerList)
// activity-swiper 
const activityList = computed(() => pageHomeStore.activityList)
// Cities
const cities = computed(() => pageHomeStore.cities)
// HotelSwiper
const areaArray = computed(() => pageHomeStore.areaArray)
// HotelCategory
const hotelCategories = computed(() => pageHotelCategoryStore.hotelCategoryData)
</script>

<style>
body{
  font-family: 'Noto Sans TC';
}
</style>