<template>
    <div class="relative w-full z-10 ">
        <q-img
            class="top-bg-img hidden sm:!block absolute -z-10 top-0 lef-0 w-full max-h-[777px] object-cover"
            :ratio="1920 / 777"
            src="@/assets/post/bg-post.svg"
        />
        <!-- 
        /> -->
        <div class="sm:flex justify-between mt-0 sm:mt-14 sm:mx-14 max-w-[1920px] ">
            <div class="hidden sm:!block w-full sm:w-[30%]  ">
                <template v-for="category in postCategory">
                    <div
                        @click="clickQueryLinkByObject({ category })"
                        :class="{
                            '!text-white !bg-[#00586E]': currentPostCategory == category
                        }"
                        class="cursor-pointer text-[#005A72] bg-white w-full py-6 pl-4 mt-0.5 text-xl font-semibold rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
                    >
                        {{ category }}
                    </div>
                    <q-slide-transition>
                        <div
                            v-show="currentPostCategory == category"
                            class="px-1.5"
                        >
                            <div
                                v-if="PostArrayFilterByCategory.length == 0"
                                class="py-5 px-2.5 flex flex-nowrap  border-l-[14px] border-[#00586E] bg-white"
                            >
                                暫無資料

                            </div>
                            <template v-for="post in PostArrayFilterByCategory">
                                <div
                                    @click="clickQueryLink('post_id', post.post_id)"
                                    :class="{
                                        '!bg-[#D6E5E8]': post.post_id == currentPost?.post_id
                                    }"
                                    class=" cursor-pointer py-5 px-2.5 flex  border-l-[14px] border-[#00586E] bg-white"
                                >
                                    <div
                                        :class="{
                                            '!bg-white': post.post_id == currentPost?.post_id
                                        }"
                                        class="bg-[#F3F3F4] h-7 px-3 flex justify-center items-center "
                                    >
                                        <span class="w-20 truncate">
                                            {{ post.createDate }}
                                            <q-tooltip
                                                v-if="post.createDate.length > 10"
                                                transition-show="flip-up"
                                                transition-hide="flip-down"
                                                anchor="center middle"
                                                self="center middle"
                                                class="bg-[#F3F3F4] text-black"
                                            >{{ post.createDate }}</q-tooltip>
                                        </span>
                                    </div>
                                    <div class="ml-2 text-lg ">{{ post.title }}</div>
                                </div>
                            </template>
                        </div>
                    </q-slide-transition>
                </template>
            </div>
            <div class="w-full sm:w-2/3">
                <div
                    v-if="currentPost"
                    class="px-5 sm:px-0"
                >
                    <q-router-link
                        class="sm:hidden"
                        :to="cacheHistoryRoutePath ? cacheHistoryRoutePath : '/post'"
                    >
                        <div
                            class="mt-4 mb-3 w-[86px] h-[23px] rounded-xl bg-[#F4AA00] text-white  flex justify-center items-center">
                            <q-icon name="chevron_left" />
                            <span class="text-sm">
                                返回列表
                            </span>
                        </div>

                    </q-router-link>
                    <div class="text-4xl font-bold text-[#005A72] hidden sm:!block">
                        {{ currentPost.title }}

                    </div>
                    <div class="text-lg mt-3  hidden sm:!block">
                        {{ currentPost.subTitle }}

                    </div>
                    <q-img
                        class="rounded-xl sm:mt-3"
                        :ratio="333 / 130"
                        :src="currentPost.image"
                    />

                    <div class="sm:hidden w-full bg-[#00586E] text-[#F7EBD3] mt-5 p-3 text-center font-bold text-xl">
                        {{ currentPost.title }}
                    </div>

                    <div
                        class="mt-5 sm:mt-20 min-h-[50vh] text-base "
                        v-html="currentPost.content"
                    >

                    </div>
                    <template v-if="currentPost.note">
                        <div
                            @click="noteVisible = !noteVisible"
                            class="mb-3 pb-2 text-sm w-full flex justify-center items-center border-b-2 border-[#005A72]"
                        >
                            注意事項
                            <q-icon
                                v-if="noteVisible"
                                name="remove_circle_outline"
                                class="ml-2 text-[#005A72]"
                            />
                            <q-icon
                                v-else
                                name="add_circle_outline"
                                class="ml-2 text-[#005A72]"
                            />
                        </div>

                        <q-slide-transition>
                            <div
                                v-show="noteVisible"
                                v-html="currentPost.note"
                            ></div>
                        </q-slide-transition>
                    </template>

                    <div class="w-full h-20"></div>
                    <!-- 文章內容 -->

                </div>
                <div
                    v-else
                    class="sm:hidden"
                >
                    <!-- 手機版-輪撥 -->
                    <q-responsive
                        v-if="showPostArray.filter(post => post.showOnBoard).length > 0"
                        class="sm:hidden w-full
                bg-contain bg-no-repeat 
                bg-[url(@/assets/post/bg-post-phone.svg)]"
                        :ratio="375 / 189"
                    >
                        <swiper
                            class="
                    translate-y-[10%]
                    !w-[88.8%] !h-[90%]
                [--swiper-pagination-bullet-horizontal-gap:3px]
                [--swiper-theme-color:#ffffff]
                [--swiper-pagination-bullet-inactive-color:#ffffff]
                [--swiper-pagination-bullet-inactive-opacity:1]
                "
                            :pagination="{
                                clickable: true,
                            }"
                            :modules="[Pagination, Autoplay]"
                            :loop="showPostArray.filter(post => post.showOnBoard).length > 1"
                            :autoplay="{
                                delay: 2000,
                            }"
                        >
                            <template v-for="post in showPostArray.filter(post => post.showOnBoard)">
                                <swiper-slide>
                                    <q-router-link :to="{ ...route, query: { 'post_id': post.post_id } }">
                                        <q-img
                                            @click="cacheHistoryRoutePath = route.fullPath"
                                            class="rounded-xl"
                                            :ratio="333 / 130"
                                            :src="post.image"
                                        />
                                    </q-router-link>

                                </swiper-slide>
                            </template>


                        </swiper>
                    </q-responsive>

                    <!-- 手機版-列表 -->
                    <div class="mt-9 flex justify-center sm:hidden">
                        <template v-for="item, index in postCategory">
                            <div
                                v-if="index > 0"
                                class="w-[7vw] h-1"
                            ></div>
                            <button
                                @click="clickQueryLinkByObject({ 'category': item })"
                                class="bg-[#E8E8E8] text-[#00586E] rounded-3xl px-[5.333vw] pt-[3.2vw] pb-[3vw] leading-6 text-lg font-semibold "
                                :class="{
                                    '!bg-[#22576C] !text-[#ffffff]': currentPostCategory == item
                                }"
                            >
                                {{ item }}
                            </button>

                        </template>


                    </div>

                    <div
                        v-if="showPostArray.length == 0"
                        class="text-2xl text-gray-400 h-[40vh] flex items-center justify-center"
                    >
                        暫無資料
                    </div>

                    <div
                        v-else
                        class="mt-3 flex justify-center sm:hidden w-full"
                    >
                        <template v-for="post in showPostArray">
                            <q-router-link :to="{ ...route, query: { 'post_id': post.post_id } }">

                                <div
                                    @click="cacheHistoryRoutePath = route.fullPath"
                                    class="post-card"
                                >
                                    <div class="font-medium text-lg leading-6 max-w-[18rem] ">
                                        {{ post.title }}
                                    </div>
                                    <div class="mt-8 text-sm !leading-5 font-medium text-[#979797] ml-3">
                                        <q-icon name="calendar_month" />
                                        <span> {{ post.createDate }}</span>
                                    </div>
                                    <q-icon
                                        class="absolute top-1/2 -translate-y-1/2 right-2"
                                        size="sm"
                                        name="navigate_next"
                                    />
                                </div>
                            </q-router-link>
                            <!-- <div class="mx-[8.3vw]  h-20 w-full shadow-[0px_0px_8px_rgba(0, 0,0,0.25)]">

                    </div> -->
                        </template>
                    </div>

                    <div
                        v-if="limitPageOfShowPost > 1"
                        class="flex justify-center mb-5"
                    >
                        <template v-for="page in limitPageOfShowPost">
                            <div
                                @click="clickQueryLink('page', `${page}`)"
                                :class="{ '!ml-0': page == 1, '!bg-[#00586E] text-white': page == currentPageOfShowPost }"
                                class="bg-[#E8E8E8] text-[#00586E] ml-4 rounded-lg text-xl w-[34px] h-[41px] flex justify-center items-center"
                            >
                                {{ page }}
                            </div>
                        </template>

                    </div>

                </div>
            </div>

        </div>

        <q-img
            class="hidden sm:!block"
            src="@/assets/post/footer-post.png"
        />
    </div>


