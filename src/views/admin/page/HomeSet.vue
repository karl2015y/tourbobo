<template>
    <q-page-sticky
        @click="handleSave()"
        position="top-right"
        :offset="[18, 18]"
        class="z-10"
    >
        <div class="text-right ">
            <q-btn
                :color="isDifferent ? 'negative' : 'secondary'"
                :label="isDifferent ? '未儲存' : '已儲存'"
            >
                <q-tooltip v-if="TimeNote && TimeNote?.length > 0"> 上次存檔時間：{{ TimeNote[0].time }}，更新人：{{
                        TimeNote[0].adminName
                }}</q-tooltip>
            </q-btn>

        </div>

    </q-page-sticky>
    <!-- 輪播圖 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">輪播圖</div>

        </div>
        <div class="p-3 w-full ">


            <div class="mt-3 flex items-center gap-3">
                <div class="font-bold text-lg">列點</div>
                <div>
                    <q-btn
                        @click="addBanner()"
                        round
                        color="primary"
                        icon="add"
                        size="sm"
                    />
                </div>
            </div>
            <div
                v-if="bannerList.length == 0"
                class=" mt-1 p-3"
            >
                無資料
            </div>
            <template v-else>

                <div class="p-3 w-full overflow-y-auto">
                    <q-scroll-area class="h-[30rem] max-w-[100vw]">


                        <draggable
                            class="flex gap-3 ml-3 flex-nowrap"
                            v-model="bannerList"
                            item-key="index"
                            handle=".handle"
                        >
                            <template #item="{ element, index }">

                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                    <q-btn
                                        @click="removeBanner(index)"
                                        class="absolute right-0 -top-[1px]"
                                        color="red"
                                        size="xs"
                                        icon="close"
                                        round
                                    >
                                        <q-tooltip>刪除第{{ index + 1 }}項</q-tooltip>
                                    </q-btn>



                                    <div class="font-bold text-lg">
                                        <q-btn
                                            class="handle -mt-2"
                                            size="xs"
                                            icon="drag_handle"
                                            round
                                        >
                                            <q-tooltip>拖曳移動</q-tooltip>
                                        </q-btn>
                                        第{{ index + 1 }}項連結
                                    </div>
                                    <q-input
                                        filled
                                        v-model="element.link"
                                    />

                                    <e-image-uploader
                                        path="tbb/home/banner"
                                        class="w-48"
                                        v-model="element.image"
                                        :name="`第${index + 1}點電腦版圖片`"
                                    />
                                    <e-image-uploader
                                        path="tbb/home/banner"
                                        class="w-48"
                                        v-model="element.smallImage"
                                        :name="`第${index + 1}點手機版圖片`"
                                    />
                                </div>
                            </template>
                        </draggable>

                    </q-scroll-area>

                </div>


            </template>
        </div>



    </div>

    <!-- 活動輪播圖 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">活動輪播圖</div>

        </div>
        <div class="p-3 w-full ">


            <div class="mt-3 flex items-center gap-3">
                <div class="font-bold text-lg">列點</div>
                <div>
                    <q-btn
                        @click="addActivityBannerItem()"
                        round
                        color="primary"
                        icon="add"
                        size="sm"
                    />
                </div>
            </div>
            <div
                v-if="activityList.length == 0"
                class=" mt-1 p-3"
            >
                無資料
            </div>
            <template v-else>

                <div class="p-3 w-full overflow-y-auto">
                    <q-scroll-area class="h-[30rem] max-w-[100vw]">


                        <draggable
                            class="flex gap-3 ml-3 flex-nowrap"
                            v-model="activityList"
                            item-key="index"
                            handle=".handle"
                        >
                            <template #item="{ element, index }">

                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                    <q-btn
                                        @click="removeActivityBannerItem(index)"
                                        class="absolute right-0 -top-[1px]"
                                        color="red"
                                        size="xs"
                                        icon="close"
                                        round
                                    >
                                        <q-tooltip>刪除第{{ index + 1 }}項</q-tooltip>
                                    </q-btn>



                                    <div class="font-bold text-lg">
                                        <q-btn
                                            class="handle -mt-2"
                                            size="xs"
                                            icon="drag_handle"
                                            round
                                        >
                                            <q-tooltip>拖曳移動</q-tooltip>
                                        </q-btn>
                                        第{{ index + 1 }}項名稱
                                    </div>
                                    <q-input
                                        filled
                                        v-model="element.name"
                                    />
                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}項連結</div>
                                    <q-input
                                        filled
                                        v-model="element.link"
                                    />
                                    <e-image-uploader
                                        path="tbb/home/activity"
                                        class="w-48"
                                        v-model="element.image"
                                        :name="`第${index + 1}點圖片`"
                                    />
                                </div>
                            </template>
                        </draggable>

                    </q-scroll-area>

                </div>


            </template>
        </div>



    </div>

    <!-- 熱門城市 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">熱門城市</div>

        </div>
        <div class="p-3 w-full ">


            <div class="mt-3 flex items-center gap-3">
                <div class="font-bold text-lg">列點</div>
                <div>
                    <q-btn
                        @click="addCityItem()"
                        round
                        color="primary"
                        icon="add"
                        size="sm"
                    />
                </div>
            </div>
            <div
                v-if="cities.length == 0"
                class=" mt-1 p-3"
            >
                無資料
            </div>
            <template v-else>

                <div class="p-3 w-full overflow-y-auto">
                    <q-scroll-area class="h-[40rem] max-w-[100vw]">
                        <draggable
                            class="flex gap-3 ml-3 flex-nowrap"
                            v-model="cities"
                            item-key="index"
                            handle=".handle"
                        >
                            <template #item="{ element, index }">

                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                    <q-btn
                                        @click="removeCityItem(index)"
                                        class="absolute right-0 -top-[1px]"
                                        color="red"
                                        size="xs"
                                        icon="close"
                                        round
                                    >
                                        <q-tooltip>刪除第{{ index + 1 }}座城市</q-tooltip>
                                    </q-btn>



                                    <div class="font-bold text-lg">
                                        <q-btn
                                            class="handle -mt-2"
                                            size="xs"
                                            icon="drag_handle"
                                            round
                                        >
                                            <q-tooltip>拖曳移動</q-tooltip>
                                        </q-btn>
                                        第{{ index + 1 }}座城市狀態
                                    </div>
                                    <q-toggle
                                        v-model="element.available"
                                        label="顯示"
                                    />

                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}座城市id</div>
                                    <q-input
                                        filled
                                        v-model.number="element.city_id"
                                        type="number"
                                        hint="可以查api或是問小白"
                                    />

                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}座城市中文名稱</div>
                                    <q-input
                                        filled
                                        v-model="element.city_name"
                                    />
                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}座城市英文名稱</div>
                                    <q-input
                                        filled
                                        v-model="element.city_en_name"
                                    />
                                    <e-image-uploader
                                        path="tbb/home/city"
                                        class="w-48"
                                        v-model="element.image"
                                        :name="`第${index + 1}座城市圖片`"
                                    />
                                </div>
                            </template>
                        </draggable>

                    </q-scroll-area>

                </div>


            </template>
        </div>



    </div>

    <!-- 旅館輪播放列表 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">旅館輪播放列表</div>

        </div>
        <div class="p-3 w-full ">


            <div class="mt-3 flex items-center gap-3">
                <div class="font-bold text-lg">列點</div>
                <div>
                    <q-btn
                        @click="addHotelInAreaItem()"
                        round
                        color="primary"
                        icon="add"
                        size="sm"
                    />
                </div>
            </div>
            <div
                v-if="areaArray.length == 0"
                class=" mt-1 p-3"
            >
                無資料
            </div>
            <template v-else>

                <div class="p-3 w-full overflow-y-auto">
                    <q-scroll-area class="h-[30rem] max-w-[100vw]">


                        <draggable
                            class="flex gap-3 ml-3 flex-nowrap"
                            v-model="areaArray"
                            item-key="index"
                            handle=".handle"
                        >
                            <template #item="{ element, index }">

                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                    <q-btn
                                        @click="removeHotelInAreaItem(index)"
                                        class="absolute right-0 -top-[1px]"
                                        color="red"
                                        size="xs"
                                        icon="close"
                                        round
                                    >
                                        <q-tooltip>刪除第{{ index + 1 }}項</q-tooltip>
                                    </q-btn>



                                    <div class="font-bold text-lg">
                                        <q-btn
                                            class="handle -mt-2"
                                            size="xs"
                                            icon="drag_handle"
                                            round
                                        >
                                            <q-tooltip>拖曳移動</q-tooltip>
                                        </q-btn>
                                        第{{ index + 1 }}項名稱
                                    </div>
                                    <q-input
                                        filled
                                        v-model="element.name"
                                    />
                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}項城市id列表</div>
                                    <q-select
                                        filled
                                        v-model="element.hotes_id"
                                        use-input
                                        use-chips
                                        multiple
                                        hide-dropdown-icon
                                        input-debounce="0"
                                        new-value-mode="add-unique"
                                    />


                                </div>
                            </template>
                        </draggable>

                    </q-scroll-area>

                </div>


            </template>
        </div>



    </div>

    <!-- 關於我們 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">關於我們</div>

        </div>

        <div class="p-3 w-[63vw] max-w-[1000px]">
            <div class="font-bold text-lg">內文</div>
            <q-input
                filled
                v-model="aboutObj.content"
                type="textarea"
            />

        </div>






    </div>

