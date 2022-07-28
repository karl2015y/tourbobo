<template>
    <div class="max-w-[1800px] mx-auto w-full mt-16 sm:mt-7 ">
        <div class="relative text-center">
            <div class="relative flex justify-center items-center">
                <div class="text-xl sm:text-4xl tracking-widest font-bold text-[#2B4162]">優惠活動資訊</div>
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
                        class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white  hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                        flat
                        round
                        icon="chevron_left"
                        @click="swiperPrev('activitySwiper')"
                    />
                    <swiper
                        id="activitySwiper"
                        loop
                        navigation
                        :modules="[Navigation]"
                        :slides-per-view="$q.screen.lt.sm ? 1.2 : 3"
                        :space-between="$q.screen.lt.sm ? 13 : 30"
                    >
                        <template v-for="item in activityList">
                            <swiper-slide>
                                <div class="rounded-xl border sm:border-0 sm:rounded-none">
                                    <q-router-link :to="item.link">
                                        <q-img
                                            class="rounded-t-xl sm:rounded-none"
                                            :src="item.image"
                                            :ratio="545 / 210"
                                        />
                                        <div class="sm:hidden mt-1">{{ item.name }}</div>
                                    </q-router-link>

                                    <q-tooltip v-if="$q.screen.gt.sm">{{ item.name }}</q-tooltip>
                                </div>


                            </swiper-slide>
                        </template>


                    </swiper>
                    <q-btn
                        class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white  hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
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
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { computed, ref } from 'vue';
import { ActivityType } from '../../types/home.type';

const swiperNext = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-next`) as HTMLElement)?.click()
}
const swiperPrev = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-prev`) as HTMLElement)?.click()
}


interface Props {
    activityList: ActivityType[];
}
const props = defineProps<Props>()
const activityList = computed(() => props.activityList)


</script>

<style scoped>
</style>