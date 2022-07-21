<template>
    <div class="max-w-[1540px] mx-auto w-full mt-20 sm:mt-24">
        <div class="relative text-center z-10">
            <div class="relative flex justify-center items-center">
                <div class="text-2xl sm:text-4xl tracking-widest font-bold text-[#2B4162] sm:-translate-x-6 ">熱門城市</div>
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
                            class="cursor-pointer mx-2 sm:mx-0"
                            @click="gotoLink(cityLink(`${city.city_id}`))"
                        >

                            <q-img
                                class="octagon w-[18vw] sm:min-w-[40px] sm:w-[10vw] max-w-[200px]"
                                :src="city.image"
                                :ratio="1"
                            />

                            <span class="block mt-2 text-[28px] font-normal">{{ city.city_name }}</span>

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

interface Props {
    cities?: Array<{
        "city_id": number,
        "city_name": string,
        "city_en_name": string,
        "image": string
    }>;
}
const props = withDefaults(defineProps<Props>(), {
    cities: () => [
        {
            "city_id": 1,
            "city_name": "台北",
            "city_en_name": "taipei",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E5%8F%B0%E5%8C%97.jpg?alt=media&token=862a1c44-0bb4-4dd2-888c-185e71d9117f"
        },
        {
            "city_id": 3,
            "city_name": "新北",
            "city_en_name": "new-taipei-city",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E6%96%B0%E5%8C%97.jpg?alt=media&token=d3eb4b48-c809-4457-a231-aafa68191e23"
        },
        {
            "city_id": 5,
            "city_name": "桃園",
            "city_en_name": "taoyuan",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E6%A1%83%E5%9C%92.jpg?alt=media&token=f53c6a18-4a37-41d4-a1f3-21720d467513"
        },
        {
            "city_id": 6,
            "city_name": "新竹",
            "city_en_name": "hsinchu",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E6%96%B0%E7%AB%B9.jpg?alt=media&token=cf9c42a5-453c-4220-9155-403efc71ffb3"
        },
        {
            "city_id": 9,
            "city_name": "台中",
            "city_en_name": "taichung",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E5%8F%B0%E4%B8%AD.jpg?alt=media&token=0b1ddfb7-af9b-411b-8858-fdbbbe3cb5ac"
        },
        {
            "city_id": 15,
            "city_name": "台南",
            "city_en_name": "tainan",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E5%8F%B0%E5%8D%97.jpg?alt=media&token=4625df90-9806-4453-b24b-b33b536f4721"
        },


        {
            "city_id": 16,
            "city_name": "高雄",
            "city_en_name": "kaohsiung",
            "image": "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E9%AB%98%E9%9B%84.jpg?alt=media&token=c6d5860a-30df-4d5d-abc7-15d21dd8f50b"
        }
    ]

});

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