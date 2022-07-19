<template>


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
import CategoryItem from '@/components/HotelCategory/CategoryItem.vue';
import { computedAsync } from '@vueuse/core';
import { find, sortBy, values } from 'lodash';
import { useQuasar } from 'quasar';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '../../stores/main.store';

const route = useRoute()
const mainStore = useMainStore()
const hotelCategoryData = ref([
    {
        name: '悠遊國旅',
        subCategoryData: [
            {
                order: '1',
                name: '摩登城市',
                description: '喜歡都市的繁華嗎？我們提供你最摩登的選擇，如果你是標準都市人，入住這些準沒錯。',
                discountDescription: '優惠100分啦',
                hotel_ids: ['160', '533', '507', '426', '94', '545', '344', '520', '540', '512', '567', '485']
            },
            {
                order: '2',
                name: '文藝氣息',
                description: '文青少年少女的最愛，假日想逛市集又想住漂亮的旅館嗎？這些旅館絕對能滿足你的文青魂。',
                discountDescription: '優惠99分啦',
                hotel_ids: ['294', '295', '18', '573']
            },
            {
                order: '3',
                name: '度假風情',
                description: '出國不了很鬱卒嗎？台灣本島也是可以好好渡假的！提供比出國更享受的體驗。',
                discountDescription: '',
                hotel_ids: ['65', '536', '552', '183']
            },
            {
                order: '4',
                name: '創意風格',
                description: '這些跳耀的顏色與吸睛的風格旅館絕對是身為創意人的你不可錯過的入住選擇！',
                discountDescription: '',
                hotel_ids: ['342', '546', '543']
            },
            {
                order: '5',
                name: '部落風情',
                description: '一起來體驗看看原民風的生活吧！娜路彎系列絕對是你的好選擇，喜歡原民文化的你千萬別錯過。',
                discountDescription: '',
                hotel_ids: ['479', '478', '476', '477', '475']
            },

        ]
    },
    {
        name: '品牌連鎖',
        subCategoryData: [
            {
                order: '1',
                name: '雀客系列',
                description: '用溫柔與品味迎接每一位遠道而來的旅客蒞臨，雀客系列是你最好的旅行夥伴。',
                discountDescription: '優惠100分啦',
                hotel_ids: ['342', '160', '295']
            },
            {
                order: '2',
                name: '娜路彎系列',
                description: '最讓人身歷其境的原民風格，體驗最真實的原民文化，如果你也喜歡原住民帶來的溫暖，一定要來體驗看看。',
                discountDescription: '優惠99分啦',
                hotel_ids: ['479', '478', '476', '477', '475']
            },
            {
                order: '3',
                name: '奇異果系列',
                description: '最年輕、舒活的清新風格，打造出全新優質的平價旅館體驗！跳脫傳統旅店的框架，給你最有活力的享受。',
                discountDescription: '',
                hotel_ids: ['183', '466', '468', '500']
            },
            {
                order: '4',
                name: '鐵花系列',
                description: '以「旅人驛站」為題，象徵面對長途的旅程，這裡就是你途中的驛站，隨時準備好讓你擁有舒適的休息體驗。',
                discountDescription: '',
                hotel_ids: ['498', '492', '497', '491', '490']
            },
            {
                order: '5',
                name: '美系列',
                description: '「美」是一種生活，也是一種態度，你的旅途之美由你自己決定。',
                discountDescription: '',
                hotel_ids: ['344', '324', '521', '522', '530', '535', '582']
            },

        ]
    },
    {
        name: '人氣民宿',
        subCategoryData: [
            {
                order: '1',
                name: '包棟',
                description: '朋友出遊好難找飯店？別擔心，這裡有超適合你們的包棟民宿，再多人，也不怕。',
                discountDescription: '優惠100分啦',
                hotel_ids: ['240', '527', '580', '569', '424']
            },
            {
                order: '2',
                name: '北部',
                description: '北部旅遊超人氣的推薦民宿，漫遊台北住這些，品味提升在無意間。',
                discountDescription: '優惠99分啦',
                hotel_ids: ['572', '488', '570', '571']
            },
            {
                order: '3',
                name: '南部',
                description: '南部的熱情澆熄不了我們旅遊的心，這些民宿比天氣更熱，讓你體驗全方位的南部味。',
                discountDescription: '',
                hotel_ids: ['552', '239', '463']
            },
            {
                order: '4',
                name: '東部',
                description: '好山好水好空氣，來到怡人的東部天堂旅遊必住這些。',
                discountDescription: '',
                hotel_ids: ['548', '498', '549', '424']
            },


        ]
    },
    {
        name: '寵物友善',
        subCategoryData: [

            {
                order: '1',
                name: '北部',
                description: '好想帶毛小孩一起北上出去玩嗎？快來看這些北部旅遊的寵物天堂吧！',
                discountDescription: '優惠99分啦',
                hotel_ids: ['545', '553', '487', '563']
            },
            {
                order: '2',
                name: '南部',
                description: '我要跟我的毛寶貝一起去南部曬太陽！這些南部旅館提供你絕無僅有的寵物旅遊超讚體驗。',
                discountDescription: '',
                hotel_ids: ['546', '465', '183']
            },
            {
                order: '3',
                name: '東部',
                description: '東部毛孩好去處，快來去東部與毛孩快樂住一晚。',
                discountDescription: '',
                hotel_ids: ['549', '548', '439']
            },


        ]
    },
    {
        name: '熱銷首選',
        subCategoryData: [

            {
                order: '1',
                name: '星級奢華專區',
                description: '星級享受在這裡！假日就該好好來一場星級飯店的快樂。',
                discountDescription: '優惠99分啦',
                hotel_ids: ['557', '465', '558']
            },
            {
                order: '2',
                name: '熱銷首選專區',
                description: 'tourbobo最熱銷的旅館在這裡，高CP值、高質感享受，不知道住哪裡就從這裡選。',
                discountDescription: '',
                hotel_ids: ['555', '489', '564']
            },
            {
                order: '3',
                name: '快樂小資專區',
                description: '小資族福星tourbobo摘給你，我們要快樂出遊，荷包也開心。',
                discountDescription: '',
                hotel_ids: ['525', '524', '448', '539']
            },


        ]
    },

])
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
    loading.value = true
    currentHotelDetailList.value = {}
    currentHotelList.value?.subCategoryData.forEach(async item => {
        const myHeaders = new Headers();
        myHeaders.append("Accept-Language", "zh_TW");
        const response = await fetch(hotelsLink(item.hotel_ids as Array<string>), {
            method: 'GET',
            headers: myHeaders,
        });
        const result = await response.text()
        currentHotelDetailList.value[item.order] = {
            name: item.name,
            description: item.description,
            discountDescription: item.discountDescription,
            hotels: (JSON.parse(result) as any)['data']
        }
        loading.value = false
    });
    // const array = currentHotelList.value?.subCategoryData ?? []
    // for (let index = 0; index < array.length; index++) {
    //     const item = array[index];


    // }
}


onMounted(() => {
    getCurrentHotelDetail()
})

watch(() => route.fullPath, () => {
    getCurrentHotelDetail()

})


watch(() => loading.value, () => {
    if (loading.value === false && currentHotelDetailList.value.length > 0) {
        mainStore.footer.styleType = (currentHotelDetailList.value.length + 1) % 2 == 1 ? '1' : '3'
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