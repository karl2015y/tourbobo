<template>
    <user-header />
    <category-select />
    <category-item styleType="1" />
    <category-item styleType="2" />
    <category-item styleType="3" />
    <category-item styleType="4" />

    <category-item styleType="3" />
    <category-item styleType="4" />

    <category-item styleType="5" isLast />

    <user-footer styleType="3" />

</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import CategoryItem from '@/components/HotelCategory/CategoryItem.vue';
import CategorySelect from '@/components/HotelCategory/CategorySelect.vue';
</script>

<style scoped>
</style>