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

    <!-- 旅館類別 -->
    <div class="p-3 border-b ">
        <div class="flex items-center gap-3">
            <div class="font-bold text-2xl">旅館類別</div>
        </div>
        <div class="p-3 w-full ">
            <div class="mt-3 flex items-center gap-3">
                <div class="font-bold text-lg">列點</div>
                <div>
                    <q-btn
                        @click="addHotelCategory()"
                        round
                        color="primary"
                        icon="add"
                        size="sm"
                    />
                </div>
            </div>
            <div
                v-if="hotelCategoryData.length == 0"
                class=" mt-1 p-3"
            >
                無資料
            </div>
            <template v-else>
                <div class="p-3 w-full overflow-y-auto">
                    <q-scroll-area class="h-[30rem] max-w-[100vw]">
                        <draggable
                            class="flex gap-3 ml-3 flex-nowrap"
                            v-model="hotelCategoryData"
                            item-key="index"
                            handle=".handle"
                        >
                            <template #item="{ element, index }">

                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                    <q-btn
                                        @click="removeHotelCategory(index)"
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
                                        第{{ index + 1 }}類名稱
                                    </div>
                                    <q-input
                                        filled
                                        v-model="element.name"
                                    />
                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}類大標</div>
                                    <q-input
                                        filled
                                        v-model="element.title"
                                    />
                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}類小標</div>
                                    <q-input
                                        filled
                                        v-model="element.subTitle"
                                    />
                                    <e-image-uploader
                                        path="tbb/hotel-category"
                                        class="w-48"
                                        v-model="element.image"
                                        :name="`第${index + 1}類電腦版圖片`"
                                    />
                                    <e-image-uploader
                                        path="tbb/hotel-category"
                                        class="w-48"
                                        v-model="element.smallImage"
                                        :name="`第${index + 1}類手機版圖片`"
                                    />
                                    <e-image-uploader
                                        path="tbb/hotel-category"
                                        class="w-48"
                                        v-model="element.hoverImage"
                                        :name="`第${index + 1}類Hover圖片`"
                                    />
                                </div>
                            </template>
                        </draggable>
                    </q-scroll-area>
                </div>


                <template v-for="category in hotelCategoryData">
                    <!-- 次旅館類別 -->
                    <div
                        v-if="category.name"
                        class="p-3 border-b "
                    >
                        <div class="flex items-center gap-3">
                            <div class="font-bold text-2xl">次旅館類別-{{ category.name }}</div>
                        </div>
                        <div class="p-3 w-full ">
                            <div class="mt-3 flex items-center gap-3">
                                <div class="font-bold text-lg">列點</div>
                                <div>
                                    <q-btn
                                        @click="addSubCategory(category.subCategoryData)"
                                        round
                                        color="primary"
                                        icon="add"
                                        size="sm"
                                    />
                                </div>
                            </div>
                            <div
                                v-if="category.subCategoryData.length == 0"
                                class=" mt-1 p-3"
                            >
                                無資料
                            </div>
                            <template v-else>
                                <div class="p-3 w-full overflow-y-auto">
                                    <q-scroll-area class="h-[30rem] max-w-[100vw]">
                                        <draggable
                                            class="flex gap-3 ml-3 flex-nowrap"
                                            v-model="category.subCategoryData"
                                            item-key="index"
                                            handle=".handle"
                                        >
                                            <template #item="{ element, index }">

                                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                                    <q-btn
                                                        @click="removeSubCategory(category.subCategoryData, index)"
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
                                                        第{{ index + 1 }}次類順位
                                                    </div>

                                                    <q-input
                                                        filled
                                                        v-model="element.order"
                                                    />
                                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}次類名稱</div>
                                                    <q-input
                                                        filled
                                                        v-model="element.name"
                                                    />
                                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}次類簡介</div>
                                                    <q-input
                                                        filled
                                                        v-model="element.description"
                                                    />
                                                    <div class="mt-5 font-bold text-lg">第{{ index + 1 }}次類優惠內容</div>
                                                    <q-input
                                                        filled
                                                        v-model="element.discountDescription"
                                                    />

                                                </div>
                                            </template>
                                        </draggable>
                                    </q-scroll-area>
                                </div>

                                <template v-for="subCategory in category.subCategoryData">
                                    <!-- 旅館列表 -->
                                    <div
                                        v-if="subCategory.name"
                                        class="p-3 border-b "
                                    >
                                        <div class="flex items-center gap-3">
                                            <div class="font-bold text-2xl">旅館列表-{{ subCategory.name }}</div>
                                        </div>
                                        <div class="p-3 w-full ">
                                            <div class="mt-3 flex items-center gap-3">
                                                <div class="font-bold text-lg">列點</div>
                                                <div>
                                                    <q-btn
                                                        @click="addHotel(subCategory.hotels)"
                                                        round
                                                        color="primary"
                                                        icon="add"
                                                        size="sm"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                v-if="subCategory.hotels.length == 0"
                                                class=" mt-1 p-3"
                                            >
                                                無資料
                                            </div>
                                            <template v-else>
                                                <div class="p-3 w-full overflow-y-auto">
                                                    <q-scroll-area class="h-[30rem] max-w-[100vw]">
                                                        <draggable
                                                            class="flex gap-3 ml-3 flex-nowrap"
                                                            v-model="subCategory.hotels"
                                                            item-key="index"
                                                            handle=".handle"
                                                        >
                                                            <template #item="{ element, index }">

                                                                <div class="relative mt-1 w-[30vw] max-w-[500px]">

                                                                    <q-btn
                                                                        @click="removeHotel(subCategory.hotels, index)"
                                                                        class="absolute right-0 -top-[1px]"
                                                                        color="red"
                                                                        size="xs"
                                                                        icon="close"
                                                                        round
                                                                    >
                                                                        <q-tooltip>刪除第{{ index + 1 }}間</q-tooltip>
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
                                                                        第{{ index + 1 }}間id
                                                                    </div>

                                                                    <q-input
                                                                        filled
                                                                        v-model="element.hotel_id"
                                                                    />
                                                                    <div class="mt-5 font-bold text-lg">
                                                                        第{{ index + 1 }}間標籤
                                                                    </div>
                                                                    <q-select
                                                                        filled
                                                                        v-model="element.tags"
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



                                </template>
                            </template>
                        </div>



                    </div>



                </template>


            </template>
        </div>



    </div>




