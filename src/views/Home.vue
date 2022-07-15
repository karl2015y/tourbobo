<template>
    <div class="min-w-[375px]">

        <user-header />
        <banner-swiper />
        <searching-bar />
        <activity-swiper />
        <cities />
        <hotel-swiper />
        <hotel-category />
        <activity-image-info />
        <about />
        <user-footer />


    </div>


</template>

<script setup lang="ts">
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

setCssVar('primary', '#F6AC00')
setCssVar('secondary', '#00586E')

</script>

<style scoped>
</style>