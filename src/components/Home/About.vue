<template>
    <div
        id="about"
        class="max-w-[1920px] mx-auto mt-20 sm:flex relative z-10"
    >
        <div class="mx-8 sm:w-1/2 sm:ml-44 sm:mt-28">
            <div class="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#2B4162] text-center sm:text-left">
                <span>關於</span>
                <span class="hidden sm:!inline">tourbobo</span>
                <span class="sm:hidden">我們</span>
            </div>
            <div class="mt-5 sm:text-xl  tracking-widest break-all 
            ">
                tourbobo於防疫期間，致力於提供消費者最優質且最快速的居家檢疫防疫旅館選擇，在全台灣各地精挑細選各縣市防疫旅館，並且透過系統整合了預訂及付款功能，讓您能即時查詢空房，下訂防疫旅館及付款保留。另透過住客的回饋及數據的搜集，提供給消費者最好的選擇。
            </div>
        </div>
        <div class="mt-3 sm:w-1/2 sm:mt-0 sm:mr-24">

            <q-img
                class=" w-full"
                :ratio="789 / 625"
                ra
                src="@/assets/about.svg"
            />

        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../../stores/main.store';

const mainStore = useMainStore()
mainStore.footer.styleType='2'
mainStore.footer.zIndex=0
</script>

<style scoped>
</style>