</template>

<script setup lang="ts">
import { db, removeStorage } from '@/common/firebase';
import EImageUploader from '@/components/admin/elements/EImageUploader.vue'
import { useNotify } from '@/composables/notify';
import { useAdminStore } from '@/stores/admin.store';
import { HotelCategorySubCategoryHotelsWithTagsType, HotelCategorySubCategoryType, HotelCategoryType } from '@/types/hotel.type';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { cloneDeep, isEmpty } from 'lodash';
import md5 from 'md5';
import { computed, ref, watchEffect } from 'vue';
import draggable from 'vuedraggable'

const Notify = useNotify()
const adminStore = useAdminStore()

// DB
const HotelCategoryDB = db().collection('Sites/travel-tbb/Pages').doc('HotelCategory')
const HotelCategoryData = ref((useFirestore(HotelCategoryDB)) as any)
const TimeNote = ref<Array<any | null>>((useFirestore(HotelCategoryDB.collection('TimeNote').orderBy('timestamp', 'desc').limit(1))) as any)
watchEffect(() => {
    if (HotelCategoryData.value) {
            hotelCategoryData.value = HotelCategoryData.value.hotelCategoryData
    }
})
const preSaveData = computed(() => {
    if (HotelCategoryData.value === null || HotelCategoryData.value) {
        return {
            hotelCategoryData: hotelCategoryData.value,
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
const isDifferent = computed(() => HotelCategoryData.value === null || (dataDefaultMd5.value !== preSaveDataMd5.value))
const handleSave = () => {
    if (!isDifferent.value) return;
    HotelCategoryDB.collection('TimeNote').add({
        timestamp: (new Date).getTime(),
        time: (new Date).toLocaleString(),
        adminName: adminStore.userName

    })
    HotelCategoryDB.set(preSaveData.value).then(() => {
        Notify.handleSuccess("成功")
        dataDefaultMd5.value = preSaveDataMd5.value

    }).catch(error => {
        Notify.handleError("錯誤")
        console.log(error);
    })
}


// 旅館類別
const HotelCategoryDefault: HotelCategoryType = {
    name: '',
    title: '',
    subTitle: '',
    image: '',
    smallImage: '',
    hoverImage: '',
    subCategoryData: []
}
const hotelCategoryData = ref<HotelCategoryType[]>([])
const addHotelCategory = () => {
    hotelCategoryData.value.push(cloneDeep(HotelCategoryDefault))
}
const removeHotelCategory = async (index: number) => {
    try {
        await removeStorage(hotelCategoryData.value[index].image)
        await removeStorage(hotelCategoryData.value[index].smallImage ?? '')
        await removeStorage(hotelCategoryData.value[index].hoverImage)
        hotelCategoryData.value.splice(index, 1)
        Notify.handleSuccess('刪除成功')
    } catch (error) {
        console.log(error);
    }
}


// 次旅館類別
const subCategoryDefault: HotelCategorySubCategoryType = {
    order: '',
    name: '',
    description: '',
    discountDescription: '',
    hotels: []
}
const addSubCategory = (_subCategory: HotelCategorySubCategoryType[]) => {
    _subCategory.push(cloneDeep(subCategoryDefault))
}
const removeSubCategory = async (_subCategory: HotelCategorySubCategoryType[], index: number) => {
    try {
        _subCategory.splice(index, 1)
        Notify.handleSuccess('刪除成功')
    } catch (error) {
        console.log(error);
    }
}


// 旅館列表
const hotelDefault: HotelCategorySubCategoryHotelsWithTagsType = {
    hotel_id: '',
    tags: []
}
const addHotel = (_hotels: HotelCategorySubCategoryHotelsWithTagsType[]) => {
    _hotels.push(cloneDeep(hotelDefault))
}
const removeHotel = async (_hotels: HotelCategorySubCategoryHotelsWithTagsType[], index: number) => {
    try {
        _hotels.splice(index, 1)
        Notify.handleSuccess('刪除成功')
    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
:deep() .q-editor__content a {
    @apply text-[#00A29A]
}
</style>