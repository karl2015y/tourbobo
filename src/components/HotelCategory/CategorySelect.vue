<template>
    <div class="w-full relative z-10">
        <div
            class="relative"
            ref="selectEl"
            v-if="hotelFocusCategoryObj"
        >
            <!-- 電腦版 -->
            <q-img
                class="hidden sm:!block"
                :src="hotelFocusCategoryObj.image"
                :ratio="1920 / 550"
            />
            <!-- 手機版 -->
            <q-img
                class="sm:hidden"
                :src="hotelFocusCategoryObj.smallImage ?? hotelFocusCategoryObj.image"
                :ratio="375 / 196"
            />

            <!-- 遮罩 -->
            <div class="absolute w-full h-full top-0 left-0 
            bg-gradient-to-b sm:bg-gradient-to-r from-[#000000c2] 
            text-white text-xl font-semibold sm:text-4xl
            px-6 pt-10 sm:px-44 sm:pt-32
            ">
                <div>{{ hotelFocusCategoryObj.title }}</div>
                <div class="mt-3">{{ hotelFocusCategoryObj.subTitle }}</div>
            </div>
        </div>

        <!-- 手機版 -->


        <swiper
            id="CategorySelectSwiper"
            loop
            navigation
            :modules="[Navigation]"
            :slides-per-view="3"
            class="sm:hidden w-full flex -mt-12 tracking-[0.19em] select-none"
            :speed="1000"
            @slide-change="slideJustChange = true"
        >
            <template v-for="(category, index) in hotelCategoryArray">
                <swiper-slide
                    v-slot="{ isActive }"
                    @click="clickHotelFocusCategoryTag('CategorySelectSwiper', index)"
                >
                    <div
                        v-if="isActive && slideChange(category.name)"
                        class=" text-center !h-16 flex flex-col justify-end"
                    >
                        <div class="relative">
                            <div
                                style="clip-path:polygon(5% 0, 94% 80%, 100% 100%, 0 100%, 0 0)"
                                class="bg-[#F6EAD4] rounded-t-lg rounded-r-lg absolute -top-[0.4rem] h-2 w-full"
                            > </div>
                            <div class="text-base font-black whitespace-nowrap bg-[#F6EAD4]  py-1 rounded-tr-md ">
                                {{ category.name }}
                            </div>
                        </div>
                    </div>


                    <div
                        v-else
                        class=" text-center  font-bold !h-16 flex flex-col justify-end text-xs"
                    >
                        <div class="bg-[#F4A900] py-1 pr-0.5 -ml-0.5 rounded-t-lg">

                            {{ category.name }}
                        </div>
                    </div>


                </swiper-slide>



            </template>
        </swiper>





        <!-- <ul class="sm:hidden w-full flex -translate-y-1/3 tracking-[0.19em] select-none">
            <template v-for="(category, index) in showHotelCategoryArray">
                <li
                    v-if="index == 0"
                    class="bg-[#F6EAD4] w-1/3 text-center relative animate__animated "
                    :class="{
                        'animate__slideInLeft': changeingCategoryAnimation
                    }"
                    style="
                    --animate-duration:0.3s
                    "
                >
                    <div
                        style="clip-path:polygon(5% 0, 97% 80%, 100% 100%, 0 100%, 0 0)"
                        class="bg-[#F6EAD4] rounded-t-lg rounded-r-lg absolute -top-7 h-6 w-full"
                    > </div>
                    <div class="bg-[#F6EAD4] h-2 w-full absolute -top-2 rounded-tr-md"></div>
                    <span class=" text-2xl font-black absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        {{ category.name }}
                    </span>
                </li>

                <li
                    v-else
                    @click="hotelFocusCategory = category.name"
                    class="bg-[#F4A900] w-1/3 text-center  pt-2 pb-1 font-bold"
                    :class="index == 1 ? 'rounded-tl-sm rounded-tr-lg' : 'rounded-t-lg'"
                >
                    <div
                        class="animate__animated"
                        :class="{
                            'animate__flipInX': changeingCategoryAnimation
                        }"
                    >

                        {{ category.name }}
                    </div>
                </li>
            </template>

        </ul> -->
        <!-- 電腦版 -->
        <ul class="hidden w-full sm:!flex justify-center tracking-[0.19em] select-none bg-[#F4A900]">
            <template v-for="(category) in hotelCategoryArray">


                <li
                    @click="clickQueryLink('category', category.name)"
                    class="cursor-pointer text-2xl  text-center font-bold w-72 py-3"
                    :class="{ 'bg-[#F6EAD4]': category.name == hotelFocusCategory }"
                >
                    <div class="animate__animated">

                        {{ category.name }}
                    </div>
                </li>
            </template>

        </ul>
    </div>
</template>

<script setup lang="ts">
import { refDebounced, useSwipe } from '@vueuse/core';
import { cloneDeep, findIndex } from 'lodash';
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Navigation, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
const route = useRoute()
const router = useRouter()
const clickQueryLink = (queryKey: string, queryValue: string) => {
    router.push({ ...route, query: { ...route.query, [queryKey]: queryValue } })
}

interface Props {
    hotelCategoryArray: Array<{
        image: string
        name: string
        smallImage?: string
        subTitle: string
        title: string
    }>
}
const props = defineProps<Props>()



const hotelCategoryArray = computed(() => props.hotelCategoryArray)
console.log(hotelCategoryArray.value);


const hotelFocusCategory = computed(() => route.query['category'] as string ?? hotelCategoryArray.value[0].name)

const hotelFocusCategoryIndex = computed(() => findIndex(hotelCategoryArray.value, (o) => (o.name == hotelFocusCategory.value)))
const hotelFocusCategoryObj = computed(() => hotelCategoryArray.value[hotelFocusCategoryIndex.value])
const slideJustChange = ref(true)
const selectEl = ref(null)
const selectElSwipe = useSwipe(selectEl)
watch(() => selectElSwipe.direction.value, (direction) => {
    switch (direction) {
        case 'LEFT':
            swiperNext('CategorySelectSwiper')
            break;
        case 'RIGHT':
            swiperPrev('CategorySelectSwiper')
            break;
        default:
            break;
    }

})

// watch(() => hotelFocusCategory.value, (hotelFocusCategory) => {
//     router.push({ ...route, query: { category: hotelFocusCategory } })
// })
watch(() => route.fullPath, (url) => {
    const index = findIndex(hotelCategoryArray.value, (o) => (o.name == hotelFocusCategory.value))
    clickHotelFocusCategoryTag('CategorySelectSwiper', index)
})



const swiperNext = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-next`) as HTMLElement)?.click()
}
const swiperPrev = (id: string) => {
    (document.querySelector(`#${id} .swiper-button-prev`) as HTMLElement)?.click()
}

const slideChange = (_hotelFocusCategory: string) => {
    if (slideJustChange.value) {
        clickQueryLink('category', _hotelFocusCategory)
        slideJustChange.value = false
    }
    return true
}

const clickHotelFocusCategoryTag = (id: string, index: number,) => {
    const swiperElement = document.querySelector(`#${id}`) as any
    if (swiperElement) {
        const swiper = swiperElement.swiper
        swiper.slideToLoop(index, 1000)
    }


}
onMounted(() => {
    const index = findIndex(hotelCategoryArray.value, (o) => (o.name == hotelFocusCategory.value))
    clickHotelFocusCategoryTag('CategorySelectSwiper', index)
})

</script>

<style lang="scss" scoped>
:deep().swiper-slide-active {
    z-index: 10;
}
</style>