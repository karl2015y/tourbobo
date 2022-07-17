<template>
    <user-header />
    <category-select />

    <category-list />
    <user-footer styleType="3" />

</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import CategorySelect from '@/components/HotelCategory/CategorySelect.vue';
import CategoryList from '@/components/HotelCategory/CategoryList.vue';
</script>

<style scoped>
</style>