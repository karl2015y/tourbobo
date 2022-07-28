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

            <div class="pt-8 sm:pt-16 px-6 sm:px-20   md:flex justify-between">

                <div class="md:w-1/4">
                    <div class="mb-3">
                        <span
                            class="bg-white md:!bg-inherit p-3 md:p-0 rounded-3xl text-xl md:text-[34px] font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-2xl md:font-light text-sm">{{
                            props.hotelSubCategoryData.description
                    }}
                    </div>
                    <div class="mt-3 text-[#FF5F00] md:text-[22px] md:font-light text-sm">{{
                            props.hotelSubCategoryData.discountDescription
                    }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area
                        class="h-14 md:h-16 w-full"
                        v-if="props.hotelSubCategoryData.hotel_tags && props.hotelSubCategoryData.hotel_tags.length > 0"
                    >
                        <div class="mt-3 flex flex-nowrap">
                            <template v-for="item in props.hotelSubCategoryData.hotel_tags">
                                <div
                                    @click="toggleFilterTag(item)"
                                    :class="{
                                        '!bg-[#00586E] text-white border-white shadow activeTag': item === filterTag
                                    }"
                                    class=" cursor-pointer
                                    text-base md:text-2xl mr-1.5 select-none whitespace-nowrap min:h-5 px-4  flex justify-center items-center rounded-3xl border 
                                    bg-white text-[#00586E] border-[#00586E]
                                     sm:hover:shadow-[2px_2px_rgba(0,88,110,1)]
                                    "
                                >
                                    {{ item }}
                                    <q-tooltip
                                        :delay="500"
                                        anchor="top middle"
                                        self="bottom middle"
                                        transition-show="flip-right"
                                        transition-hide="flip-left"
                                        :class="item === filterTag ? 'opacity-100' : 'opacity-0'"
                                    >再點一下可以關閉</q-tooltip>
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in hotelSubCategoryDataByFilter.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="mt-8"
                            />
                        </template>

                        <template v-if="hotelSubCategoryDataByFilter.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center mt-12"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in hotelSubCategoryDataByFilter.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="mt-8"
                                />
                            </template>


                        </template>

                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <q-btn
                            v-if="showPrevButton"
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="west"
                            @click="swiperPrev()"
                        />
                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="hotel in hotelSubCategoryDataByFilter">
                                <swiper-slide>
                                    <hotel-card
                                        class="my-4"
                                        :hotel="hotel"
                                    />
                                </swiper-slide>
                            </template>
                        </swiper>
                        <q-btn
                            v-if="showNextButton"
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
                            class="bg-[#F7EBD3] md:!bg-inherit p-3 md:p-0 rounded-3xl text-xl md:text-[34px] font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-2xl md:font-light text-sm">{{
                            props.hotelSubCategoryData.description
                    }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-[22px] md:font-light text-sm">{{
                            props.hotelSubCategoryData.discountDescription
                    }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area
                        class="h-14 md:h-16 w-full"
                        v-if="props.hotelSubCategoryData.hotel_tags && props.hotelSubCategoryData.hotel_tags.length > 0"
                    >
                        <div class="mt-3 flex flex-nowrap">
                            <template v-for="item in props.hotelSubCategoryData.hotel_tags">
                                <div
                                    @click="toggleFilterTag(item)"
                                    :class="{
                                        '!bg-[#00586E] text-white border-white shadow activeTag': item === filterTag
                                    }"
                                    class=" cursor-pointer
                                    text-base md:text-2xl mr-1.5 select-none whitespace-nowrap min:h-5 px-4  flex justify-center items-center rounded-3xl border 
                                    bg-white text-[#00586E] border-[#00586E]
                                     sm:hover:shadow-[2px_2px_rgba(0,88,110,1)]
                                    "
                                >
                                    {{ item }}
                                    <q-tooltip
                                        :delay="500"
                                        anchor="top middle"
                                        self="bottom middle"
                                        transition-show="flip-right"
                                        transition-hide="flip-left"
                                        :class="item === filterTag ? 'opacity-100' : 'opacity-0'"
                                    >再點一下可以關閉</q-tooltip>
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in hotelSubCategoryDataByFilter.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="mt-8"
                            />
                        </template>
                        <template v-if="hotelSubCategoryDataByFilter.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center mt-12"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in hotelSubCategoryDataByFilter.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="mt-8"
                                />
                            </template>


                        </template>
                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <q-btn
                            v-if="showPrevButton"
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="west"
                            @click="swiperPrev()"
                        />
                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="hotel in hotelSubCategoryDataByFilter">
                                <swiper-slide>
                                    <hotel-card
                                        class="my-4"
                                        :hotel="hotel"
                                    />
                                </swiper-slide>
                            </template>
                        </swiper>
                        <q-btn
                            v-if="showNextButton"
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
            :ratio="375 / 68"
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
        <div class="relative z-10 !bg-[#F7EBD3] w-full">
            <!-- 底圖 -->
            <div class="pt-8 sm:pt-16 px-6 sm:px-20  md:flex justify-between">
                <div class="md:w-1/4">
                    <div class="mb-3">
                        <span
                            class="bg-white md:!bg-inherit p-3 md:p-0 rounded-3xl text-xl md:text-[34px] font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-2xl md:font-light text-sm">{{
                            props.hotelSubCategoryData.description
                    }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-[22px] md:font-light text-sm">{{
                            props.hotelSubCategoryData.discountDescription
                    }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area
                        class="h-14 md:h-16 w-full"
                        v-if="props.hotelSubCategoryData.hotel_tags && props.hotelSubCategoryData.hotel_tags.length > 0"
                    >
                        <div class="mt-3 flex flex-nowrap">
                            <template v-for="item in props.hotelSubCategoryData.hotel_tags">
                                <div
                                    @click="toggleFilterTag(item)"
                                    :class="{
                                        '!bg-[#00586E] text-white border-white shadow activeTag': item === filterTag
                                    }"
                                    class=" cursor-pointer
                                    text-base md:text-2xl mr-1.5 select-none whitespace-nowrap min:h-5 px-4  flex justify-center items-center rounded-3xl border 
                                    bg-white text-[#00586E] border-[#00586E]
                                     sm:hover:shadow-[2px_2px_rgba(0,88,110,1)]
                                    "
                                >
                                    {{ item }}
                                    <q-tooltip
                                        :delay="500"
                                        anchor="top middle"
                                        self="bottom middle"
                                        transition-show="flip-right"
                                        transition-hide="flip-left"
                                        :class="item === filterTag ? 'opacity-100' : 'opacity-0'"
                                    >再點一下可以關閉</q-tooltip>
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in hotelSubCategoryDataByFilter.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="mt-8"
                            />
                        </template>
                        <template v-if="hotelSubCategoryDataByFilter.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center mt-12"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in hotelSubCategoryDataByFilter.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="mt-8"
                                />
                            </template>


                        </template>
                    </div>
                    <!-- 電腦版 -->
                    <div class="relative mt-3 hidden md:!block">

                        <q-btn
                            v-if="showPrevButton"
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="west"
                            @click="swiperPrev()"
                        />
                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="hotel in hotelSubCategoryDataByFilter">
                                <swiper-slide>
                                    <hotel-card
                                        class="my-4"
                                        :hotel="hotel"
                                    />
                                </swiper-slide>
                            </template>
                        </swiper>
                        <q-btn
                            v-if="showNextButton"
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
                            class="bg-[#F7EBD3] md:!bg-inherit p-3 md:p-0 rounded-3xl text-xl md:text-[34px] font-bold"
                        >
                            {{ props.hotelSubCategoryData.name }}
                        </span>
                    </div>
                    <div class="mt-7 md:text-[#727171] md:text-2xl md:font-light text-sm">{{
                            props.hotelSubCategoryData.description
                    }}</div>
                    <div class="mt-3 text-[#FF5F00] md:text-[22px] md:font-light text-sm">{{
                            props.hotelSubCategoryData.discountDescription
                    }}
                    </div>
                </div>
                <div class="md:w-2/3">
                    <q-scroll-area
                        class="h-14 md:h-16 w-full"
                        v-if="props.hotelSubCategoryData.hotel_tags && props.hotelSubCategoryData.hotel_tags.length > 0"
                    >
                        <div class="mt-3 flex flex-nowrap">
                            <template v-for="item in props.hotelSubCategoryData.hotel_tags">
                                <div
                                    @click="toggleFilterTag(item)"
                                    :class="{
                                        '!bg-[#00586E] text-white border-white shadow activeTag': item === filterTag
                                    }"
                                    class=" cursor-pointer
                                    text-base md:text-2xl mr-1.5 select-none whitespace-nowrap min:h-5 px-4  flex justify-center items-center rounded-3xl border 
                                    bg-white text-[#00586E] border-[#00586E]
                                     sm:hover:shadow-[2px_2px_rgba(0,88,110,1)]
                                    "
                                >
                                    {{ item }}
                                    <q-tooltip
                                        :delay="500"
                                        anchor="top middle"
                                        self="bottom middle"
                                        transition-show="flip-right"
                                        transition-hide="flip-left"
                                        :class="item === filterTag ? 'opacity-100' : 'opacity-0'"
                                    >再點一下可以關閉</q-tooltip>
                                </div>
                            </template>
                        </div>
                    </q-scroll-area>

                    <!-- 手機版 -->
                    <div class="-mt-5  md:hidden">
                        <template v-for="hotel in hotelSubCategoryDataByFilter.slice(0, 4)">
                            <hotel-card
                                :hotel="hotel"
                                class="mt-8"
                            />
                        </template>
                        <template v-if="hotelSubCategoryDataByFilter.length > 4">
                            <div
                                v-if="!showMoreHotel"
                                class="w-full text-center mt-12"
                                @click="showMoreHotel = true"
                            >
                                <button
                                    class="text-lg shadow-[4px_4px_0px_0px_rgba(0,88,110,1)]  bg-white rounded px-2 py-1 border-2 border-[#00586E]"
                                >查看更多</button>
                            </div>
                            <template v-for="hotel in hotelSubCategoryDataByFilter.slice(4)">
                                <hotel-card
                                    v-show="showMoreHotel"
                                    :hotel="hotel"
                                    class="mt-8"
                                />
                            </template>


                        </template>
                    </div>
                    <!-- 電腦版 -->

                    <div class="relative mt-3 hidden md:!block">

                        <q-btn
                            v-if="showPrevButton"
                            class="hover:bg-[#DB5F1D] hover:border-0 hover:text-white hidden sm:!flex absolute -left-14 top-1/2 -translate-y-1/2 border-solid border-2 border-gray-400 text-gray-400"
                            flat
                            round
                            icon="west"
                            @click="swiperPrev()"
                        />
                        <swiper
                            ref="hotelSwiperElement"
                            navigation
                            :modules="[Navigation]"
                            :space-between="38"
                            :slides-per-view="$q.screen.gt.md ? 3 : $q.screen.gt.sm ? 2 : 1"
                        >
                            <template v-for="hotel in hotelSubCategoryDataByFilter">
                                <swiper-slide>
                                    <hotel-card
                                        class="my-4"
                                        :hotel="hotel"
                                    />
                                </swiper-slide>
                            </template>
                        </swiper>
                        <q-btn
                            v-if="showNextButton"
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
    <template v-if="props.isLast">

        <q-responsive
            :ratio="1920 / 110"
            class="hidden md:!block"
            :class="{ 'bg-[#F7EBD3]': props.styleType == '5' }"
        >
        </q-responsive>
        <q-responsive
            :ratio="375 / 110"
            class=" md:hidden"
            :class="{ 'bg-[#F7EBD3]': props.styleType == '5' }"
        >
        </q-responsive>
    </template>

</template>

<script setup lang="ts">
import HotelCard from '@/components/HotelCard.vue';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { computed, onMounted, ref } from 'vue';
import { filter } from 'lodash';

interface Props {
    styleType?: string;
    hotelSubCategoryData: {
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
            tags?: Array<string>,

        }>,
        hotel_tags?: Array<string>

    }
    isLast?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    styleType: '1',
    isLast: false
});

