<template>
    <div class=" w-full h-[45vw] min-w-[375px] min-h-[168px] sm:h-[30.468vw] max-h-[585px]">
        <swiper
            class=" h-full w-full max-w-[1920px]"
            loop
        >
            <template v-for="item in 3">
                <swiper-slide>
                    <div class="h-full relative banner-swiper-container">
                        <img
                            class="w-full h-full"
                            src="https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/home%2Fbanner%2FE4KCCTlYXtccGcFNScSjC.png?alt=media&token=d0552d1c-d186-419d-8d3e-96846dfc8bb5"
                            alt=""
                        >
                        <div class="absolute top-0 left-0 w-full h-full bg-[#00000070]"></div>
                        <button
                            class="sm:w-[10vw] max-w-[180px] sm:h-[3.645vw] max-h-[70px] sm:text-[1.4vw] 2xl:text-[27px]   rounded-full border-2 border-white bg-[#00586E] text-white absolute bottom-5 sm:bottom-1/3 left-1/2 -translate-x-1/2"
                        >
                            查看更多
                        </button>
                    </div>


                </swiper-slide>
            </template>



        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
</script>

<style scoped>
.banner-swiper-container {
    clip-path: ellipse(100% 100% at 50% 0%);
}
</style>