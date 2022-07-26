<template>
    <div class="max-w-[1540px] sm:mx-auto w-full sm:mt-24">
        <div class="relative text-center z-10">

            <div class="text-xl sm:text-4xl tracking-widest font-bold text-[#2B4162]">特色飯店分類</div>

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

                            <div class="text-[#DC492A] text-lg sm:text-[28px] mt-3 sm:mt-7
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
const props = defineProps<Props>()


</script>

<style scoped >
</style>