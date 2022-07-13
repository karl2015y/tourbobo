<template>
    <div class=" w-full mt-20 sm:mt-10">
        <div class="relative text-center">
            <div class="relative flex justify-center items-center">
                <div class="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#2B4162]">優惠活動資訊</div>
                <img
                    class="-z-10
                    absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/3
                    min-w-[162px] w-[43.2vw] sm:w-[17.636vw] max-w-[338.62px]"
                    src="@/assets/title-bg.svg"
                >
            </div>
            <div class="mt-4 sm:mt-10 mx-5 sm:mx-28 select-none	">
                <div class="relative ">
                    <q-btn
                        class="hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                        flat
                        round
                        icon="chevron_left"
                        @click="swiperPrev('activitySwiper')"
                    />
                    <swiper
                        id="activitySwiper"
                        loop
                        navigation
                        :freeMode="$q.screen.lt.sm"
                        :modules="[Navigation, FreeMode]"
                        :slides-per-view="$q.screen.lt.sm ? 1.2 : 3"
                        :space-between="$q.screen.lt.sm?13:30"
                    >
                        <template v-for="item in 6">
                            <swiper-slide>
                                <a href="">
                                    <q-img
                                        src="https://upload.cc/i1/2022/07/12/HGFcif.png"
                                        :ratio="545 / 210"
                                    />
                                </a>
                            </swiper-slide>
                        </template>


                    </swiper>
                    <q-btn
                        class="hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                        flat
                        round
                        icon="navigate_next"
                        @click="swiperNext('activitySwiper')"
                    />

                </div>


            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';

const swiperNext = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-next`) as HTMLElement)?.click()
}
const swiperPrev = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-prev`) as HTMLElement)?.click()
}


</script>

<style scoped>
</style>