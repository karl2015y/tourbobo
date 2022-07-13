<template>
    <div class="w-full mt-20 sm:mt-24">
        <div class="relative text-center z-10">
            <div class="relative flex justify-center items-center">
                <div class="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#2B4162]">熱門城市</div>
                <img
                    class="-z-10
                    absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/3
                    min-w-[162px] w-[43.2vw] sm:w-[17.636vw] max-w-[338.62px]"
                    src="@/assets/title-bg.svg"
                >
            </div>
            <div class=" sm:mt-10 mx-5 sm:mx-28 select-none	">

                <div class="flex justify-center flex-wrap">
                    <template v-for="city in props.cities">
                        <div
                            class="m-2 cursor-pointer	"
                            @click="gotoLink(cityLink(`${city.city_id}`))"
                        >

                            <q-img
                                class="octagon w-[18vw] sm:w-[6.3vw] md:w-[7.6vw] lg:w-[9.3vw] xl:w-[10vw] 2xl:w-[11vw]"
                                :src="city.image"
                                :ratio="1"
                            />

                            <span class="block text-2xl font-normal">{{ city.city_name }}</span>

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
            "image": "https://picsum.photos/340/340"
        },
        {
            "city_id": 2,
            "city_name": "新北",
            "city_en_name": "new-taipei-city",
            "image": "https://picsum.photos/340/340"
        },
        {
            "city_id": 3,
            "city_name": "台中",
            "city_en_name": "taichung",
            "image": "https://picsum.photos/340/340"
        },
        {
            "city_id": 4,
            "city_name": "高雄",
            "city_en_name": "kaohsiung",
            "image": "https://picsum.photos/340/340"
        },
        {
            "city_id": 4,
            "city_name": "高雄",
            "city_en_name": "kaohsiung",
            "image": "https://picsum.photos/340/340"
        },
        {
            "city_id": 4,
            "city_name": "高雄",
            "city_en_name": "kaohsiung",
            "image": "https://picsum.photos/340/340"
        },
        {
            "city_id": 4,
            "city_name": "高雄",
            "city_en_name": "kaohsiung",
            "image": "https://picsum.photos/340/340"
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
    const after38day = addDays(todayDate, 38);
    // console.log('todayDate', todayDate.toLocaleString());
    // console.log('after30day', after30day.toLocaleString(), after30day.toISOString().split('T')[0]);
    // console.log('after38day', after38day.toLocaleString(), after38day.toISOString().split('T')[0]);
    const after30dayString = after30day.toISOString().split('T')[0]
    const after38dayString = after38day.toISOString().split('T')[0]
    // console.log('after30dayString',after30dayString);
    // console.log('after38dayString',after38dayString);

    return `https://www.tourbobo.com/hotels?check_in=${after30dayString}&check_out=${after38dayString}&city=${city_id}&adults=1&children=0&sorting=recommend&business_type=1`
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