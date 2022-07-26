<template>
    <div class="max-w-[1540px] mx-auto w-full mt-14 sm:mt-24">
        <div class="relative text-center z-10">
            <div class="relative flex justify-center items-center">
                <div class="text-xl sm:text-4xl tracking-widest font-bold text-[#2B4162] -translate-x-3 sm:-translate-x-6 ">熱門城市</div>
                <img
                    class="-z-10
                    absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/3
                    min-w-[162px] w-[43.2vw] sm:w-[17.636vw] max-w-[338.62px]"
                    src="@/assets/title-bg.svg"
                >
            </div>
            <div class="mt-5 sm:mt-10 mx-5 sm:mx-16 md:mx-20 xl:mx-24 2xl:mx-0 select-none	">

                <div class="flex  justify-center sm:justify-around flex-wrap ">
                    <template v-for="city in props.cities">
                        <div
                            v-if="city.available"
                            class="cursor-pointer mx-2 sm:mx-0"
                            @click="gotoLink(cityLink(`${city.city_id}`))"
                        >

                            <q-img
                                class="octagon w-[18vw] sm:min-w-[40px] sm:w-[10vw] max-w-[200px]"
                                :src="city.image"
                                :ratio="1"
                            />

                            <span class="block mt-0.5 sm:mt-2 text-sm font-normal sm:text-[28px]">{{ city.city_name }}</span>

                        </div>

                    </template>

                </div>




            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { CityType } from '../../types/home.type';

interface Props {
    cities: CityType[]
}
const props = defineProps<Props>()

const addDays = function (date: Date, days: number) {
    return new Date(new Date().setDate(date.getDate() + days));
}
const cityLink = (city_id: string) => {
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

    return `https://www.tourbobo.com/hotels?check_in=${after30dayString}&check_out=${after31dayString}&city=${city_id}&adults=1&children=0&sorting=recommend&business_type=1`
}
const gotoLink = (link: string) => {
    window.location.href = link
}

</script>

<style scoped>
.octagon {
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
</style>