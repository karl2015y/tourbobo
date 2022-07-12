<template>
    <div class="relative z-10 w-full sm:-translate-y-[9vw] 2xl:-translate-y-36">
        <div
            class="relative pt-10 pb-14 px-12 bg-white sm:!bg-[#F9EDD5] mx-5 mt-3 sm:mx-auto sm:mt-0  rounded-2xl sm:w-[75vw] max-w-[1440px] shadow-2xl"
            style="box-shadow: 2px 2px 8px rgba(45, 55, 64, 0.25);"
        >
            <!-- 城市選擇 -->
            <q-select
                @filter="cityFilterFn"
                color="black"
                :bg-color="$q.screen.gt.xs ? `white` : ''"
                :filled="$q.screen.gt.xs"
                v-model="cityModel"
                use-input
                input-debounce="0"
                :options="cityOptions"
                option-value="city_id"
                option-label="city_name"
                class="w-full rounded-lg text-lg sm:text-base"
                :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
            >
                <template v-slot:prepend>
                    <q-icon
                        class="ml-5 text-[#F4AA00] sm:text-black"
                        name="search"
                        @click.stop.prevent
                    />
                </template>
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                            無資料
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
            <div class="mt-4 flex gap-4 flex-nowrap flex-col sm:flex-row">
                <!-- 日期選擇 -->
                <div
                    ref="dateRangeElement"
                    class="sm:hover:shadow-md w-full sm:w-1/2 h-16 sm:bg-white rounded-md flex relative"
                    :class="{ 'z-10': dateRangeElementIsHovered }"
                    @click="dateRangeElementIsHovered = true"
                >
                    <div
                        class="w-full border-b border-[#BDB4A2] sm:border-gray-300 sm:border-r sm:border-b-0  sm:w-1/2 pl-5 gap-4 flex justify-start items-center flex-nowrap  h-[75%] my-auto">
                        <q-icon
                            class="text-[#F4AA00] sm:text-black"
                            name="today"
                            size="sm"
                        />
                        <div
                            v-if="dateModel"
                            class="sm:text-base"
                        >
                            <span class="hidden sm:!block">{{ dateModel?.from }}</span>
                            <div class="sm:hidden">
                                <div>{{ dateModel?.from }} - {{ dateModel?.to }}</div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="text-gray-500"
                        >
                            <span class="hidden sm:!block">選擇入住時間</span>
                            <span class="sm:hidden">選擇入住與退房時間</span>
                        </div>
                    </div>
                    <div class="hidden w-1/2 pl-5 gap-4 sm:!flex justify-start items-center flex-nowrap">
                        <q-icon
                            name="event"
                            size="sm"
                        />
                        <div
                            v-if="dateModel"
                            class="text-base"
                        >
                            {{ dateModel?.to }}
                        </div>
                        <div
                            v-else
                            class="text-gray-500"
                        >
                            選擇退房時間
                        </div>
                    </div>
                    <Transition
                        enter-active-class="animate__animated animate__fadeIn animate__faster"
                        leave-active-class="animate__animated animate__fadeOut animate__faster"
                    >
                        <template v-if="dateRangeElementIsHovered">
                            <div
                                class=" w-[95%] mx-auto sm:mx-0   fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl 
                                        sm:absolute sm:left-0 sm:top-16 sm:translate-x-0 sm:translate-y-0 sm:shadow-none sm:pt-3 ">
                                <q-date
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
                    class="sm:hover:shadow-md relative w-full sm:w-1/2 h-16 sm:bg-white rounded-md sm:pl-5 flex justify-start items-center"
                    :class="{ 'z-10': roomElementIsHovered }"
                    @click="roomElementIsHovered = true"
                >
                    <div
                        class="flex gap-4 justify-start items-center  w-full border-b border-[#BDB4A2] sm:border-gray-300 sm:border-b-0 pb-3 sm:pb-0">
                        <q-icon
                            class="ml-5 sm:ml-5 text-[#F4AA00] sm:text-black"
                            name="perm_identity"
                            size="sm"
                        />
                        <div>
                            <div class="text-base">
                                <span>{{ roomModel.aduitCount }} 位大人</span>
                                <span v-if="roomModel.childCount > 0">，{{ roomModel.childCount }} 位兒童</span>
                                <span
                                    class="sm:hidden"
                                    v-if="roomModel.roomCount > 0"
                                >，{{ roomModel.roomCount }} 間客房</span>
                            </div>
                            <div class="hidden sm:!block text-sm text-gray-400">
                                <span>{{ roomModel.roomCount }} 間客房</span>
                            </div>
                        </div>
                    </div>


                    <!-- 房間選擇 -->
                    <Transition
                        enter-active-class="animate__animated animate__fadeIn animate__faster"
                        leave-active-class="animate__animated animate__fadeOut animate__faster"
                    >
                        <template v-if="roomElementIsHovered">
                            <div
                                class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl 
                                        sm:absolute sm:left-0 sm:top-16 sm:translate-x-0 sm:translate-y-0 sm:shadow-none sm:pt-3 w-full ">
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
                @click="gotoLink(searchLink)"
                :disabled="!dateModel"
                label="搜尋"
                color="primary"
                class="!bg-[#DB5F1D] sm:!bg-[#F6AC00] z-0 h-12 rounded-lg sm:h-10 w-full sm:w-1/2 sm:absolute left-1/2 -bottom-0 -translate-x-1/2 translate-y-1/2"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { cloneDeep } from 'lodash'
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
const $q = useQuasar()
const dateRangeElement = ref()
const dateRangeElementIsHovered = useElementHover(dateRangeElement)
const roomElement = ref()
const roomElementIsHovered = useElementHover(roomElement)


const cityModel = ref({
    city_id: 0,
    city_name: "全部縣市"
})
const OriginalCityOptions = [
    {
        "city_id": 0,
        "city_name": "全部縣市",
    },
    {
        "city_id": 1,
        "city_name": "台北市",
    },
    {
        "city_id": 2,
        "city_name": "新北市",
    },
    {
        "city_id": 3,
        "city_name": "台中市",
    },
    {
        "city_id": 4,
        "city_name": "高雄市",
    }
]
const cityOptions = ref(cloneDeep(OriginalCityOptions))
const cityFilterFn = (val: string, update: Function) => {
    if (val === '') {
        update(() => {
            cityOptions.value = cloneDeep(OriginalCityOptions)
        })
        return
    }
    update(() => {
        const needle = val.replaceAll('臺', '台')
        cityOptions.value = OriginalCityOptions.filter(v => ((v.city_name.replaceAll('臺', '台')).indexOf(needle) > -1))

    })
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
    return `https://www.tourbobo.com/hotels?check_in=${dateModel.value?.from.replaceAll('/','-')}&check_out=${dateModel.value?.to.replaceAll('/','-')}&city=${cityModel.value.city_id}&adults=${roomModel.value.aduitCount}&children=${roomModel.value.childCount}&sorting=recommend&business_type=1`
})
const gotoLink = (link: string) => {
    window.location.href = link
}
</script>

<style scoped>
</style>