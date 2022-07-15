<template>
    <!-- type1 -->
    <template v-if="props.styleType == '1'">
        <div class="relative z-10 bg-[#F7EBD3]  w-full sm:-top-[1px]">

            <img
                class="sm:hidden absolute top-8 right-0 h-[165px] w-[70px] -z-10"
                src="@/assets/hotelCategory/icon-bg-right-phone.svg"
            />
            <img
                class="sm:hidden absolute bottom-0 left-0 h-[165px] w-[70px] -z-10"
                src="@/assets/hotelCategory/icon-bg-left-phone.svg"
            />
            <img
                class="hidden sm:!block absolute top-36  left-0 h-[161px] w-[215px] -z-10"
                src="@/assets/hotelCategory/icon-bg-left.svg"
            />
            <img
                class="hidden sm:!block absolute top-72  right-0 h-[384px] w-[394px] -z-10"
                src="@/assets/hotelCategory/icon-bg-right.svg"
            />

            <div class="mt-8 sm:mt-16 px-6 sm:px-40  min-h-[670px]">
                111111
            </div>

        </div>
        <q-responsive
            :ratio="402 / 55"
            class="sm:hidden w-full"
        >
            <q-img
                :ratio="402 / 55"
                src="@/assets/hotelCategory/Background1-phone.png"
            />
        </q-responsive>
        <q-responsive
            :ratio="1920 / 220"
            class="hidden sm:!block w-full sm:-top-[1px]"
        >
            <q-img
                :ratio="1920 / 220"
                src="@/assets/hotelCategory/Background1.png"
            />
        </q-responsive>
    </template>



    <!-- type2 -->
    <template v-if="props.styleType == '2'">
        <div class="relative z-10  sm:bg-inherit w-full">
            <div class="px-6 sm:px-40 w-[full] min-h-[670px]">
                22222
            </div>



            <img
                class="sm:hidden absolute top-20  right-0 h-[211px] w-[134px]"
                src="@/assets/hotelCategory/icon-type2-right-phone.svg"
            />
            <img
                class="hidden sm:!block absolute top-0 left-1/2 -translate-x-1/2 h-[668px] w-[1835px]"
                src="@/assets/hotelCategory/icon-type2-bg.svg"
            />
            <!-- 
            <img
            class="sm:hidden absolute bottom-0 left-0 h-[165px] w-[70px]"
            src="@/assets/hotelCategory/icon-bg-left-phone.svg"
        /> -->



        </div>

    </template>

    <!-- type3 -->
    <template v-if="props.styleType == '3' || props.styleType == '5'">
        <q-responsive
            :ratio="390 / 53"
            class=" sm:hidden w-full"
        >
            <img src="@/assets/hotelCategory/Background3-phone-top.png" />
        </q-responsive>
        <q-responsive
            :ratio="1921 / 133"
            class=" hidden sm:!block w-full"
        >
            <img src="@/assets/hotelCategory/Background3-top.png" />
        </q-responsive>
        <div class="relative z-10 bg-[#F7EBD3] w-full">
            <!-- 底圖 -->
            <div class="mt-8 sm:mt-16 px-6 sm:px-40  min-h-[670px] ">
                3333
            </div>

        </div>
        <template v-if="props.styleType == '3'">
            <q-responsive
                :ratio="402 / 55"
                class="sm:hidden w-full"
            >

                <img src="@/assets/hotelCategory/Background3-phone-bottom.png" />
            </q-responsive>
            <q-responsive
                :ratio="1921 / 133"
                class=" hidden sm:!block w-full"
            >
                <img src="@/assets/hotelCategory/Background3-bottom.png" />
            </q-responsive>

        </template>


    </template>

    <!-- type4 -->
    <template v-if="props.styleType == '4'">
        <div class="relative z-10 w-full">
            <div class="mt-10 px-6 sm:px-40 w-[full] min-h-[670px]">
                44444
            </div>



            <img
                class="sm:hidden absolute top-20  right-0 h-[211px] w-[134px]"
                src="@/assets/hotelCategory/icon-type2-right-phone.svg"
            />

            <!-- 
            <img
            class="sm:hidden absolute bottom-0 left-0 h-[165px] w-[70px]"
            src="@/assets/hotelCategory/icon-bg-left-phone.svg"
        /> -->
        </div>
        <q-responsive :ratio="402 / 55">
        </q-responsive>
    </template>


