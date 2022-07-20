<template>
    <a
        v-if="isOutSideLink"
        :href="props.to"
        target="_blank"
    >
        <slot></slot>
    </a>
    <router-link
        v-else
        :to="props.to"
    >
        <slot></slot>
    </router-link>
</template>

<script setup lang="ts">
import { isString } from 'lodash';
import { computed } from 'vue';

interface Props {
    to?: any;
}
const props = withDefaults(defineProps<Props>(), {
    to: '/',
});
const isOutSideLink = computed(() => (isString(props.to) && props.to.indexOf('http') > -1))
</script>

<style scoped>
</style>