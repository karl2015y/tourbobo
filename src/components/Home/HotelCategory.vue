<template>
    <div class="max-w-[1540px] sm:mx-auto w-full sm:mt-24">
        <div class="relative text-center z-10">

            <div class="text-2xl sm:text-4xl tracking-widest font-bold text-[#2B4162]">特色飯店分類</div>

            <div class=" sm:mt-5 mx-5  select-none	flex justify-center sm:flex-nowrap">

                <template v-for="category in props.hotelCategories">

                    <div class=" m-4">
                        
                        <q-router-link :to="`/hotel-category?category=${category.name}`">

                            <q-responsive
                                class="w-[32vw] min-w-[120px] sm:w-[13.85vw] max-w-[266px] relative"
                                :ratio="1"
                            >
                                <img
                                    class="absolute top-0 left-0 z-10 hover:opacity-100 opacity-0 transition-opacity"
                                    :src="category.hoverImage"
                                >
                                <q-img
                                    class="w-full rounded-full"
                                    :src="category.image"
                                    :ratio="1"
                                />

                            </q-responsive>

                            <div class="text-[#DC492A] text-lg sm:text-xl mt-3 sm:mt-4
                        ">{{ category.name }}</div>
                        </q-router-link>
                    </div>

                </template>

            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    hotelCategories?: Array<{
        name: string,
        image: string,
        hoverImage: string,
    }>;
}
const props = withDefaults(defineProps<Props>(), {
    hotelCategories: () => ([
        {
            name: '悠遊國旅',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%9C%8B%E6%97%85.jpg?alt=media&token=81f13065-a52c-4726-9b85-b0d5ee718344',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%8B%E6%97%85.png?alt=media&token=3209ea29-f78a-4547-98d2-6158a3f8f918'
        },
        {
            name: '品牌連鎖',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%93%81%E7%89%8C%E9%80%A3%E9%8E%96.jpeg?alt=media&token=4384a19e-f40c-4bd3-8330-f98b387a7967',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E9%80%A3%E9%8E%96.png?alt=media&token=4b67f75d-207f-4ea8-aeb3-cbeb2ae13c58'
        },
        {
            name: '人氣民宿',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E4%BA%BA%E6%B0%A3.jpg?alt=media&token=0c18d4db-9e42-4948-af50-9fec9d41b023',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E4%BA%BA%E6%B0%A3%E6%B0%91%E5%AE%BF.png?alt=media&token=0874ade2-5fcb-4855-9e48-ee87d0f2cb1b'
        },
        {
            name: '寵物友善', 
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%AF%B5%E7%89%A9.png?alt=media&token=05d07107-2e40-4688-a26c-f2f578526a34'
        },
        {
            name: '熱銷首選', 
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E7%86%B1%E9%8A%B7.jpg?alt=media&token=92c761d9-fd37-4b09-aa57-facef693eeef',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E7%86%B1%E9%8A%B7.png?alt=media&token=da0de750-3e18-45c5-9734-5b3b114a8172'
        },

    ])
});


</script>

<style scoped >
</style>