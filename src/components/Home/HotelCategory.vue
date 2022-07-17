<template>
    <div class="w-full sm:mt-24">
        <div class="relative text-center z-10">

            <div class="text-2xl sm:text-4xl tracking-widest font-bold text-[#2B4162]">特色飯店分類</div>

            <div class=" sm:mt-5 mx-5 sm:mx-28 select-none	flex justify-center sm:flex-nowrap">

                <template v-for="category in props.hotelCategories">

                    <div class=" m-4">
                        <a href="">

                            <q-responsive
                                class="w-[32vw] min-w-[120px] sm:w-[13.85vw] max-w-[266] relative"
                                :ratio="1"
                            >
                                <img
                                    class="absolute top-0 left-0 z-10 hover:opacity-100 opacity-0 transition-opacity"
                                    :src="category.hoverImage"
                                >
                                <q-img
                                    class="w-full"
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
            image: 'https://upload.cc/i1/2022/07/13/JC0Aa8.png',
            hoverImage: 'https://upload.cc/i1/2022/07/17/3m50IK.png'
        },
        {
            category_id: 2,
            name: '露營專區',
            image: 'https://upload.cc/i1/2022/07/13/JC0Aa8.png',
            hoverImage: 'https://upload.cc/i1/2022/07/17/3m50IK.png'
        },
        {
            category_id: 3,
            name: '親子友善',
            image: 'https://upload.cc/i1/2022/07/13/JC0Aa8.png',
            hoverImage: 'https://upload.cc/i1/2022/07/17/3m50IK.png'
        },
        {
            category_id: 4,
            name: '包棟民宿',
            image: 'https://upload.cc/i1/2022/07/13/JC0Aa8.png',
            hoverImage: 'https://upload.cc/i1/2022/07/17/3m50IK.png'
        },

    ])
});


</script>

<style scoped >
</style>