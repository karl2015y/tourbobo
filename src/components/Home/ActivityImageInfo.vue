<template>
    <div class="w-full max-w-[1460px] mx-auto my-10 relative z-10">
        <div>
            <div
                class="
                 
            -translate-x-1.5
            sm:translate-x-0
            bg-white
                mx-auto
                rounded-full flex flex-row-reverse items-center px-3
                w-[353px] h-[245px]
                sm:w-[706px] sm:h-[490px]
                 border-4 border-[#F4AA00] shadow-[18px_10px_rgba(244,170,0,1)] sm:shadow-[1.8vw_1.1vw_rgba(244,170,0,1)]">
                <div class="w-[38%]">
                    <q-img
                        src="@/assets/gift-women.svg"
                        :ratio="270 / 241"
                    />
                </div>
                <div class="w-[60%] relative h-full flex flex-col ">
                    <img
                        class="absolute 
                        bottom-0  left-1/2 -translate-x-[5%]
                        sm:left-0 sm:top-[15%] sm:-translate-x-2/3 sm:w-[503px] sm:h-[125px]"
                        src="@/assets/letsgoorange.svg"
                    />
                    <div class="absolute top-1/3  pl-6
                    sm:left-1/2 sm:-translate-x-1/2  sm:h-[175px] sm:flex flex-col justify-between">
                        <div class="text-xl font-bold sm:text-4xl  text-[#2B4162]">登入即享專屬優惠</div>
                        <div
                            class="mt-2.5 text-xs sm:text-2xl font-normal whitespace-nowrap scale-[0.75] -translate-x-[13%] sm:scale-100 sm:translate-x-0">
                            登入tourbobo訂房即可領取專屬優惠</div>
                        <div class="mt-2.5 flex">
                            <q-router-link to="">
                                <div class="bg-[#2B4162] text-white 
                                sm:px-10 sm:py-2 
                                px-5 py-1
                                rounded-xl sm:text-lg font-normal">
                                    登入
                                </div>
                            </q-router-link>
                            <q-router-link to="">
                                <div class="ml-3 sm:ml-6 border border-[#2B4162] text-[#2B4162] bg-white 
                                    sm:px-10 sm:py-2 
                                    px-5 py-1
                                    rounded-xl sm:text-lg font-normal">
                                    註冊
                                </div>
                            </q-router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</template>

<script setup lang="ts">

</script>

<style scoped>
</style>