<template>
    <!-- type1 -->
    <template v-if="props.styleType == '1'">
        <div class="relative z-10 bg-[#F7EBD3]  w-full sm:-top-[1px]">

            <img
                class="sm:hidden absolute top-8 right-0 h-[165px] w-[70px] -z-10"
                src="@/assets/hotelCategory/icon-bg-right-phone.svg"
            />
            <img
                class="sm:hidden absolute bottom-0 left-0 h-[165px] w-[70px] -z-10"
                src="@/assets/hotelCategory/icon-bg-left-phone.svg"
            />
            <img
                class="hidden sm:!block absolute top-36  left-0 h-[161px] w-[215px] -z-10"
                src="@/assets/hotelCategory/icon-bg-left.svg"
            />
            <img
                class="hidden sm:!block absolute top-72  right-0 h-[384px] w-[394px] -z-10"
                src="@/assets/hotelCategory/icon-bg-right.svg"
            />

            <div class="mt-8 sm:mt-16 px-6 sm:px-20   md:flex justify-between">

                <div class="md:w-1/4">
                    <div class="mb-3">
                        <span
                            class="bg-white md:!bg-inherit pt-3 pb-2 px-3 md:p-0 rounded-3xl text-xl md:text-[34px] font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-lg text-xs">{{ props.hotelSubCategoryData.description }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-base">{{ props.hotelSubCategoryData.discountDescription }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area class="h-12 md:h-14 w-full">
                        <div class="mt-3 flex  flex-nowrap">
                            <template v-for="item in 4">
                                <div
                                    class="text-sm mr-4 select-none whitespace-nowrap min:h-6 px-4 py-0.5 md:text-lg bg-white flex justify-center items-center rounded-3xl border text-[#00586E] border-[#00586E]">
                                    新上架
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="my-8"
                            />
                        </template>

                        <template v-if="props.hotelSubCategoryData.hotels.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="my-8"
                                />
                            </template>


                        </template>

                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            loop
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="item in 6">
                                <swiper-slide>
                                    <hotel-card class="my-4" />
                                </swiper-slide>


                            </template>


                        </swiper>
                        <q-btn
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="east"
                            @click="swiperNext()"
                        />

                    </div>
                </div>
            </div>

        </div>
        <q-responsive
            :ratio="402 / 55"
            class="sm:hidden w-full"
        >
            <q-img
                :ratio="402 / 55"
                src="@/assets/hotelCategory/Background1-phone.png"
            />
        </q-responsive>
        <q-responsive
            :ratio="1920 / 220"
            class="hidden sm:!block w-full sm:-top-[0.2rem] md:-top-[0.5rem] bg-white"
        >
            <q-img
                class="bg-white"
                :ratio="1920 / 220"
                src="@/assets/hotelCategory/Background1.png"
            />
        </q-responsive>
    </template>



    <!-- type2 -->
    <template v-if="props.styleType == '2'">
        <div class="relative z-10  sm:bg-inherit w-full">

            <img
                class="sm:hidden absolute top-20  right-0 h-[211px] w-[134px]"
                src="@/assets/hotelCategory/icon-type2-right-phone.svg"
            />
            <img
                class="hidden sm:!block absolute top-0 left-1/2 -translate-x-1/2 h-[668px] w-[1835px]"
                src="@/assets/hotelCategory/icon-type2-bg.svg"
            />


            <div class="relative z-10 px-6 sm:px-20  w-[full] md:flex justify-between">
                <div class="md:w-1/4">
                    <div class="mb-3">
                        <span
                            class="bg-[#F7EBD3] md:!bg-inherit pt-3 pb-2 px-3 md:p-0 rounded-3xl text-xl md:text-4xl font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-lg">{{ props.hotelSubCategoryData.description }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-base">{{ props.hotelSubCategoryData.discountDescription }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area class="h-12 md:h-14 w-full">
                        <div class="mt-3 flex gap-3 flex-nowrap">
                            <template v-for="item in 4">
                                <div
                                    class="select-none whitespace-nowrap min:h-6 px-4 py-0.5 md:text-lg bg-white flex justify-center items-center rounded-3xl border text-[#00586E] border-[#00586E]">
                                    新上架
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="my-8"
                            />
                        </template>
                        <template v-if="props.hotelSubCategoryData.hotels.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="my-8"
                                />
                            </template>


                        </template>
                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            loop
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="item in 6">
                                <swiper-slide>
                                    <hotel-card class="my-4" />
                                </swiper-slide>


                            </template>


                        </swiper>
                        <q-btn
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="east"
                            @click="swiperNext()"
                        />

                    </div>
                </div>
            </div>

        </div>

    </template>

    <!-- type3 -->
    <template v-if="props.styleType == '3' || props.styleType == '5'">
        <q-responsive
            :ratio="390 / 53"
            class=" sm:hidden w-full"
        >
            <img src="@/assets/hotelCategory/Background3-phone-top.png" />
        </q-responsive>
        <q-responsive
            :ratio="1921 / 133"
            class=" hidden sm:!block w-full"
        >
            <img src="@/assets/hotelCategory/Background3-top.png" />
        </q-responsive>
        <div class="relative z-10 bg-[#F7EBD3] w-full">
            <!-- 底圖 -->
            <div class="mt-8 sm:mt-16 px-6 sm:px-20  md:flex justify-between">
                <div class="md:w-1/4">
                    <div class="mb-3">
                        <span
                            class="bg-white md:!bg-inherit pt-3 pb-2 px-3 md:p-0 rounded-3xl text-xl md:text-4xl font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-lg">{{ props.hotelSubCategoryData.description }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-base">{{ props.hotelSubCategoryData.discountDescription }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area class="h-12 md:h-14 w-full">
                        <div class="mt-3 flex gap-3 flex-nowrap">
                            <template v-for="item in 4">
                                <div
                                    class="select-none whitespace-nowrap min:h-6 px-4 py-0.5 md:text-lg bg-white flex justify-center items-center rounded-3xl border text-[#00586E] border-[#00586E]">
                                    新上架
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="my-8"
                            />
                        </template>
                        <template v-if="props.hotelSubCategoryData.hotels.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="my-8"
                                />
                            </template>


                        </template>
                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            loop
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="item in 6">
                                <swiper-slide>
                                    <hotel-card class="my-4" />
                                </swiper-slide>


                            </template>


                        </swiper>
                        <q-btn
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="east"
                            @click="swiperNext()"
                        />

                    </div>
                </div>
            </div>

        </div>
        <template v-if="props.styleType == '3'">
            <q-responsive
                :ratio="402 / 55"
                class="sm:hidden w-full"
            >

                <img src="@/assets/hotelCategory/Background3-phone-bottom.png" />
            </q-responsive>
            <q-responsive
                :ratio="1921 / 133"
                class=" hidden sm:!block w-full"
            >
                <img src="@/assets/hotelCategory/Background3-bottom.png" />
            </q-responsive>

        </template>


    </template>

    <!-- type4 -->
    <template v-if="props.styleType == '4'">
        <div class="relative z-10 w-full">




            <img
                class="sm:hidden absolute top-20  right-0 h-[211px] w-[134px]"
                src="@/assets/hotelCategory/icon-type2-right-phone.svg"
            />

            <div class="relative mt-10 px-6 sm:px-20  w-[full]  md:flex justify-between">
                <div class="md:w-1/4">
                    <div class="mb-3">
                        <span
                            class="bg-[#F7EBD3] md:!bg-inherit pt-3 pb-2 px-3 md:p-0 rounded-3xl text-xl md:text-4xl font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-lg">{{ props.hotelSubCategoryData.description }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-base">{{ props.hotelSubCategoryData.discountDescription }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area class="h-12 md:h-14 w-full">
                        <div class="mt-3 flex gap-3 flex-nowrap">
                            <template v-for="item in 4">
                                <div
                                    class="select-none whitespace-nowrap min:h-6 px-4 py-0.5 md:text-lg bg-white flex justify-center items-center rounded-3xl border text-[#00586E] border-[#00586E]">
                                    新上架
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="my-8"
                            />
                        </template>
                        <template v-if="props.hotelSubCategoryData.hotels.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in props.hotelSubCategoryData.hotels.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="my-8"
                                />
                            </template>


                        </template>
                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            loop
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="item in 6">
                                <swiper-slide>
                                    <hotel-card class="my-4" />
                                </swiper-slide>


                            </template>


                        </swiper>
                        <q-btn
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -right-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="east"
                            @click="swiperNext()"
                        />

                    </div>
                </div>
            </div>
            <!-- 
            <img
            class="sm:hidden absolute bottom-0 left-0 h-[165px] w-[70px]"
            src="@/assets/hotelCategory/icon-bg-left-phone.svg"
        /> -->
        </div>

    </template>
    <q-responsive
        v-if="props.isLast"
        :ratio="1920 / 55"
        :class="{ 'bg-[#F7EBD3]': props.styleType == '5' }"
    >
    </q-responsive>

</template>

<script setup lang="ts">
import HotelCard from '@/components/HotelCard.vue';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ref } from 'vue';

interface Props {
    styleType?: string;
    hotelSubCategoryData?: {
        name: string,
        description: string,
        discountDescription: string,
        hotels: Array<{
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

        }>

    }
    isLast?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    styleType: '1',
    hotelSubCategoryData: () => ({
        name: '精選飯店｜台北',
        description: '全數皆符合【14天前免費取消】政策，三千元內無痛入住飯店！',
        discountDescription: '結帳輸入TBBVIP，即可享...',
        hotels: [
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

            },
            {
                "hotel_id": 122,
                "name": "雀客旅館!!!!!",
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

            },
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

            },
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

            },
            {
                "hotel_id": 122,
                "name": "第五間",
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

            },
            {
                "hotel_id": 122,
                "name": "第六間",
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

            },
        ]
    }),
    isLast: false
});

const hotelSwiperElement = ref()
const swiperNext = () => {
    (hotelSwiperElement.value.$el.querySelector(`.swiper-button-next`) as HTMLElement)?.click()
}

const showMoreHotel = ref(false)



</script>

<style scoped>
</style>