</template>

<script setup lang="ts">
import { db, removeStorage } from '@/common/firebase';
import EImageUploader from '@/components/admin/elements/EImageUploader.vue'
import { useNotify } from '@/composables/notify';
import { useAdminStore } from '@/stores/admin.store';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { cloneDeep, isEmpty } from 'lodash';
import md5 from 'md5';
import { computed, ref, watchEffect } from 'vue';
import draggable from 'vuedraggable'

const Notify = useNotify()
const adminStore = useAdminStore()

// DB
const PageHomeDB = db().collection('Sites/travel-tbb/Pages').doc('Home')
const PageHomeData = ref((useFirestore(PageHomeDB)) as any)
const TimeNote = ref<Array<any | null>>((useFirestore(PageHomeDB.collection('TimeNote').orderBy('timestamp', 'desc').limit(1))) as any)
watchEffect(() => {
    if (PageHomeData.value) {
        bannerList.value = PageHomeData.value.bannerList
        activityList.value = PageHomeData.value.activityList
       cities.value = PageHomeData.value.cities
       areaArray.value = PageHomeData.value.areaArray
       aboutObj.value = PageHomeData.value.aboutObj

    }
})

const preSaveData = computed(() => {
    if (PageHomeData.value === null || PageHomeData.value) {
        return {
            bannerList: bannerList.value,
            activityList: activityList.value,
            cities: cities.value,
            areaArray: areaArray.value,
            aboutObj: aboutObj.value,
        }
    }
    return {}
})

