<template>
    <q-responsive :ratio="$q.screen.lt.sm ? 375 / 166 : 1920 / 585">
        <swiper
            class=" h-full w-full max-w-[1920px]"
            loop
        >
            <template v-for="item in bannerList">
                <swiper-slide>
                    <div class="h-full relative banner-swiper-container">
                        <!-- 電腦版 -->
                        <img
                            class="hidden sm:!block w-full h-full object-cover"
                            :src="item.image"
                        >
                        <!-- 手機版 -->
                        <img
                            class="sm:hidden  w-full h-full object-cover"
                            :src="item.smallImage ? item.smallImage : item.image"
                        >
                        <!-- <div class="absolute top-0 left-0 w-full h-full bg-[#00000070]"></div> -->
                        <q-router-link
                            :to="item.link"
                            class="absolute bottom-5 sm:bottom-1/3 left-1/2 -translate-x-1/2"
                        >
                            <div
                                class="flex justify-center items-center min-w-[85px] w-[10vw] max-w-[180px] sm:h-[3.645vw] max-h-[70px] sm:text-[1.4vw] 2xl:text-[27px] rounded-full border-2 border-white bg-[#00586E] text-white ">
                                查看更多
                            </div>
                        </q-router-link>
                    </div>


                </swiper-slide>
            </template>



        </swiper>
    </q-responsive>

</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { computed, ref } from 'vue';
import { BannerListType } from '../../types/home.type'


interface Props {
    bannerList: BannerListType[];
}
const props = defineProps<Props>()
const bannerList = computed(() => props.bannerList)
</script>

<style scoped>
.banner-swiper-container {
    clip-path: ellipse(100% 100% at 50% 0%);
}
</style>