<template>
    <div class=" border shadow-md  rounded-xl bg-white">
        <div class="relative">
            <span
                class=" flex items-center gap-2 bg-[#DC492A] rounded-3xl px-2 py-1 absolute left-3 top-3 z-10 text-sm text-[#F9EDD5]"
            >
                <svg
                    class="inline"
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14.9968 7.15497C14.9968 12.4611 7.49838 17.0093 7.49838 17.0093C7.49838 17.0093 0 12.4611 0 7.15497C2.96338e-08 5.34561 0.790005 3.61035 2.19622 2.33094C3.60244 1.05153 5.50969 0.332764 7.49838 0.332764C9.48707 0.332764 11.3943 1.05153 12.8005 2.33094C14.2068 3.61035 14.9968 5.34561 14.9968 7.15497Z"
                        fill="#F9EDD5"
                    />
                    <path
                        d="M7.49848 9.429C8.8789 9.429 9.99794 8.41086 9.99794 7.15493C9.99794 5.89899 8.8789 4.88086 7.49848 4.88086C6.11807 4.88086 4.99902 5.89899 4.99902 7.15493C4.99902 8.41086 6.11807 9.429 7.49848 9.429Z"
                        fill="#DC492A"
                    />
                </svg>


                {{ props.hotel.county }}
                {{ props.hotel.area }}
            </span>
            <swiper
                class="rounded-t-xl"
                :modules="[Pagination]"
                loop
                pagination
                style="
                --swiper-pagination-color:#ffffff;
                --swiper-pagination-bullet-horizontal-gap: 2px;
                --swiper-pagination-bullet-inactive-color: #ffffff;
                --swiper-pagination-bullet-inactive-opacity: 0.5
                "
            >
                <template v-for="img in $q.screen.lt.sm ? props.hotel.small_images : props.hotel.images">
                    <swiper-slide>
                        <q-img
                            :src="img"
                            :ratio="2 / 1"
                        />

                    </swiper-slide>
                </template>




            </swiper>


        </div>
        <div class="px-4 sm:flex justify-between">
            <div>
                <div class="text-xl font-bold mt-4 mb-2 text-left">
                    <a href="">
                        {{ props.hotel.name }}
                    </a>
                </div>
                <ul class="flex sm:hidden gap-1.5">
                    <template v-for=" tag in props.hotel.facility_tags">
                        <li>
                            <q-icon
                                name="check"
                                class="-mt-1 text-white bg-[#6DCD01] rounded-full p-0.5 font-black"
                            />
                            {{ tag.name }}
                        </li>
                    </template>
                </ul>
                <div class="sm:hidden line-through text-[#979797] text-right text-lg leading-6">TWD {{ props.hotel.original_price
                }}
                </div>
                <div class="mt-8 flex justify-between items-center gap-5">
                    <div class="font-semibold text-lg leading-6">每晚最低</div>
                    <div class="text-[#DC492A] text-2xl font-bold">TWD {{ props.hotel.lowest_price }}</div>
                </div>
            </div>
            <div class="hidden sm:!flex items-center">
                <ul class="flex flex-col gap-1.5">
                    <template v-for=" tag in props.hotel.facility_tags">
                        <li class="mr-auto">
                            <q-icon
                                name="check"
                                class=" text-white bg-[#6DCD01] rounded-full p-0.5 font-black"
                            />
                            {{ tag.name }}
                        </li>
                    </template>
                </ul>
            </div>

            <!-- 立即下單 -->

        </div>
        <div class="mt-5 sm:mt-4 relative rounded-b-xl w-full bg-[#00586E] h-3 sm:h-4">
            <a
                href=""
                class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 "
            >
                <div class="text-xl font-medium  bg-[#00586E] text-white border-2 border-white rounded-3xl py-2">
                    立即下單
                </div>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";

interface Props {
    hotel?: {
        "hotel_id": number,
        "name": string,
        "county": string,
        "area": string,
        "intro": string,
        "original_price": number,
        "lowest_price": number,
        "image": string,
        "images": Array<string>,
        "small_images": Array<string>,
        "facility_tags": Array<{
            "name": string,
            "lang_key": string,
            "class": string,
        }>,

    };
}
const props = withDefaults(defineProps<Props>(), {
    hotel: () => (
        {
            "hotel_id": 122,
            "name": "雀客旅館台北站前",
            "county": "台北市",
            "area": "中正區",
            "intro": "雀客旅館台北站前位於台北市中心，絕佳的觀光中心點，將旅行的便利最大化。<br />\r\n推開旅館大門，映入眼簾的花磚地板是旅客們最佳打卡位置，房內設計更是我們對於細節的要求，全館採用木質地板讓房內更明亮整潔，豪華房型的陽台更是旅人透透氣的秘密基地。<br />\r\n景觀房的景色更是許多人的首選，大片落地窗，將城市街景盡收眼底，清楚看見台灣博物館的大圓屋頂、土銀展示館的年代建築，讓住宿體驗除了舒適之外，更添增了一抹文化氣息。<br />\r\n我們相信，最好的旅行過程是能讓你更加了解一座城市。位於台北重要地段的雀客旅館台北站前，能夠帶給你的體驗絕對超乎想像。",
            "original_price": 3600,
            "lowest_price": 1680,
            "images": [
                "https://ota-image.tourbobo.com/image/hotel/122N8yj5plEQXEp5OgwQ3LJ.jpeg?p=ota_hotel_large",
                "https://ota-image.tourbobo.com/image/hotel/122aNEXVXGgqqP7X0DdnxMf.jpeg?p=ota_hotel_large",
                "https://ota-image.tourbobo.com/image/hotel/1221wVEgPnWFe5RY9dryzas.jpeg?p=ota_hotel_large",
                "https://ota-image.tourbobo.com/image/hotel/122qFsvn5rOUOBiQpJv3Z6S.jpeg?p=ota_hotel_large",
                "https://ota-image.tourbobo.com/image/hotel/122nZ3Ng3XGimC5xfxV8k8F.jpg?p=ota_hotel_large"
            ],

            "small_images": [
                "https://ota-image.tourbobo.com/image/hotel/122N8yj5plEQXEp5OgwQ3LJ.jpeg?p=ota_hotel",
                "https://ota-image.tourbobo.com/image/hotel/122aNEXVXGgqqP7X0DdnxMf.jpeg?p=ota_hotel",
                "https://ota-image.tourbobo.com/image/hotel/1221wVEgPnWFe5RY9dryzas.jpeg?p=ota_hotel",
                "https://ota-image.tourbobo.com/image/hotel/122qFsvn5rOUOBiQpJv3Z6S.jpeg?p=ota_hotel",
                "https://ota-image.tourbobo.com/image/hotel/122nZ3Ng3XGimC5xfxV8k8F.jpg?p=ota_hotel"
            ],

            "image": "https://ota-image.tourbobo.com/image/hotel/122N8yj5plEQXEp5OgwQ3LJ.jpeg?p=ota_hotel",
            "facility_tags": [
                {
                    "name": "有陽台",
                    "lang_key": "facility.balcony",
                    "class": "icon-balcony"
                },
                {
                    "name": "可開窗",
                    "lang_key": "facility.window",
                    "class": "icon-window"
                },
                {
                    "name": "禁菸飯店",
                    "lang_key": "facility.non-smokinghotel",
                    "class": "icon-non-smokinghotel"
                }
            ],

        }
    ),
});
</script>

<style scoped>
</style>