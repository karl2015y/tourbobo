<template>
    <category-select :hotelCategoryArray="hotelCategoryData" />


    <q-responsive
        v-if="loading"
        :ratio="1920 / 500"
        class="w-full "
    >
        <div class="flex justify-center items-center font-bold text-4xl">
            載入中...

        </div>
    </q-responsive>
    <template v-else-if="showHotelDetailList && showHotelDetailList.length > 0">

        <template v-for="item, index in showHotelDetailList">
            <category-item
                :styleType="`${getStyleType(index, showHotelDetailList.length)}`"
                :isLast="index == showHotelDetailList.length - 1"
                :hotelSubCategoryData="item"
            />
        </template>

    </template>




    <q-responsive
        v-else
        :ratio="1920 / 500"
        class="w-full "
    >
        <div class="flex justify-center items-center font-bold text-4xl">
            無資料

        </div>
    </q-responsive>
    <!-- {{ currentHotelDetailList }} -->

    <!-- <div v-else>
            loading...
        </div> -->

    <!-- <category-item styleType="2" />
    <category-item styleType="3" />
    <category-item styleType="4" />

    <category-item styleType="3" />
    <category-item styleType="4" />

    <category-item
        styleType="5"
        isLast
    /> -->

</template>

<script setup lang="ts">
import CategorySelect from '@/components/HotelCategory/CategorySelect.vue';

import CategoryItem from '@/components/HotelCategory/CategoryItem.vue';
import { computedAsync } from '@vueuse/core';
import { find, findIndex, keyBy, keys, map, merge, pick, omit, uniq, values } from 'lodash';
import { useQuasar } from 'quasar';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '../../stores/main.store';
import { HotelCategoryType } from '../../types/hotel.type';



interface Props {
    hotelCategoryData: HotelCategoryType[];
}
const props = defineProps<Props>();

const route = useRoute()
const mainStore = useMainStore()
const hotelCategoryData = computed(() => props.hotelCategoryData)
const currentHotelCategory = computed(() => route.query['category'] ?? hotelCategoryData.value[0].name)
const addDays = function (date: Date, days: number) {
    return new Date(new Date().setDate(date.getDate() + days));
}
const hotelsLink = (hotel_ids: Array<string>) => {
    const todayDate = new Date()
    const after30day = addDays(todayDate, 30);
    const after31day = addDays(todayDate, 31);
    const after30dayString = after30day.toISOString().split('T')[0]
    const after31dayString = after31day.toISOString().split('T')[0]
    let baseUrl = `https://ota-api.tourbobo.com/ota/hotels?per_page=${hotel_ids?.length}&adults=1&children=0&check_in=${after30dayString}&check_out=${after31dayString}&business_type=1`
    hotel_ids.forEach(hotel_id => {
        baseUrl += `&hotel_id[]=${hotel_id}`
    })
    return baseUrl
}
const loading = ref(false)
const currentHotelList = computed(() => find(hotelCategoryData.value, ['name', currentHotelCategory.value]))
const currentHotelDetailList = ref<{ [key: string]: any }>({})
const showHotelDetailList = computed(() => values(currentHotelDetailList.value))
const getCurrentHotelDetail = () => {
    console.log('getCurrentHotelDetail', hotelCategoryData.value);

    loading.value = true
    currentHotelDetailList.value = {}
    currentHotelList.value?.subCategoryData.forEach(async item => {
        const myHeaders = new Headers();
        myHeaders.append("Accept-Language", "zh_TW");
        const hotel_ids = map(item.hotels, (o) => o.hotel_id)
        const hotel_tags: string[] = []
        item.hotels.forEach(item => {
            hotel_tags.push(...item.tags)
        })
        const response = await fetch(hotelsLink(hotel_ids as Array<string>), {
            method: 'GET',
            headers: myHeaders,
        });
        const result = await response.text()

        const serverHotelDetail = keyBy((JSON.parse(result) as any)['data'], 'hotel_id')
        const keyOfServerHotelDetails = keys(serverHotelDetail)
        const localHotelDetail = pick(keyBy(item.hotels, 'hotel_id'), keyOfServerHotelDetails)
        const hotels = values(merge(serverHotelDetail, localHotelDetail)).sort((a, b) => findIndex(item.hotels, ['hotel_id', a.hotel_id]) - findIndex(item.hotels, ['hotel_id', b.hotel_id]))
        currentHotelDetailList.value[item.order] = {
            name: item.name,
            description: item.description,
            discountDescription: item.discountDescription,
            hotels: hotels,
            hotel_tags: uniq(hotel_tags)
        }
        loading.value = false
    });
    // const array = currentHotelList.value?.subCategoryData ?? []
    // for (let index = 0; index < array.length; index++) {
    //     const item = array[index];


    // }
}

watchEffect(()=>{
    if(hotelCategoryData.value){
    getCurrentHotelDetail()

    }
})


watch(() => route.fullPath, () => {
    getCurrentHotelDetail()
})


watchEffect(() => {
    if (loading.value === false && showHotelDetailList.value.length > 0) {
        mainStore.footer.styleType = (showHotelDetailList.value.length + 1) % 2 == 1 ? '1' : '3'
        mainStore.footer.zIndex = 10
    } else {
        mainStore.footer.styleType = '2'
        mainStore.footer.zIndex = 10

    }
})



const getStyleType = (index: number, length: number) => {
    let number = index + 1
    if (number <= 2 || number == 4) return number;
    if (number == 3 && number == length) return 5
    if (number < (length)) return number % 2 == 1 ? 3 : 4
    if (number == length) return number % 2 == 1 ? 5 : 4

}
// const loading = computed(() => currentHotelDetailList.value == null)

// const loading = computedAsync(
//     async () => {
//         return await new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(currentHotelDetailList.value == [])
//             }, 100);
//         })
//     },
//     null, // initial state
// )



</script>

<style scoped>
</style>