<template>
    <div class=" w-full mt-20 sm:mt-24">
        <div class="relative text-center z-10">
            <img
                src="@/assets/bg-hotelSwiper.svg"
                class="absolute -top-12 left-0 -z-10 w-full"
            >
            <div class="text-2xl sm:text-4xl tracking-widest font-bold text-[#2B4162] ">精選推薦飯店</div>

            <div class=" sm:mt-5 mx-5 sm:mx-28 select-none	">

                <q-tabs
                    v-model="areaTab"
                    dense
                    class="text-black sm:w-[31.458vw] mx-auto"
                    indicator-color="secondary"
                    align="justify"
                >
                    <template v-for="area in areaArray">
                        <q-tab
                            class="relative !text-2xl"
                            :name="area.name"
                            :label="area.name"
                        >
                            <Transition
                                enter-active-class="animate__animated animate__fadeIn animate__faster"
                                leave-active-class="animate__animated animate__fadeOut animate__faster"
                            >

                                <div
                                    v-if="areaTab == area.name"
                                    class="absolute bottom-0 z-20 triangle w-3 h-3 bg-[#00586E]"
                                ></div>
                            </Transition>

                        </q-tab>
                    </template>


                </q-tabs>
                <template v-if="currentHotelList?.length > 0">
                    <div class="relative mt-3 hidden sm:!block max-w-[1660px] mx-auto">
                        <q-btn
                            v-if="currentHotelList.length > 4"
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white  hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="chevron_left"
                            @click="swiperPrev('hotelSwiper')"
                        />
                        <swiper
                            id="hotelSwiper"
                            navigation
                            :modules="[Navigation]"
                            :slides-per-view="$q.screen.lt.md ? 3 : 4"
                            :space-between="30"
                            :loop="currentHotelList.length > 4"
                        >
                            <template v-for="hotel in currentHotelList">
                                <swiper-slide class="pb-4">
                                    <hotel-card :hotel="hotel" />
                                </swiper-slide>
                            </template>
                        </swiper>
                        <q-btn
                            v-if="currentHotelList.length > 4"
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="navigate_next"
                            @click="swiperNext('hotelSwiper')"
                        />
                    </div>

                    <div class="mt-3 sm:hidden">
                        <template v-for="hotel in currentHotelList">
                            <div class="pb-7">
                                <hotel-card :hotel="hotel" />
                            </div>
                        </template>

                    </div>
                </template>
                <template v-else-if="loading">
                    <div class="mt-3 text-xl text-gray-400">載入中...</div>
                </template>
                <template v-else>
                    <div class="mt-3 text-xl text-gray-400">暫無資料</div>
                </template>

            </div>
        </div>
        <svg
            class="w-full sm:hidden"
            width="376"
            height="173"
            viewBox="0 0 376 173"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M-102.574 61.504C19.6561 78.7347 106.963 64.2887 165.257 46.9761C217.828 31.3388 253.316 11.5018 320.691 3.31088C390.656 -5.19279 450.714 4.26415 491.227 13.8848C487.855 62.7399 484.491 70.1565 481.119 119.012C348.632 13.1328 88.4003 146.183 -113.381 134.232C-106.162 113.196 -109.771 82.5398 -102.574 61.504Z"
                fill="#FBB03B"
            />
            <path
                d="M486.587 107.742C488.819 102.001 488.164 93.2325 488.008 88.604C487.8 82.4542 486.885 76.2543 486.133 70.0615C485.902 52.99 485.672 36.6645 485.441 10.2284C444.284 2.82999 383.617 -3.31963 314.496 9.13061C247.92 21.1288 214.041 43.0656 162.831 61.6799C106.018 82.3251 20.0433 101.714 -103.226 91.2375C-108.8 112.765 -102.802 108.244 -108.368 129.779C-106.962 129.779 -105.548 129.779 -104.134 129.779C-103.871 144.189 -103.623 158.596 -103.39 173C-103.39 171.443 -16.7456 163.729 -9.17798 162.817C46.6305 156.137 100.43 138.714 151.223 119.267C198.593 101.126 248.114 84.9947 300.618 80.7178C359.515 75.9172 421.261 83.6525 471.221 110.778C472.318 111.385 473.46 111.915 474.637 112.363C478.855 115.666 482.884 119.188 486.706 122.912C486.684 117.451 486.632 112.428 486.587 107.742Z"
                fill="#F9F3E8"
            />
        </svg>

    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

import HotelCard from '@/components/HotelCard.vue';
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import { computedAsync } from '@vueuse/core';
import { find } from 'lodash';

const swiperNext = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-next`) as HTMLElement)?.click()
}
const swiperPrev = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-prev`) as HTMLElement)?.click()
}



const addDays = function (date: Date, days: number) {
    return new Date(new Date().setDate(date.getDate() + days));
}
const hotelsLink = (hotel_ids: Array<string>) => {
    const todayDate = new Date()
    console.log('todayDate', todayDate.toLocaleString());
    const after30day = addDays(todayDate, 30);
    const after31day = addDays(todayDate, 31);
    // console.log('todayDate', todayDate.toLocaleString());
    // console.log('after30day', after30day.toLocaleString(), after30day.toISOString().split('T')[0]);
    // console.log('after31day', after31day.toLocaleString(), after31day.toISOString().split('T')[0]);
    const after30dayString = after30day.toISOString().split('T')[0]
    const after31dayString = after31day.toISOString().split('T')[0]
    // console.log('after30dayString',after30dayString);
    // console.log('after31dayString',after31dayString);
    let baseUrl = `https://ota-api.tourbobo.com/ota/hotels?per_page=${hotel_ids?.length}&adults=1&children=0&check_in=${after30dayString}&check_out=${after31dayString}&business_type=1`
    hotel_ids.forEach(hotel_id => {
        baseUrl += `&hotel_id[]=${hotel_id}`
    })
    return baseUrl
}
const gotoLink = (link: string) => {
    window.location.href = link
}

const areaArray = ref([
    {
        name: '北部',
        hotes_id: ['426', '353', '448', '562'],
    },
    {
        name: '中部',
        hotes_id: ['474', '583', '466', '468'],
    },
    {
        name: '南部',
        hotes_id: ['465', '536', '505', '538'],
    },
    {
        name: '東部',
        hotes_id: ['556', '479', '558', '488'],
    },

])
const areaTab = ref(areaArray.value[0].name)
const loading = ref(false)
const currentHotelList = computedAsync(
    async () => {

        return new Promise<Array<any>>((resolve, reject) => {
            const myHeaders = new Headers();
            myHeaders.append("Accept-Language", "zh_TW");
            fetch(hotelsLink(find(areaArray.value, ['name', areaTab.value])?.hotes_id as Array<string>), {
                method: 'GET',
                headers: myHeaders,
            })
                .then(response => response.text())
                .then(result => {
                    resolve((JSON.parse(result) as any)['data'])
                })
                .catch(error => reject(error));
        })




    },
    [],
    loading,
)

</script>

<style scoped >
.octagon {
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

.triangle {
    clip-path: polygon(100% 0, 0 0, 50% 70%);
}

:deep().q-tab--inactive .q-tab__indicator {
    opacity: 1;
    background-color: #BCBBBB;
}

:deep().absolute-bottom.q-tab__indicator.text-secondary {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 4px;

}

:deep().q-tab__label {
    margin-bottom: 10px;
    font-size: 26px;
    font-weight: 600;
}
</style>