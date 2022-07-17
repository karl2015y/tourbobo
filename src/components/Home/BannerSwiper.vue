<template>
    <q-responsive :ratio="$q.screen.lt.sm ? 375 / 166 : 1920 / 585">
        <swiper
            class=" h-full w-full max-w-[1920px]"
            loop
        >
            <template v-for="item in bannerList">
                <swiper-slide>
                    <div class="h-full relative banner-swiper-container">
                        <!-- 電腦版 -->
                        <img
                            class="hidden sm:!block w-full h-full object-cover"
                            :src="item.image"
                        >
                        <!-- 手機版 -->
                        <img
                            class="sm:hidden  w-full h-full object-cover"
                            :src="item.smallImage"
                        >
                        <div class="absolute top-0 left-0 w-full h-full bg-[#00000070]"></div>
                        <a
                            :href="item.link"
                            class="absolute bottom-5 sm:bottom-1/3 left-1/2 -translate-x-1/2"
                        >
                            <div
                                class="flex justify-center items-center min-w-[85px] w-[10vw] max-w-[180px] sm:h-[3.645vw] max-h-[70px] sm:text-[1.4vw] 2xl:text-[27px] rounded-full border-2 border-white bg-[#00586E] text-white ">
                                查看更多
                            </div>
                        </a>
                    </div>


                </swiper-slide>
            </template>



        </swiper>
    </q-responsive>

</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ref } from 'vue';
import { min } from 'lodash';

const bannerList = ref([{
    image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
    smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
    link: '1'
},
{
    image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=487e6587-5a35-4426-b9ea-94536b03ec36',
    smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=487e6587-5a35-4426-b9ea-94536b03ec36',
    link: '2'
},
{
    image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner3_1.png?alt=media&token=6b90b0db-c48f-471b-beab-ad0b3b46d7cd',
    smallImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0714%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner3_1.png?alt=media&token=6b90b0db-c48f-471b-beab-ad0b3b46d7cd',
    link: '3'
}
])
</script>

<style scoped>
.banner-swiper-container {
    clip-path: ellipse(100% 100% at 50% 0%);
}
</style>