</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import { filter, find, map } from "lodash";
import { useWindowSize } from '@vueuse/core'
import { useMainStore } from "../../stores/main.store";
import { PostCategoryType, PostType } from "../../types/post.type";

interface Props {
    postCategory: PostCategoryType[];
    postArray: PostType[];
}
const props = defineProps<Props>()

const windowSize = useWindowSize()
const route = useRoute()
const router = useRouter()
const clickQueryLink = (queryKey: string, queryValue: string) => {
    router.push({ ...route, query: { ...route.query, [queryKey]: queryValue } })
}
const clickQueryLinkByObject = (queryObj: { [queryKey: string]: string }) => {
    router.push({ ...route, query: queryObj })
}

const postArray = computed(() => map(props.postArray, (o) => ({ ...o, category: find(props.postCategory, ['postCategory_id', o.category_id])?.postCategory_name })))
// 文章分類
const postCategory = computed(() => map(props.postCategory, (o) => o.postCategory_name))
const currentPostCategory = computed(() => {
    const routeCategory = route.query['category']
    const firstCategory = postCategory.value[0]
    if (routeCategory) {
        if (postCategory.value.indexOf(routeCategory as string) == -1) {
            clickQueryLinkByObject({ 'category': firstCategory })
        }
        return routeCategory
    }
    return firstCategory
})
const PostArrayFilterByCategory = computed(() => filter(postArray.value, ['category', currentPostCategory.value]))
// 文章分頁
const currentPageOfShowPost = computed(() => {
    const routePage = route.query['page']
    if (routePage) {
        if (Number(routePage) > limitPageOfShowPost.value) {
            clickQueryLink('page', '1')
        }
        return Number(routePage)
    }
    return 1
});
const limitPageOfShowPost = computed(() => Math.ceil(PostArrayFilterByCategory.value.length / 5))
const showPostArray = computed(() => {
    return PostArrayFilterByCategory.value.slice((currentPageOfShowPost.value - 1) * 5, currentPageOfShowPost.value * 5)
})