const hotelSwiperElement = ref()
const showNextButton = ref(true)
const showPrevButton = ref(false)

const checkNextPrevButtonVisable = () => {
    if (hotelSwiperElement.value && hotelSwiperElement.value.$el) {
        if ((hotelSwiperElement.value.$el.querySelector(`.swiper-button-next.swiper-button-disabled`))) {
            showNextButton.value = false
        } else {
            showNextButton.value = true
        }
        if ((hotelSwiperElement.value.$el.querySelector(`.swiper-button-prev.swiper-button-disabled`))) {
            showPrevButton.value = false
        } else {
            showPrevButton.value = true
        }
    }

}
const swiperNext = () => {
    (hotelSwiperElement.value.$el.querySelector(`.swiper-button-next`) as HTMLElement)?.click()
    checkNextPrevButtonVisable()
}
const swiperPrev = () => {
    (hotelSwiperElement.value.$el.querySelector(`.swiper-button-prev`) as HTMLElement)?.click()
    checkNextPrevButtonVisable()
}

const showMoreHotel = ref(false)

const filterTag = ref('')
const toggleFilterTag = (tag: string) => {
    if (filterTag.value == tag) {
        filterTag.value = ''
    } else {
        filterTag.value = tag
    }
}
const hotelSubCategoryDataByFilter = computed(() => {
    setTimeout(() => {
        checkNextPrevButtonVisable()
    }, 10);
    if (filterTag.value.length == 0) {
        return props.hotelSubCategoryData.hotels
    } else {
        return props.hotelSubCategoryData.hotels.filter(hotel => hotel.tags && hotel.tags.indexOf(filterTag.value) > -1)
    }
})

onMounted(checkNextPrevButtonVisable)



</script>

<style scoped>
</style>