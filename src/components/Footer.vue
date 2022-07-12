<template>

    <div
        ref="footer"
        :style="`height:${footerDomSize.height.value}px`"
    ></div>
    <div
        ref="footerDom"
        class="fixed left-0 w-screen min-w-[375px]"
        :class="{
            'bg-white': (props.styleType == '1') || (props.styleType == '2'),
            'bg-[#F7EBD3]': (props.styleType == '3'),
        
        }"
        :style="footerIsNeedFixedBottom ? `bottom:0` : `top:${footerBounding.top.value}px`"
    >
        <!-- 底圖 -->
        <img
            class="hidden sm:!block w-full h-auto max-h-[825px]"
            src="@/assets/footer-bg.svg"
            alt=""
        >
        <img
            class="sm:hidden w-full h-auto "
            src="@/assets/footer-bg-phone.svg"
            alt=""
        >


        <!-- 2球 -->
        <template v-if="props.styleType == '1'">
            <img
                src="@/assets/footer-bg-2balls.png"
                class="absolute  w-[32.3vw] min-w-[123px] max-w-[619px] -top-[25%] sm:-top-[15%] -left-[8%]  -z-10"
            />
        </template>
        <!-- 4球 -->
        <template v-if="props.styleType == '2'">
            <img
                src="@/assets/footer-bg-4balls.svg"
                class=" absolute left-0 w-[32.3vw] min-w-[123px] max-w-[619px] -top-[25%] sm:-top-[50%] -z-10"
            />
        </template>

        <!-- 2白球 -->
        <template v-if="props.styleType == '3'">
            <img
                src="@/assets/footer-bg-2balls-white.png"
                class="absolute  w-[32.3vw] min-w-[123px] max-w-[619px] -top-[25%] sm:-top-[15%] -left-[8%]  -z-10"
            />
        </template>
        <!-- 右邊4球 -->
        <img
            src="@/assets/footer-bg-right-4balls.svg"
            class="absolute right-[1.5%] w-[13.33vw] min-w-[50px] sm:w-[10vw] max-w-[180px] -top-[20%] sm:-top-[15%] -z-10"
        />

        <div class="absolute top-[20%] sm:top-[28%] md:top-1/3  left-1/2 -translate-x-1/2 ml-[3%]">
            <!-- logo -->
            <div>
                <a href="">
                    <img
                        class="mx-auto w-[30.4vw] min-w-[114px] sm:w-[16.77vw] max-w-[322px]"
                        src="@/assets/logo-letter.png"
                        alt=""
                    >

                </a>
            </div>
            <!-- 連結區 -->
            <div
                class=" w-[65.6vw] min-w-[246px] sm:w-[70vw] md:w-[57.3vw] max-w-[960px] sm:ml-[5%] lg:mt-[5%] flex flex-col flex-nowrap items-center sm:flex-row sm:items-start sm:justify-around ">
                <!-- 關於我們 -->
                <ul
                    class="order-1 mt-4 flex flex-nowrap text-xs whitespace-nowrap text-white sm:flex-col sm:text-base sm:mt-8">
                    <li class="sm:pb-2 sm:border-[#DB5F1D] sm:border-b-2">關於我們</li>
                    <li class="pl-2 ml-2 border-l-2 border-[#DC492A] sm:ml-0 sm:border-0 sm:pl-0 sm:mt-3">合作夥伴</li>
                    <li class="pl-2 ml-2 border-l-2 border-[#DC492A] sm:ml-0 sm:border-0 sm:pl-0 sm:mt-3">服務與退訂條款</li>
                    <li class="pl-2 ml-2 border-l-2 border-[#DC492A] sm:ml-0 sm:border-0 sm:pl-0 sm:mt-3">隱私權政策</li>
                </ul>
                <!-- 客戶服務 -->
                <ul
                    class="order-3 sm:order-2 pl-1 text-white whitespace-nowrap mt-7 border-t-2 border-[#DC492A] sm:border-0  w-44 text-xs sm:mt-8  sm:text-base sm:w-56">
                    <li class="hidden sm:!block sm:pb-2 sm:border-[#DB5F1D] sm:border-b-2">客戶服務</li>
                    <li class="mt-4 sm:mt-3">客服時間:9:00-24:00(UTC+8)</li>
                    <li class="mt-4 sm:mt-3">電話:+886-4-2452-2370</li>
                    <li class="mt-4 sm:mt-3">信箱:service@tourbobo.com</li>
                </ul>
                <!-- 多媒體區 -->
                <ul class="order-2 sm:order-3 sm:self-end">
                    <li>
                        <ul class="mt-4 flex gap-6 justify-center flex-nowrap">
                            <li>
                                <a href="fb">
                                    <img
                                        class="w-6 h-6 sm:w-9 sm:h-9"
                                        src="@/assets/icon-facebook-white.svg"
                                    >
                                </a>
                            </li>
                            <li>
                                <a href="line">
                                    <img
                                        class="w-6 h-6 sm:w-9 sm:h-9"
                                        src="@/assets/icon-line-white.svg"
                                    >
                                </a>
                            </li>
                            <li>
                                <a href="ig">

                                    <img
                                        class="w-6 h-6 sm:w-9 sm:h-9"
                                        src="@/assets/icon-instagram-white.svg"
                                    >

                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class=" mt-4 flex gap-1 justify-center flex-nowrap">
                            <li>
                                <a href="appstore">
                                    <img
                                        class="w-14 h-5 sm:w-24 sm:h-8"
                                        src="@/assets/icon-appstore-white.svg"
                                    >

                                </a>
                            </li>
                            <li>
                                <a href="googleplay">
                                    <img
                                        class="w-14 h-5 sm:w-24 sm:h-8"
                                        src="@/assets/icon-googleplay-white.svg"
                                    >

                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- Copyright -->
            <div
                class=" mt-8 sm:mt-[8%] text-xs font-light text-white scale-50 sm:scale-100 sm:text-lg text-center whitespace-nowrap">
                Copyright 2021 tourbobo Co., Ltd. All Rights Reserved.
            </div>
        </div>
    </div>

    <q-layout class="!min-h-[0]">

        <q-page-sticky
            position="bottom-right"
            :offset="$q.screen.lt.sm ? [18, 18] : [26, 26]"
        >


            <div class="relative w-16 h-16 sm:w-20 sm:h-20">

                <div class="bg-[#DA492A] w-full h-full octagon">
                    <img
                        class="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        src="@/assets/FAB.svg"
                        alt=""
                    >
                </div>

                <q-fab
                    class="absolute w-full h-full top-0 left-0"
                    hide-icon
                    direction="up"
                    flat
                    unelevated
                >

                    <q-fab-action
                        @click="gotoLink('https://www.facebook.com/msg/103521468250543')"
                        text-color="white"
                        :icon="laFacebookMessenger"
                        flat
                        class="bg-[#1E88E4] w-16 h-16 octagon text-4xl"
                    />
                    <q-fab-action
                        @click="gotoLink('https://line.me/ti/p/@643ibjqd')"
                        text-color="white"
                        icon="img:src/assets/icon-line.svg"
                        flat
                        class="bg-[#00D000] w-16 h-16 octagon pr-2.5 pt-2.5 text-4xl "
                    />
                    <q-fab-action
                        @click="gotoLink('tel:0424512081')"
                        text-color="white"
                        icon="phone"
                        flat
                        class="bg-[#F6AC00] w-16 h-16 octagon text-4xl"
                    />
                    <q-fab-action
                        to="#top"
                        icon="expand_less"
                        flat
                        class="bg-[#F9EDD5] text-[#DB5F1D] w-16 h-16 octagon text-5xl"
                    />
                </q-fab>


            </div>



        </q-page-sticky>

    </q-layout>
</template>

<script setup lang="ts">
import { useElementBounding, useElementSize, useWindowSize } from '@vueuse/core'
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { laFacebookMessenger, laLine } from '@quasar/extras/line-awesome'

interface Props {
    styleType?: string; // 1→白底2球；2→白底4球；3→米底2球；
}
const props = withDefaults(defineProps<Props>(), {
    styleType: '2',
});

const $q = useQuasar()
const windowSize = useWindowSize()
const footer = ref(null)
const footerBounding = useElementBounding(footer)
const footerDom = ref(null)
const footerDomSize = useElementSize(footerDom)
const footerIsNeedFixedBottom = computed(() => footerBounding.top.value <= windowSize.height.value - footerDomSize.height.value)

const gotoLink = (link: string) => {
    window.location.href = link
}
</script>

<style scoped>
.octagon {
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

:deep() .octagon .q-icon {
    font-size: inherit !important;
}
</style>