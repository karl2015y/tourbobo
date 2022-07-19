<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMainStore } from './stores/main.store';

const store = useMainStore();

// document.title += ` v${import.meta.env.PACKAGE_VERSION}`
document.title = "tourbobo"
</script>

<style lang="sass">

</style>
