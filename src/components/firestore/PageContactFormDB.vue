<template>
    <div class="hidden">PAGECONTACTFORMDB</div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { usePageContactFormStore } from '@/stores/page-contactForm.store';
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { ref, watchEffect } from 'vue';



const pageContactStore = usePageContactFormStore()
const pageContactDB = db().collection('Sites/travel-tbb/Pages').doc('Contact');
const pageContactData = ref<{
    contactForm: {
        facebook: string;
        instagram: string;
        line: string;
        message: string;
        phone: string;
        googlePlay: string;
        appStore: string;
    }
}>((useFirestore(pageContactDB)) as any)
watchEffect(() => {
    if (pageContactData.value) {
        pageContactStore.contactForm = pageContactData.value.contactForm;
    }
})

</script>

<style scoped>
</style>