<template>
    <div class="min-w-[375px]">

        <user-header />
        <banner-swiper :bannerList="bannerList" />
        <searching-bar />
        <activity-swiper :activityList="activityList" />
        <cities :cities="cities" />
        <hotel-swiper :areaArray="areaArray" />
        <hotel-category :hotelCategories="hotelCategories" />
        <!-- <activity-image-info /> -->
        <about />
        <user-footer />


    </div>


</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import BannerSwiper from '@/components/Home/BannerSwiper.vue';
import SearchingBar from '@/components/Home/SearchingBar.vue';
import ActivitySwiper from '@/components/Home/ActivitySwiper.vue';
import Cities from '@/components/Home/Cities.vue';
import HotelSwiper from '../components/Home/HotelSwiper.vue';
import HotelCategory from '../components/Home/HotelCategory.vue';
import ActivityImageInfo from '../components/Home/ActivityImageInfo.vue';
import About from '../components/Home/About.vue';
import { setCssVar } from 'quasar';
import { ref } from 'vue';

setCssVar('primary', '#F6AC00')
setCssVar('secondary', '#00586E')

// BannerSwiper
const bannerList = ref([{
    image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhomeBanner%2Ftbb%20home%20banner%20(1).png?alt=media&token=c58efc29-f66b-4944-b8bc-6e5e6a617bfe',
    smallImage: '',
    link: '1',
}])

// activity-swiper 
const activityList = ref([
    {
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
        link: '/hotel-category?category=%E6%82%A0%E9%81%8A%E5%9C%8B%E6%97%85',
        name: '國旅專區：最高現折1300元'
    },
    {
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=487e6587-5a35-4426-b9ea-94536b03ec36',
        link: '',
        name: '國旅專區：最高現折1300元'

    },
    {
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner3_1.png?alt=media&token=6b90b0db-c48f-471b-beab-ad0b3b46d7cd',
        link: '/hotel-category?category=人氣民宿',
        name: '國旅專區：最高現折1300元'

    },
])
// Cities
const cities = ref([
    {
        available: true,
        city_id: 1,
        city_name: "台北",
        city_en_name: "taipei",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E5%8F%B0%E5%8C%97.jpg?alt=media&token=862a1c44-0bb4-4dd2-888c-185e71d9117f"
    },
    {
        available: true,
        city_id: 3,
        city_name: "新北",
        city_en_name: "new-taipei-city",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E6%96%B0%E5%8C%97.jpg?alt=media&token=d3eb4b48-c809-4457-a231-aafa68191e23"
    },
    {
        available: true,
        city_id: 5,
        city_name: "桃園",
        city_en_name: "taoyuan",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E6%A1%83%E5%9C%92.jpg?alt=media&token=f53c6a18-4a37-41d4-a1f3-21720d467513"
    },
    {
        available: true,
        city_id: 6,
        city_name: "新竹",
        city_en_name: "hsinchu",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E6%96%B0%E7%AB%B9.jpg?alt=media&token=cf9c42a5-453c-4220-9155-403efc71ffb3"
    },
    {
        available: true,
        city_id: 9,
        city_name: "台中",
        city_en_name: "taichung",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E5%8F%B0%E4%B8%AD.jpg?alt=media&token=0b1ddfb7-af9b-411b-8858-fdbbbe3cb5ac"
    },
    {
        available: true,
        city_id: 15,
        city_name: "台南",
        city_en_name: "tainan",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E5%8F%B0%E5%8D%97.jpg?alt=media&token=4625df90-9806-4453-b24b-b33b536f4721"
    },
    {
        available: true,
        city_id: 16,
        city_name: "高雄",
        city_en_name: "kaohsiung",
        image: "https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Fcityies%2F%E9%AB%98%E9%9B%84.jpg?alt=media&token=c6d5860a-30df-4d5d-abc7-15d21dd8f50b"
    }
])
// HotelSwiper
const areaArray = ref([
    {
        name: '北部',
        hotes_id: ['426', '353', '448', '562'],
    },
    {
        name: '中部',
        hotes_id: ['474', '583', '466', '468'],
    },
    {
        name: '南部',
        hotes_id: ['465', '536', '505', '538'],
    },
    {
        name: '東部',
        hotes_id: ['556', '479', '558', '488'],
    },

])
// HotelCategory
const hotelCategories = ref([
    {
        name: '悠遊國旅',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%9C%8B%E6%97%85.jpg?alt=media&token=81f13065-a52c-4726-9b85-b0d5ee718344',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%8B%E6%97%85.png?alt=media&token=3209ea29-f78a-4547-98d2-6158a3f8f918'
    },
    {
        name: '品牌連鎖',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%93%81%E7%89%8C%E9%80%A3%E9%8E%96.jpeg?alt=media&token=4384a19e-f40c-4bd3-8330-f98b387a7967',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E9%80%A3%E9%8E%96.png?alt=media&token=4b67f75d-207f-4ea8-aeb3-cbeb2ae13c58'
    },
    {
        name: '人氣民宿',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E4%BA%BA%E6%B0%A3.jpg?alt=media&token=0c18d4db-9e42-4948-af50-9fec9d41b023',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E4%BA%BA%E6%B0%A3%E6%B0%91%E5%AE%BF.png?alt=media&token=0874ade2-5fcb-4855-9e48-ee87d0f2cb1b'
    },
    {
        name: '寵物友善',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%AF%B5%E7%89%A9.png?alt=media&token=05d07107-2e40-4688-a26c-f2f578526a34'
    },
    {
        name: '熱銷首選',
        image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E7%86%B1%E9%8A%B7.jpg?alt=media&token=92c761d9-fd37-4b09-aa57-facef693eeef',
        hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E7%86%B1%E9%8A%B7.png?alt=media&token=da0de750-3e18-45c5-9734-5b3b114a8172'
    },

])
</script>

<style scoped>
</style>