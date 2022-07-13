<template>
    <div class="w-full mt-20 sm:mt-24">
        <div class="relative text-center z-10">
            <img
                src="@/assets/bg-hotelSwiper.svg"
                class="absolute -top-12 left-0 -z-10"
            >
            <div class="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#2B4162]">精選推薦飯店</div>

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
                            class="relative"
                            :name="area"
                            :label="area"
                        >
                            <Transition
                                enter-active-class="animate__animated animate__fadeIn animate__faster"
                                leave-active-class="animate__animated animate__fadeOut animate__faster"
                            >
                                <div
                                    v-if="areaTab == area"
                                    class="absolute bottom-0 z-20 triangle w-3 h-3 bg-[#00586E]"
                                ></div>
                            </Transition>

                        </q-tab>
                    </template>


                </q-tabs>

                <div class="relative mt-3">
                    <q-btn
                        class="hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                        flat
                        round
                        icon="chevron_left"
                        @click="swiperPrev('hotelSwiper')"
                    />
                    <swiper
                        id="hotelSwiper"
                        navigation
                        :direction="$q.screen.lt.sm ? 'vertical' : 'horizontal'"
                        :modules="[Navigation]"
                        :slides-per-view="$q.screen.lt.sm ? 6 : $q.screen.lt.md ? 2 : 3"
                        :space-between="$q.screen.lt.sm ? 50 : 30"
                        :loop="$q.screen.gt.sm"
                    >
                        <template v-for="item in 6">
                            <swiper-slide class="hotel-card-size pb-4">
                                <hotel-card />
                            </swiper-slide>


                        </template>


                    </swiper>
                    <q-btn
                        class="hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                        flat
                        round
                        icon="navigate_next"
                        @click="swiperNext('hotelSwiper')"
                    />

                </div>


            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

import HotelCard from '@/components/HotelCard.vue';
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



const addDays = function (date: Date, days: number) {
    return new Date(new Date().setDate(date.getDate() + days));
}
const hotelLink = (hotel_id: string) => {
    const todayDate = new Date()
    console.log('todayDate', todayDate.toLocaleString());
    const after30day = addDays(todayDate, 30);
    const after38day = addDays(todayDate, 38);
    // console.log('todayDate', todayDate.toLocaleString());
    // console.log('after30day', after30day.toLocaleString(), after30day.toISOString().split('T')[0]);
    // console.log('after38day', after38day.toLocaleString(), after38day.toISOString().split('T')[0]);
    const after30dayString = after30day.toISOString().split('T')[0]
    const after38dayString = after38day.toISOString().split('T')[0]
    // console.log('after30dayString',after30dayString);
    // console.log('after38dayString',after38dayString);
    return `https://www.tourbobo.com/hotel/${hotel_id}?check_in=${after30dayString}&check_out=${after38dayString}&adults=1&children=0&sorting=recommend&business_type=1`
}
const gotoLink = (link: string) => {
    window.location.href = link
}

const areaArray = ref(['北部', '中部', '南部', '其他'])
const areaTab = ref(areaArray.value[0])

const hotelCardSize = ref({
    height: 308,
    width: 298
})
</script>

<style scoped >
@media (max-width: 639px) {
    :deep().hotel-card-size {
        height: v-bind('hotelCardSize.height')px !important;
        width: v-bind('hotelCardSize.width')px !important;
    }

}


.octagon {
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

.triangle {
    clip-path: polygon(100% 0, 0 0, 50% 70%);
}

:deep().absolute-bottom.q-tab__indicator.text-secondary {
    margin-top: 10px;
    margin-bottom: 10px;

}

:deep().q-tab__label {
    margin-bottom: 10px;
}
</style>