</template>

<script setup lang="ts">
import HotelCard from '@/components/HotelCard.vue';

interface Props {
    styleType?: string;
    hotelSubCategoryData?: {
        name: string,
        description: string,
        discountDescription: string,
        hotels: Array<{
            "hotel_id": number,
            "name": string,
            "county": string,
            "area": string,
            "intro": string,
            "original_price": number,
            "lowest_price": number,
            "image": string,
            "images": Array<string>,
            "small_images": Array<string>,
            "facility_tags": Array<{
                "name": string,
                "lang_key": string,
                "class": string,
            }>,

        }>

    }
}
const props = withDefaults(defineProps<Props>(), {
    styleType: '1',
    hotelData: () => ({
        hotelname: '精選飯店｜台北',
        hotelDescription: '全數皆符合【14天前免費取消】政策，三千元內無痛入住飯店！',
        discountDescription: '結帳輸入TBBVIP，即可享...',
        hotels: () => ([
            {
                "hotel_id": 122,
                "name": "雀客旅館台北站前",
                "county": "台北市",
                "area": "中正區",
                "intro": "雀客旅館台北站前位於台北市中心，絕佳的觀光中心點，將旅行的便利最大化。<br />\r\n推開旅館大門，映入眼簾的花磚地板是旅客們最佳打卡位置，房內設計更是我們對於細節的要求，全館採用木質地板讓房內更明亮整潔，豪華房型的陽台更是旅人透透氣的秘密基地。<br />\r\n景觀房的景色更是許多人的首選，大片落地窗，將城市街景盡收眼底，清楚看見台灣博物館的大圓屋頂、土銀展示館的年代建築，讓住宿體驗除了舒適之外，更添增了一抹文化氣息。<br />\r\n我們相信，最好的旅行過程是能讓你更加了解一座城市。位於台北重要地段的雀客旅館台北站前，能夠帶給你的體驗絕對超乎想像。",
                "original_price": 3600,
                "lowest_price": 1680,
                "images": [
                    "https://ota-image.tourbobo.com/image/hotel/122N8yj5plEQXEp5OgwQ3LJ.jpeg?p=ota_hotel_large",
                    "https://ota-image.tourbobo.com/image/hotel/122aNEXVXGgqqP7X0DdnxMf.jpeg?p=ota_hotel_large",
                    "https://ota-image.tourbobo.com/image/hotel/1221wVEgPnWFe5RY9dryzas.jpeg?p=ota_hotel_large",
                    "https://ota-image.tourbobo.com/image/hotel/122qFsvn5rOUOBiQpJv3Z6S.jpeg?p=ota_hotel_large",
                    "https://ota-image.tourbobo.com/image/hotel/122nZ3Ng3XGimC5xfxV8k8F.jpg?p=ota_hotel_large"
                ],

                "small_images": [
                    "https://ota-image.tourbobo.com/image/hotel/122N8yj5plEQXEp5OgwQ3LJ.jpeg?p=ota_hotel",
                    "https://ota-image.tourbobo.com/image/hotel/122aNEXVXGgqqP7X0DdnxMf.jpeg?p=ota_hotel",
                    "https://ota-image.tourbobo.com/image/hotel/1221wVEgPnWFe5RY9dryzas.jpeg?p=ota_hotel",
                    "https://ota-image.tourbobo.com/image/hotel/122qFsvn5rOUOBiQpJv3Z6S.jpeg?p=ota_hotel",
                    "https://ota-image.tourbobo.com/image/hotel/122nZ3Ng3XGimC5xfxV8k8F.jpg?p=ota_hotel"
                ],

                "image": "https://ota-image.tourbobo.com/image/hotel/122N8yj5plEQXEp5OgwQ3LJ.jpeg?p=ota_hotel",
                "facility_tags": [
                    {
                        "name": "有陽台",
                        "lang_key": "facility.balcony",
                        "class": "icon-balcony"
                    },
                    {
                        "name": "可開窗",
                        "lang_key": "facility.window",
                        "class": "icon-window"
                    },
                    {
                        "name": "禁菸飯店",
                        "lang_key": "facility.non-smokinghotel",
                        "class": "icon-non-smokinghotel"
                    }
                ],

            }
        ])
    })
});


</script>

<style scoped>
</style>