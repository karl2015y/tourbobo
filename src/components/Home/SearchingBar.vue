<template>
    <div class="relative z-10 w-full sm:-translate-y-[5vw] 2xl:-translate-y-24">
        <div class="
            shadow-[0px_0px_8px_rgba(0,0,0,0.25)]
            relative 
            px-7 py-10 sm:py-6 sm:px-10
            bg-white sm:!bg-[#F9EDD5] mx-5 mt-3 sm:mx-auto sm:mt-0  rounded-2xl sm:w-[75vw] max-w-[1440px]">
            <!-- 城市選擇 -->
            <div
                ref="cityElement"
                class="sm:hover:shadow-md relative w-full  sm:h-14 sm:bg-white rounded-md  flex justify-start items-center"
                :class="{ 'z-10': cityElementIsHovered }"
                @click="cityElementIsHovered = true"
            >
                <div
                    class="text-base sm:text-lg font-normal flex justify-start items-center  w-full border-b border-[#BDB4A2] sm:border-gray-300 sm:border-b-0 pb-1 sm:pb-0">
                    <q-icon
                        class=" sm:ml-5 text-[#F4AA00] sm:text-black"
                        name="search"
                        size="sm"
                    />
                    <div class="ml-4">
                        {{ cityModel.city_name }}
                    </div>
                </div>


                <!-- 城市選擇 -->
                <Transition enter-active-class="animate__animated animate__fadeIn">
                    <template v-if="cityElementIsHovered">
                        <div class="[--animate-duration:300ms] w-[95%] lg:w-2/3 absolute sm:left-0 sm:top-12 top-4">
                            <div class="  mx-auto sm:mx-0  w-full ">
                                <q-scroll-area class="h-60 bg-white  p-6 mt-4 rounded-md  shadow-md border">

                                    <template v-for="city in OriginalCityOptions">
                                        <div
                                            @click="() => {
                                                cityModel = city;
                                                closeCityElement()
                                            }"
                                            class="my-0.5 w-full p-4 sm:hover:bg-[#F4AA00] sm:hover:text-white cursor-pointer rounded-lg "
                                            :class="{
                                                'border-2 border-[#F4AA00] font-bold shadow ': city.city_id == cityModel.city_id
                                            }"
                                        >
                                            <q-icon name="place" /> {{ city.city_name }}
                                        </div>

                                    </template>


                                </q-scroll-area>


                            </div>
                        </div>
                    </template>
                </Transition>

            </div>
            <div class="mt-4 flex flex-nowrap flex-col sm:flex-row">
                <!-- 日期選擇 -->
                <div
                    ref="dateRangeElement"
                    class="sm:hover:shadow-md w-full sm:w-1/2 sm:h-14 sm:bg-white rounded-md flex relative"
                    :class="{ 'z-10': dateRangeElementIsHovered }"
                    @click="dateRangeElementIsHovered = true"
                >
                    <div
                        class="text-base sm:text-lg font-normal w-full border-b border-[#BDB4A2] sm:border-gray-300 sm:border-r sm:border-b-0  sm:w-1/2 sm:pl-5 pb-1 sm:pb-0 flex justify-start items-center flex-nowrap  h-[75%] my-auto">
                        <q-icon
                            class="text-[#F4AA00] sm:text-black"
                            name="today"
                            size="sm"
                        />
                        <div
                            v-if="dateModel"
                            class="ml-4 "
                        >
                            <span class="hidden sm:!block">{{ dateModel?.from }}</span>
                            <div class="sm:hidden">
                                <div>{{ dateModel?.from }} - {{ dateModel?.to }}</div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="ml-4"
                        >
                            <span class="hidden sm:!block">選擇入住時間</span>
                            <span class="sm:hidden">選擇入住與退房時間</span>
                        </div>
                    </div>
                    <div
                        class="text-base sm:text-lg font-normal hidden w-1/2 pl-5 gap-4 sm:!flex justify-start items-center flex-nowrap">
                        <q-icon
                            name="event"
                            size="sm"
                        />
                        <div>
                            {{ dateModel ? dateModel.to : '選擇退房時間' }}
                        </div>

                    </div>
                    <Transition enter-active-class="animate__animated animate__fadeIn">
                        <template v-if="dateRangeElementIsHovered">

                            <div
                                class="[--animate-duration:300ms] w-[95%] mx-auto sm:mx-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.6)] 
                                        sm:absolute sm:left-0 sm:top-12 sm:translate-x-0 sm:translate-y-0 sm:shadow-none sm:pt-3 ">
                                <q-date
                                    today-btn
                                    subtitle="選擇入住與退房日期"
                                    class="w-full"
                                    :landscape="$q.screen.gt.sm"
                                    @range-end="closeDateRangeElement()"
                                    v-model="dateModel"
                                    range
                                />
                                <q-btn
                                    @click="closeDateRangeElement()"
                                    label="關閉"
                                    color="primary"
                                    class="sm:hidden -mt-0.5 w-full "
                                />


                            </div>

                        </template>

                    </Transition>



                </div>
                <!-- 房間選擇 -->
                <div
                    ref="roomElement"
                    class="mt-4 sm:mt-0 sm:ml-4 sm:hover:shadow-md relative w-full sm:w-1/2 sm:h-14 sm:bg-white rounded-md sm:pl-5 flex justify-start items-center"
                    :class="{ 'z-10': roomElementIsHovered }"
                    @click="roomElementIsHovered = true"
                >
                    <div
                        class="flex justify-start items-center  w-full border-b border-[#BDB4A2] sm:border-gray-300 sm:border-b-0 pb-1 sm:pb-0">
                        <q-icon
                            class=" sm:ml-5 text-[#F4AA00] sm:text-black"
                            name="perm_identity"
                            size="sm"
                        />
                        <div class="ml-4 text-base  font-normal">
                            <div class="">
                                <span class="sm:text-lg">{{ roomModel.aduitCount }} 位大人</span>
                                <span class="sm:text-lg" v-if="roomModel.childCount > 0">，{{ roomModel.childCount }} 位兒童</span>
                                <span
                                    class="sm:hidden"
                                    v-if="roomModel.roomCount > 0"
                                >，{{ roomModel.roomCount }} 間客房</span>
                            </div>
                            <div class="hidden sm:!block text-base text-[#506373]">
                                <span>{{ roomModel.roomCount }} 間客房</span>
                            </div>
                        </div>
                    </div>


                    <!-- 房間選擇 -->
                    <Transition enter-active-class="animate__animated animate__fadeIn">
                        <template v-if="roomElementIsHovered">
                            <div
                                class="[--animate-duration:300ms] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl 
                                        sm:absolute sm:left-0 sm:top-12 sm:translate-x-0 sm:translate-y-0 sm:shadow-none sm:pt-3 w-full ">
                                <div
                                    class="bg-white w-[95%] mx-auto sm:mx-0 border lg:w-2/3 rounded-md  px-6 py-8 shadow-md flex flex-col gap-6">
                                    <!-- 大人 -->
                                    <div class="flex justify-around items-center flex-nowrap">
                                        <q-btn
                                            @click="roomModel.aduitCount -= 1"
                                            size="lg"
                                            :class="roomModel.aduitCount <= 1 ? `text-gray-400` : `text-[#F6AC00]`"
                                            icon="remove_circle_outline"
                                            round
                                            flat
                                            :disabled="roomModel.aduitCount <= 1"
                                        />
                                        <div class="text-lg whitespace-nowrap"><span class="text-[#F6AC00]">{{
                                                roomModel.aduitCount
                                        }}</span> 位大人
                                        </div>
                                        <q-btn
                                            @click="roomModel.aduitCount += 1"
                                            size="lg"
                                            class="text-[#F6AC00]"
                                            icon="add_circle_outline"
                                            round
                                            flat
                                        />
                                    </div>
                                    <!-- 兒童 -->
                                    <div class="flex justify-around items-center flex-nowrap">
                                        <q-btn
                                            @click="roomModel.childCount -= 1"
                                            size="lg"
                                            :class="roomModel.childCount <= 0 ? `text-gray-400` : `text-[#F6AC00]`"
                                            icon="remove_circle_outline"
                                            round
                                            flat
                                            :disabled="roomModel.childCount <= 0"
                                        />
                                        <div class="text-lg whitespace-nowrap"><span class="text-[#F6AC00]">{{
                                                roomModel.childCount
                                        }}</span> 位兒童
                                        </div>
                                        <q-btn
                                            @click="roomModel.childCount += 1"
                                            size="lg"
                                            class="text-[#F6AC00]"
                                            icon="add_circle_outline"
                                            round
                                            flat
                                        />
                                    </div>
                                    <!--客房 -->
                                    <div class="flex justify-around items-center flex-nowrap">
                                        <q-btn
                                            @click="roomModel.roomCount -= 1"
                                            size="lg"
                                            :class="roomModel.roomCount <= 1 ? `text-gray-400` : `text-[#F6AC00]`"
                                            icon="remove_circle_outline"
                                            round
                                            flat
                                            :disabled="roomModel.roomCount <= 1"
                                        />
                                        <div class="text-lg whitespace-nowrap"><span class="text-[#F6AC00]">{{
                                                roomModel.roomCount
                                        }}</span> 間客房
                                        </div>
                                        <q-btn
                                            disabled
                                            @click="roomModel.roomCount += 1"
                                            size="lg"
                                            class="text-gray-400"
                                            icon="add_circle_outline"
                                            round
                                            flat
                                        />
                                    </div>

                                    <q-btn
                                        @click="closeRoomElement()"
                                        label="完成"
                                        color="primary"
                                        class="sm:hidden"
                                    />

                                </div>
                            </div>
                        </template>
                    </Transition>

                </div>
            </div>

            <!-- 搜尋案紐 -->

            <q-btn
                v-if="dateModel"
                @click="gotoLink(searchLink)"
                label="搜尋"
                color="primary"
                class="font-normal mt-5 tracking-[0.8em] sm:tracking-[0.4em] !bg-[#DB5F1D] sm:!bg-[#F6AC00] z-0 h-10 rounded-lg sm:h-14 text-lg sm:text-xl w-full sm:w-1/2 sm:absolute sm:left-1/2 -bottom-0 sm:-translate-x-1/2 sm:translate-y-3/4"
            />
            <q-btn
                v-else
                label="搜尋"
                color="primary"
                class="font-normal mt-5 tracking-[0.8em] sm:tracking-[0.4em] !bg-[#DB5F1D] sm:!bg-[#F6AC00] z-0 h-12 rounded-lg sm:h-14 text-lg sm:text-xl w-full sm:w-1/2 sm:absolute sm:left-1/2 -bottom-0 sm:-translate-x-1/2 sm:translate-y-3/4"
            />
        </div>
    </div>
