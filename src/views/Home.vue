<template>
    <div class="min-w-[375px]">
        <div class="max-w-[1920px] min-w-[375px] mx-auto ">
            <user-header />
        </div>
        <!-- <div class="h-[150vh] bg-emerald-500">
            home

        </div> -->
        <banner-swiper />
        <searching-bar />
        <activity-swiper/>
        <user-footer />

    </div>


</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import BannerSwiper from '@/components/Home/BannerSwiper.vue';
import SearchingBar from '@/components/Home/SearchingBar.vue';
import ActivitySwiper from '../components/Home/ActivitySwiper.vue';

import { setCssVar } from 'quasar';

setCssVar('primary', '#F6AC00')

</script>

<style scoped>
</style>