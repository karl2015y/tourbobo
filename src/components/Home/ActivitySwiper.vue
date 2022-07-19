<template>
    <div class="max-w-[1920px] mx-auto w-full mt-20 sm:mt-10">
        <div class="relative text-center">
            <div class="relative flex justify-center items-center">
                <div class="text-2xl sm:text-4xl tracking-widest font-bold text-[#2B4162]">優惠活動資訊</div>
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
                                        <div  class="sm:hidden mt-1">{{ item.name }}</div>
                                    </q-router-link>

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
import { ref } from 'vue';

const swiperNext = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-next`) as HTMLElement)?.click()
}
const swiperPrev = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-prev`) as HTMLElement)?.click()
}

const activityList = ref([
    {
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
        link: '/hotel-category?category=%E6%82%A0%E9%81%8A%E5%9C%8B%E6%97%85',
        name: '國旅專區：最高現折1300元'
    },
    {
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=487e6587-5a35-4426-b9ea-94536b03ec36',
        link: '',
        name: '國旅專區：最高現折1300元'

    },
    {
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner3_1.png?alt=media&token=6b90b0db-c48f-471b-beab-ad0b3b46d7cd',
        link: '/hotel-category?category=人氣民宿',
        name: '國旅專區：最高現折1300元'

    },
])

</script>

<style scoped>
</style>