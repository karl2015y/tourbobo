<template>
    <!-- footer -->
    <!-- <div
        ref="footer"
        :style="`height:${footerDomSize.height.value}px`"
    ></div> -->
    <div
        ref="footerDom"
        class="block left-0 min-w-[375px] relative "
        :style="`z-index:${mainStore.footer.zIndex}`"
        :class="{
            'bg-white': (mainStore.footer.styleType == '1') || (mainStore.footer.styleType == '2'),
            'bg-[#F7EBD3]': (mainStore.footer.styleType == '3'),
        
        }"
    >



        <!-- 2球 -->
        <template v-if="mainStore.footer.styleType == '1'">
            <img
                src="@/assets/footer-bg-2balls.png"
                class="absolute  w-[32.3vw] min-w-[123px] max-w-[619px] -top-[25%] sm:-top-[15%] -left-[8%] "
            />
        </template>
        <!-- 4球 -->
        <template v-if="mainStore.footer.styleType == '2'">
            <img
                src="@/assets/footer-bg-4balls.svg"
                class=" absolute left-0 w-[32.3vw] min-w-[123px] max-w-[619px] -top-[25%] sm:-top-[50%]"
            />
        </template>

        <!-- 2白球 -->
        <template v-if="mainStore.footer.styleType == '3'">
            <img
                src="@/assets/footer-bg-2balls-white.png"
                class="absolute  w-[32.3vw] min-w-[123px] max-w-[619px] -top-[25%] sm:-top-[15%] -left-[8%] "
            />
        </template>
        <!-- 右邊4球 -->
        <img
            src="@/assets/footer-bg-right-4balls.svg"
            class="absolute right-[1.5%] w-[13.33vw] min-w-[50px] sm:w-[10vw] max-w-[180px] -top-[20%] sm:-top-[15%]"
        />
        <!-- 底圖 -->
        <img
            class="hidden sm:!block w-full h-auto max-h-[825px] relative"
            src="@/assets/footer-bg.svg"
            alt=""
        >
        <img
            class="sm:hidden w-full h-auto relative"
            src="@/assets/footer-bg-phone.svg"
            alt=""
        >

        <div class="absolute top-[20%] sm:top-[28%] md:top-1/3  left-1/2 -translate-x-1/2 ">
            <!-- logo -->
            <div>
                <q-router-link>
                    <img
                        class="mx-auto w-[30.4vw] min-w-[114px] sm:w-[16.77vw] max-w-[322px]"
                        src="@/assets/logo-letter.png"
                        alt=""
                    >
                </q-router-link>


            </div>
            <!-- 連結區 -->
            <div
                class="mx-auto w-[65.6vw] min-w-[246px] sm:w-[70vw] md:w-[57.3vw] max-w-[960px] sm:ml-[5%] lg:mt-[5%] flex flex-col flex-nowrap items-center sm:flex-row sm:items-start sm:justify-around ">
                <!-- 關於我們 -->
                <ul
                    class="order-1 mt-4 flex flex-nowrap text-xs whitespace-nowrap text-white sm:flex-col sm:text-base sm:mt-8">
                    <li class="sm:pb-2 sm:border-[#DB5F1D] sm:border-b-2">
                        <q-router-link to="/home#about">關於我們</q-router-link>
                    </li>
                    <li class="pl-2 ml-2 border-l-2 border-[#DC492A] sm:ml-0 sm:border-0 sm:pl-0 sm:mt-3">
                        <q-router-link to="">合作夥伴</q-router-link>
                    </li>
                    <li class="pl-2 ml-2 border-l-2 border-[#DC492A] sm:ml-0 sm:border-0 sm:pl-0 sm:mt-3">
                        <q-router-link to="">服務與退訂條款</q-router-link>
                    </li>
                    <li class="pl-2 ml-2 border-l-2 border-[#DC492A] sm:ml-0 sm:border-0 sm:pl-0 sm:mt-3">
                        <q-router-link to="">隱私權政策</q-router-link>
                    </li>
                </ul>
                <!-- 客戶服務 -->
                <ul
                    class="order-3  ml-5 sm:ml-0 sm:order-2 pl-1 text-white whitespace-nowrap mt-7 border-t-2 border-[#DC492A] sm:border-0  w-44 text-xs sm:mt-8  sm:text-base sm:w-56">
                    <li class="hidden sm:!block sm:pb-2 sm:border-[#DB5F1D] sm:border-b-2">客戶服務</li>
                    <li class="mt-4 sm:mt-3">客服時間:9:00-24:00(UTC+8)</li>
                    <li class="mt-4 sm:mt-3">電話:+886-4-2452-2370</li>
                    <li class="mt-4 sm:mt-3">信箱:service@tourbobo.com</li>
                </ul>
                <!-- 多媒體區 -->
                <ul class="order-2 sm:order-3 sm:self-end">
                    <li>
                        <ul class="mt-4 flex justify-center flex-nowrap">
                            <li>
                                <q-router-link :to="link.facebook">
                                    <img
                                        class="w-6 h-6 sm:w-9 sm:h-9 mr-6"
                                        src="@/assets/icon-facebook-white.svg"
                                    >
                                </q-router-link>
                            </li>
                            <li>
                                <q-router-link :to="link.line">
                                    <img
                                        class="w-6 h-6 sm:w-9 sm:h-9 mr-6"
                                        src="@/assets/icon-line-white.svg"
                                    >
                                </q-router-link>
                            </li>
                            <li>
                                <q-router-link :to="link.instagram">
                                    <img
                                        class="w-6 h-6 sm:w-9 sm:h-9"
                                        src="@/assets/icon-instagram-white.svg"
                                    >
                                </q-router-link>

                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class=" mt-4 flex gap-1 justify-center flex-nowrap">
                            <li>

                                <q-router-link :to="link.appStore">
                                    <img
                                        class="w-14 h-5 sm:w-24 sm:h-8"
                                        src="@/assets/icon-appstore-white.svg"
                                    >
                                </q-router-link>

                            </li>
                            <li>
                                <q-router-link :to="link.googlePlay">
                                    <img
                                        class="w-14 h-5 sm:w-24 sm:h-8"
                                        src="@/assets/icon-googleplay-white.svg"
                                    >
                                </q-router-link>

                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- Copyright -->
            <div
                class=" mt-8 sm:mt-[8%] text-xs font-light text-white scale-50 sm:scale-100 sm:text-sm text-center whitespace-nowrap">
                Copyright 2021 tourbobo Co., Ltd. All Rights Reserved.
            </div>
        </div>
    </div>

    <q-layout class="z-10 !min-h-[0]">

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
                    class="absolute w-[93%] h-[93%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    hide-icon
                    direction="up"
                    flat
                    unelevated
                >

                    <q-fab-action
                        text-color="white"
                        flat
                        padding="0"
                    >
                        <q-router-link :to="link.message">

                        <div class="w-14 h-14 sm:w-16 sm:h-16 octagon bg-[#1E88E4] flex justify-center items-center">
                            <img
                                src="@/assets/icon-facebook-messenger.svg"
                                class="w-1/2 h-1/2"
                            >
                        </div>
                        </q-router-link>
                    </q-fab-action>


                    <q-fab-action
                        text-color="white"
                        flat
                        padding="0"
                    >
                        <q-router-link :to="link.line">
                            <div
                                class="w-14 h-14 sm:w-16 sm:h-16 octagon bg-[#00D000] flex justify-center items-center">
                                <img
                                    src="@/assets/icon-line.svg"
                                    class="w-[60%] h-[60%] mr-0.5 mt-0.5"
                                >
                            </div>
                        </q-router-link>


                    </q-fab-action>
                    <q-fab-action
                        @click="gotoLink(`tel:${link.phone}`)"
                        text-color="white"
                        flat
                        padding="0"
                    >
                        <div
                            class="text-4xl w-14 h-14 sm:w-16 sm:h-16 octagon bg-[#F6AC00] flex justify-center items-center">
                            <q-icon name="phone" />
                        </div>


                    </q-fab-action>

                    <q-fab-action
                        :to="{ ...route, hash: '' }"
                        flat
                        padding="0"
                    >
                        <div
                            class="text-5xl w-14 h-14 sm:w-16 sm:h-16 octagon bg-[#F9EDD5] text-[#DB5F1D] flex justify-center items-center">
                            <q-icon name="expand_less" />
                        </div>


                    </q-fab-action>


                </q-fab>


            </div>



        </q-page-sticky>

    </q-layout>
</template>

<script setup lang="ts">
import { usePageContactFormStore } from '@/stores/page-contactForm.store';
import { useElementBounding, useElementSize, useWindowSize } from '@vueuse/core'
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '../stores/main.store';
import QRouterLink from './QRouterLink.vue';

const route = useRoute()

// interface Props {
//     styleType?: string; // 1→白底2球；2→白底4球；3→米底2球；
// }
// const props = withDefaults(defineProps<Props>(), {
//     styleType: '2',
// });

const pageContactStore = usePageContactFormStore()
const link = computed(() => pageContactStore.contactForm)

const mainStore = useMainStore()

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