</template>

<script setup lang="ts">

import { useElementHover } from '@vueuse/core';
import { cloneDeep } from 'lodash'
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useMainStore } from '../../stores/main.store';
const $q = useQuasar()
const cityElement = ref()
const cityElementIsHovered = useElementHover(cityElement)
const dateRangeElement = ref()
const dateRangeElementIsHovered = useElementHover(dateRangeElement)
const roomElement = ref()
const roomElementIsHovered = useElementHover(roomElement)


const cityModel = ref({
    city_id: 0,
    city_name: "全部縣市"
})
const OriginalCityOptions = ref<Array<{
    "city_id": number
    "city_name": string
}>>([])
const closeCityElement = () => {
    setTimeout(() => {
        cityElementIsHovered.value = false
    }, 100);
}

// 時間範圍
const dateModel = ref<{ from: string, to: string }>()
const closeDateRangeElement = () => {
    setTimeout(() => {
        dateRangeElementIsHovered.value = false
    }, 100);
}
// 房型參數
const roomModel = ref({
    aduitCount: 1,
    childCount: 0,
    roomCount: 1,
})
const closeRoomElement = () => {
    setTimeout(() => {
        roomElementIsHovered.value = false
    }, 100);
}
// 搜尋連結
const searchLink = computed(() => {
    return `https://www.tourbobo.com/hotels?check_in=${dateModel.value?.from.replaceAll('/', '-')}&check_out=${dateModel.value?.to.replaceAll('/', '-')}&city=${cityModel.value.city_id}&adults=${roomModel.value.aduitCount}&children=${roomModel.value.childCount}&sorting=recommend&business_type=1`
})
const gotoLink = (link: string) => {
    window.location.href = link
}


// 取得縣市資料
const getApiCities = () => {
    console.log('getApiCities');
    return new Promise<
        Array<{
            city_en_name: string
            city_id: number
            city_name: string
            image: string
        }>
    >((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept-Language", "zh_TW");
        fetch("https://ota-api.tourbobo.com/ota/new_cities", {
            method: 'GET',
            headers: myHeaders,
        })
            .then(response => response.text())
            .then(result => {
                resolve((JSON.parse(result) as any)['cities'])
            })
            .catch(error => reject(error));
    })
}

onMounted(async () => {
    const cities = await getApiCities()
    if (cities) {
        OriginalCityOptions.value = cities
    }
})

</script>

<style scoped>
</style>