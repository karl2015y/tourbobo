<template>
    <div class="w-full relative z-10">
        <div
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
                :src="hotelFocusCategoryObj.smallImage"
                :ratio="375 / 196"
            />
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
                    @click="hotelFocusCategory = category.name"
                    class="text-2xl  text-center font-bold w-72 py-3"
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


const hotelCategoryArray = ref([
    { name: '悠遊國旅', image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%9C%8B%E6%97%85.jpg?alt=media&token=81f13065-a52c-4726-9b85-b0d5ee718344', smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%9C%8B%E6%97%85.jpg?alt=media&token=81f13065-a52c-4726-9b85-b0d5ee718344' },
    { name: '品牌連鎖', image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%93%81%E7%89%8C%E9%80%A3%E9%8E%96.jpeg?alt=media&token=4384a19e-f40c-4bd3-8330-f98b387a7967', smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%93%81%E7%89%8C%E9%80%A3%E9%8E%96.jpeg?alt=media&token=4384a19e-f40c-4bd3-8330-f98b387a7967' },
    { name: '人氣民宿', image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E4%BA%BA%E6%B0%A3.jpg?alt=media&token=0c18d4db-9e42-4948-af50-9fec9d41b023', smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E4%BA%BA%E6%B0%A3.jpg?alt=media&token=0c18d4db-9e42-4948-af50-9fec9d41b023' },
    { name: '寵物友善', image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e', smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e' },
    { name: '熱銷首選', image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E7%86%B1%E9%8A%B7.jpg?alt=media&token=92c761d9-fd37-4b09-aa57-facef693eeef', smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E7%86%B1%E9%8A%B7.jpg?alt=media&token=92c761d9-fd37-4b09-aa57-facef693eeef' },
])

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
    console.log('slideChange', _hotelFocusCategory, slideJustChange.value, hotelFocusCategory.value);

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
    console.log('onMounted', hotelFocusCategory.value as string);

    const index = findIndex(hotelCategoryArray.value, (o) => (o.name == hotelFocusCategory.value))
    clickHotelFocusCategoryTag('CategorySelectSwiper', index)
})

</script>

<style lang="scss" scoped>
:deep().swiper-slide-active {
    z-index: 10;
}
</style>