const dataDefaultMd5 = ref('')
const preSaveDataMd5 = computed(() => {
    if (!isEmpty(preSaveData.value)) {
        const _md5 = md5(JSON.stringify(preSaveData.value))
        if (dataDefaultMd5.value == '') dataDefaultMd5.value = _md5
        return _md5
    }
    return ''
})
const isDifferent = computed(() => PageHomeData.value === null || (dataDefaultMd5.value !== preSaveDataMd5.value))

const handleSave = () => {
    if (!isDifferent.value) return;
    PageHomeDB.collection('TimeNote').add({
        timestamp: (new Date).getTime(),
        time: (new Date).toLocaleString(),
        adminName: adminStore.userName

    })
    PageHomeDB.set(preSaveData.value).then(() => {
        Notify.handleSuccess("成功")
        dataDefaultMd5.value = preSaveDataMd5.value

    }).catch(error => {
        Notify.handleError("錯誤")
        console.log(error);
    })
}


// 輪播圖
type BannerType = {
    image: string;
    smallImage: string;
    link: string;
}
const BannerDefault: BannerType = {
    image: '',
    smallImage: '',
    link: ''
}
const bannerList = ref<Array<BannerType>>([])
const addBanner = () => {
    bannerList.value.push(cloneDeep(BannerDefault))
}
const removeBanner = async (index: number) => {
    try {
        await removeStorage(bannerList.value[index].image)
        await removeStorage(bannerList.value[index].smallImage)
        bannerList.value.splice(index, 1)
        Notify.handleSuccess('刪除成功')

    } catch (error) {
        console.log(error);
    }
}

//  活動輪播圖 
type ActivityBannerType = {
    image: string,
    link: string,
    name: string,
}
const ActivityBannerItemDefault: ActivityBannerType = {
    image: "",
    link: '',
    name: '',
}
const activityList = ref<ActivityBannerType[]>([])
const addActivityBannerItem = () => {
    activityList.value.push(cloneDeep(ActivityBannerItemDefault))
}
const removeActivityBannerItem = async (index: number) => {
    try {
        await removeStorage(activityList.value[index].image)
        activityList.value.splice(index, 1)
        Notify.handleSuccess('刪除成功')
    } catch (error) {
        console.log(error);
    }
}


//  熱門城市列表
type CityType = {
    available: boolean,
    city_id: number,
    city_name: string,
    city_en_name: string,
    image: string,
}
const CityItemDefault: CityType = {
    available: true,
    city_id: 0,
    city_name: "",
    city_en_name: '',
    image: '',
}
const cities = ref<CityType[]>([])
const addCityItem = () => {
    cities.value.push(cloneDeep(CityItemDefault))
}
const removeCityItem = async (index: number) => {
    try {
        await removeStorage(activityList.value[index].image)
        activityList.value.splice(index, 1)
        Notify.handleSuccess('刪除成功')
    } catch (error) {
        console.log(error);
    }
}


//  旅館輪播放列表
type HotelInAreaType = {
    name: string;
    hotes_id: string[]
}
const HotelInAreaItemDefault: HotelInAreaType = {
    name: "",
    hotes_id: []
}
const areaArray = ref<HotelInAreaType[]>([])
const addHotelInAreaItem = () => {
    areaArray.value.push(cloneDeep(HotelInAreaItemDefault))
}
const removeHotelInAreaItem = async (index: number) => {
    try {
        areaArray.value.splice(index, 1)
        Notify.handleSuccess('刪除成功')
    } catch (error) {
        console.log(error);
    }
}

 
//  關於我們
const aboutObj= ref({
    content:''
})

</script>

<style scoped>
:deep() .q-editor__content a {
    @apply text-[#00A29A]
}
</style>