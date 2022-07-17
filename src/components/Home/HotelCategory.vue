<template>
    <div class="w-full sm:mt-24">
        <div class="relative text-center z-10">

            <div class="text-2xl sm:text-4xl tracking-widest font-bold text-[#2B4162]">特色飯店分類</div>

            <div class=" sm:mt-5 mx-5 sm:mx-28 select-none	flex justify-center sm:flex-nowrap">

                <template v-for="category in props.hotelCategories">

                    <div class=" m-4">
                        <a :href="`/hotel-category?category=${category.name}`">

                            <q-responsive
                                class="w-[32vw] min-w-[120px] sm:w-[13.85vw] max-w-[266] relative"
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
                        </a>
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
        category_id: number,
        name: string,
        image: string,
        hoverImage: string,
    }>;
}
const props = withDefaults(defineProps<Props>(), {
    hotelCategories: () => ([
        {
            category_id: 1,
            name: '寵物友善',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E5%AF%B5%E7%89%A9%E5%8F%8B%E5%96%84.jpg?alt=media&token=91a9a615-928d-4460-b787-f78c73cc804e',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%96%E5%B1%A4%202.png?alt=media&token=73bada2f-1328-45d2-8d17-ee9b85c6c430'
        },
        {
            category_id: 2,
            name: '露營專區',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E9%9C%B2%E7%87%9F%E5%B0%88%E5%8D%80.jpg?alt=media&token=1c086786-5959-4c50-8e28-5f99c9418bb9',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%96%E5%B1%A4%202-1.png?alt=media&token=5d28d0c3-f70a-464c-9462-e44c2efbf588'
        },
        {
            category_id: 3,
            name: '親子友善',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E8%A6%AA%E5%AD%90%E5%8F%8B%E5%96%84.jpg?alt=media&token=fee46498-ea47-4ec4-9f09-98728a25ec3e',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%96%E5%B1%A4%202-3.png?alt=media&token=2e367a42-73dc-4738-bf05-84b4e48b352c'
        },
        {
            category_id: 4,
            name: '包棟民宿',
            image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2F%E6%B0%91%E5%AE%BF.jpg?alt=media&token=82df409e-e1ad-4223-948b-cf258d832b24',
            hoverImage: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2FhotelCategory%2Ficon%2F%E5%9C%96%E5%B1%A4%202-2.png?alt=media&token=f93da37a-1042-41f5-87e5-b2a75b1a93db'
        },

    ])
});


</script>

<style scoped >
</style>