// 單篇文章
const currentPost = computed(() => {
    const routePostId = route.query['post_id']
    if (routePostId) {
        const _currentPost = find(postArray.value, ['post_id', routePostId])
        if (_currentPost) {
            return _currentPost
        }
        return clickQueryLinkByObject({})
    } else if (windowSize.width.value >= 640) {
        return showPostArray.value[0]
    }
    return null
})
//注意事項
const noteVisible = ref(true)
// 返回上一頁的緩存
const cacheHistoryRoutePath = ref('')


const mainStore = useMainStore()

watchEffect(() => {
    if (windowSize.width.value < 640) {
        mainStore.footer.styleType = "1"
        mainStore.footer.zIndex = 0
    } else {
        mainStore.footer.styleType = "3"
        mainStore.footer.zIndex = 10
    }
})

</script>

<style scoped>
:deep().swiper-pagination-bullet-active {
    width: 24px;
    border-radius: 5px;
}

:deep().swiper-pagination-bullet {
    transition: width .3s, border-radius .5s;

}

.post-card {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    @apply my-[2.5vw] w-[83.46vw] min-w-[313px] min-h-[122px] relative pt-6 pb-3 px-3 bg-[#FFFEFF] rounded-xl
}

@media (min-width: 1940px) {
    .top-bg-img {
        clip-path: polygon(100% 1%, 100% 100%, 82% 90%, 57% 81%, 34% 82%, 13% 90%, 0 100%, 0 0);
    }

    .max-w-\[1920px\] {
        @apply mx-auto
    }
}
</style>