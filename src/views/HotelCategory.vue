<template>
    <user-header />

    <category-list :hotelCategoryData="hotelCategoryData" />
    <user-footer />

</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import CategoryList from '@/components/HotelCategory/CategoryList.vue';
import { ref } from 'vue';


const hotelCategoryData = ref([
    {
        name: '悠遊國旅',
        title: '悠遊國旅開心FUN暑假',
        subTitle: '全台灣最划算的國旅補助飯店底家啦！',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%9C%8B%E6%97%85.jpg?alt=media&token=81f13065-a52c-4726-9b85-b0d5ee718344',
        smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%9C%8B%E6%97%85.jpg?alt=media&token=81f13065-a52c-4726-9b85-b0d5ee718344',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%8B%E6%97%85.png?alt=media&token=3209ea29-f78a-4547-98d2-6158a3f8f918',
        subCategoryData: [
            {
                order: '1',
                name: '摩登城市',
                description: '喜歡都市的繁華嗎？我們提供你最摩登的選擇，如果你是標準都市人，入住這些準沒錯。',
                discountDescription: '優惠100分啦',
                hotels: [
                    {
                        hotel_id: '160',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '533',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '507',
                        tags: ['特色3', '特色4']
                    },
                    {
                        hotel_id: '426',
                        tags: ['特色4', '特色5']
                    },
                    {
                        hotel_id: '94',
                        tags: ['特色5', '特色6']
                    },
                    {
                        hotel_id: '545',
                        tags: ['特色6', '特色7']
                    },
                    {
                        hotel_id: '344',
                        tags: ['特色7', '特色8']
                    },
                    {
                        hotel_id: '520',
                        tags: ['特色8', '特色9']
                    },
                    {
                        hotel_id: '540',
                        tags: ['特色9', '特色10']
                    },
                    {
                        hotel_id: '512',
                        tags: ['特色10', '特色11']
                    },
                    {
                        hotel_id: '567',
                        tags: ['特色11', '特色12']
                    },
                    {
                        hotel_id: '485',
                        tags: ['特色12', '特色13']
                    },
                ]
            },
            {
                order: '2',
                name: '文藝氣息',
                description: '文青少年少女的最愛，假日想逛市集又想住漂亮的旅館嗎？這些旅館絕對能滿足你的文青魂。',
                discountDescription: '優惠99分啦',
                hotels: [
                    {
                        hotel_id: '294',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '295',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '18',
                        tags: ['特色3', '特色4']
                    },
                    {
                        hotel_id: '573',
                        tags: ['特色4', '特色5']
                    },
                ]
            },
            {
                order: '3',
                name: '度假風情',
                description: '出國不了很鬱卒嗎？台灣本島也是可以好好渡假的！提供比出國更享受的體驗。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '65',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '536',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '552',
                        tags: ['特色3', '特色4']
                    },
                    {
                        hotel_id: '183',
                        tags: ['特色4', '特色2']
                    },
                ]
            },
            {
                order: '4',
                name: '創意風格',
                description: '這些跳耀的顏色與吸睛的風格旅館絕對是身為創意人的你不可錯過的入住選擇！',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '342',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '546',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '543',
                        tags: ['特色3', '特色4']
                    },

                ]
            },
            {
                order: '5',
                name: '部落風情',
                description: '一起來體驗看看原民風的生活吧！娜路彎系列絕對是你的好選擇，喜歡原民文化的你千萬別錯過。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '479',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '478',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '476',
                        tags: ['特色3', '特色4']
                    },
                    {
                        hotel_id: '477',
                        tags: ['特色4', '特色2']
                    },
                    {
                        hotel_id: '475',
                        tags: ['特色5', '特色6']
                    },
                ]
            },

        ]
    },
    {
        name: '品牌連鎖',
        title: '高品質飯店品牌大集合',
        subTitle: '連鎖品牌掛保證，讓你住得安心又快樂',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%93%81%E7%89%8C%E9%80%A3%E9%8E%96.jpeg?alt=media&token=4384a19e-f40c-4bd3-8330-f98b387a7967',
        smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%93%81%E7%89%8C%E9%80%A3%E9%8E%96.jpeg?alt=media&token=4384a19e-f40c-4bd3-8330-f98b387a7967',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E9%80%A3%E9%8E%96.png?alt=media&token=4b67f75d-207f-4ea8-aeb3-cbeb2ae13c58',
        subCategoryData: [
            {
                order: '1',
                name: '雀客系列',
                description: '用溫柔與品味迎接每一位遠道而來的旅客蒞臨，雀客系列是你最好的旅行夥伴。',
                discountDescription: '優惠100分啦',
                hotels: [
                    {
                        hotel_id: '342',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '160',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '295',
                        tags: ['特色3', '特色4']
                    },

                ]
            },
            {
                order: '2',
                name: '娜路彎系列',
                description: '最讓人身歷其境的原民風格，體驗最真實的原民文化，如果你也喜歡原住民帶來的溫暖，一定要來體驗看看。',
                discountDescription: '優惠99分啦',
                hotels: [
                    {
                        hotel_id: '479',
                        tags: []
                    },
                    {
                        hotel_id: '478',
                        tags: []
                    },
                    {
                        hotel_id: '476',
                        tags: []
                    },
                    {
                        hotel_id: '477',
                        tags: []
                    },
                    {
                        hotel_id: '475',
                        tags: []
                    },
                ]
            },
            {
                order: '3',
                name: '奇異果系列',
                description: '最年輕、舒活的清新風格，打造出全新優質的平價旅館體驗！跳脫傳統旅店的框架，給你最有活力的享受。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '183',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '466',
                        tags: []
                    },
                    {
                        hotel_id: '468',
                        tags: ['特色3', '特色4']
                    },
                    {
                        hotel_id: '500',
                        tags: []
                    },
                ]
            },
            {
                order: '4',
                name: '鐵花系列',
                description: '以「旅人驛站」為題，象徵面對長途的旅程，這裡就是你途中的驛站，隨時準備好讓你擁有舒適的休息體驗。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '498',
                        tags: ['特色1', '特色2']
                    },
                    {
                        hotel_id: '492',
                        tags: ['特色2', '特色3']
                    },
                    {
                        hotel_id: '497',
                        tags: ['特色3', '特色4']
                    },
                    {
                        hotel_id: '491',
                        tags: ['特色4', '特色2']
                    },
                    {
                        hotel_id: '490',
                        tags: []
                    },
                ]
            },
            {
                order: '5',
                name: '美系列',
                description: '「美」是一種生活，也是一種態度，你的旅途之美由你自己決定。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '344',
                        tags: []
                    },
                    {
                        hotel_id: '324',
                        tags: []
                    },
                    {
                        hotel_id: '521',
                        tags: []
                    },
                    {
                        hotel_id: '522',
                        tags: []
                    },
                    {
                        hotel_id: '530',
                        tags: []
                    },
                    {
                        hotel_id: '535',
                        tags: []
                    },
                    {
                        hotel_id: '582',
                        tags: []
                    },
                ]
            },

        ]
    },
    {
        name: '人氣民宿',
        title: '最高人氣民宿大推薦',
        subTitle: ' 出門在外誰說就不能住的像家裡一樣舒適？',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E4%BA%BA%E6%B0%A3.jpg?alt=media&token=0c18d4db-9e42-4948-af50-9fec9d41b023',
        smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E4%BA%BA%E6%B0%A3.jpg?alt=media&token=0c18d4db-9e42-4948-af50-9fec9d41b023',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E4%BA%BA%E6%B0%A3%E6%B0%91%E5%AE%BF.png?alt=media&token=0874ade2-5fcb-4855-9e48-ee87d0f2cb1b',
        subCategoryData: [
            {
                order: '1',
                name: '包棟',
                description: '朋友出遊好難找飯店？別擔心，這裡有超適合你們的包棟民宿，再多人，也不怕。',
                discountDescription: '優惠100分啦',
                hotels: [
                    {
                        hotel_id: '240',
                        tags: []
                    },
                    {
                        hotel_id: '580',
                        tags: []
                    },
                    {
                        hotel_id: '569',
                        tags: []
                    },
                    {
                        hotel_id: '424',
                        tags: []
                    },
                ]
            },
            {
                order: '2',
                name: '北部',
                description: '北部旅遊超人氣的推薦民宿，漫遊台北住這些，品味提升在無意間。',
                discountDescription: '優惠99分啦',
                hotels: [
                    {
                        hotel_id: '572',
                        tags: []
                    },
                    {
                        hotel_id: '488',
                        tags: []
                    },
                    {
                        hotel_id: '570',
                        tags: []
                    },
                    {
                        hotel_id: '571',
                        tags: []
                    },
                ]
            },
            {
                order: '3',
                name: '南部',
                description: '南部的熱情澆熄不了我們旅遊的心，這些民宿比天氣更熱，讓你體驗全方位的南部味。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '552',
                        tags: []
                    },
                    {
                        hotel_id: '239',
                        tags: []
                    },
                    {
                        hotel_id: '463',
                        tags: []
                    },
                ]
            },
            {
                order: '4',
                name: '東部',
                description: '好山好水好空氣，來到怡人的東部天堂旅遊必住這些。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '548',
                        tags: []
                    },
                    {
                        hotel_id: '498',
                        tags: []
                    },
                    {
                        hotel_id: '549',
                        tags: []
                    },
                    {
                        hotel_id: '424',
                        tags: []
                    },
                ]
            },


        ]
    },
    {
        name: '寵物友善',
        title: '你家毛小孩的最愛旅宿',
        subTitle: '就是愛帶毛小孩環遊全台趴趴走',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e',
        smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%AF%B5%E7%89%A9.png?alt=media&token=05d07107-2e40-4688-a26c-f2f578526a34', subCategoryData: [

            {
                order: '1',
                name: '北部',
                description: '好想帶毛小孩一起北上出去玩嗎？快來看這些北部旅遊的寵物天堂吧！',
                discountDescription: '優惠99分啦',
                hotels: [
                    {
                        hotel_id: '545',
                        tags: []
                    },
                    {
                        hotel_id: '553',
                        tags: []
                    },
                    {
                        hotel_id: '487',
                        tags: []
                    },
                    {
                        hotel_id: '563',
                        tags: []
                    },
                ]
            },
            {
                order: '2',
                name: '南部',
                description: '我要跟我的毛寶貝一起去南部曬太陽！這些南部旅館提供你絕無僅有的寵物旅遊超讚體驗。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '546',
                        tags: []
                    },
                    {
                        hotel_id: '465',
                        tags: []
                    },
                    {
                        hotel_id: '183',
                        tags: []
                    },
                ]
            },
            {
                order: '3',
                name: '東部',
                description: '東部毛孩好去處，快來去東部與毛孩快樂住一晚。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '549',
                        tags: []
                    },
                    {
                        hotel_id: '548',
                        tags: []
                    },
                    {
                        hotel_id: '439',
                        tags: []
                    },
                ]
            },


        ]
    },
    {
        name: '熱銷首選',
        title: '高CP值的搶手飯店',
        subTitle: '要訂要快，再猶豫一秒就被搶走啦',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E7%86%B1%E9%8A%B7.jpg?alt=media&token=92c761d9-fd37-4b09-aa57-facef693eeef',
        smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E7%86%B1%E9%8A%B7.jpg?alt=media&token=92c761d9-fd37-4b09-aa57-facef693eeef',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E7%86%B1%E9%8A%B7.png?alt=media&token=da0de750-3e18-45c5-9734-5b3b114a8172',
        subCategoryData: [

            {
                order: '1',
                name: '星級奢華專區',
                description: '星級享受在這裡！假日就該好好來一場星級飯店的快樂。',
                discountDescription: '優惠99分啦',
                hotels: [
                    {
                        hotel_id: '557',
                        tags: []
                    },
                    {
                        hotel_id: '465',
                        tags: []
                    },
                    {
                        hotel_id: '558',
                        tags: []
                    },

                ]
            },
            {
                order: '2',
                name: '熱銷首選專區',
                description: 'tourbobo最熱銷的旅館在這裡，高CP值、高質感享受，不知道住哪裡就從這裡選。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '555',
                        tags: []
                    },
                    {
                        hotel_id: '489',
                        tags: []
                    },
                    {
                        hotel_id: '564',
                        tags: []
                    },
                ]
            },
            {
                order: '3',
                name: '快樂小資專區',
                description: '小資族福星tourbobo摘給你，我們要快樂出遊，荷包也開心。',
                discountDescription: '',
                hotels: [
                    {
                        hotel_id: '525',
                        tags: []
                    },
                    {
                        hotel_id: '524',
                        tags: []
                    },
                    {
                        hotel_id: '448',
                        tags: []
                    },
                    {
                        hotel_id: '539',
                        tags: []
                    },
                ]
            },


        ]
    },

])

</script>

<style scoped>
</style>