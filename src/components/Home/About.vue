<template>
    <div
        id="about"
        class="max-w-[1460px] mx-auto mt-20 sm:flex relative z-10"
    >
        <div class="mx-8 sm:w-1/2 sm:ml-44 sm:mt-28">
            <div
                class="tracking-widest text-xl sm:text-3xl 2xl:text-4xl font-bold text-[#2B4162] text-center sm:text-left">
                <span>關於</span>
                <span class="hidden sm:!inline">tourbobo</span>
                <span class="sm:hidden">我們</span>
            </div>
            <div class="mt-5 text-xs sm:text-2xl  tracking-widest break-all 
            ">
                {{ props.aboutObj.content }}
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

interface Props {
    aboutObj: {
        content: string;
    }
}
const props = defineProps<Props>()



const mainStore = useMainStore()
mainStore.footer.styleType = '2'
mainStore.footer.zIndex = 0
</script>

<style scoped>
</style>