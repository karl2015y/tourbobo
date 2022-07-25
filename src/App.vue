<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMainStore } from './stores/main.store';

const store = useMainStore();

// document.title += ` v${import.meta.env.PACKAGE_VERSION}`
document.title = "tourbobo"
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap');

</style>
