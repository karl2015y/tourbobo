<template>
    <div class="">
        <div class="max-w-[1920px] mx-auto ">
            <user-header />
        </div>
        <div class="h-[150vh] bg-emerald-500">
            home

        </div>
        <user-footer />

    </div>


</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
</script>

<style scoped>
</style>