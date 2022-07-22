import { defineStore } from 'pinia'

export const usePageContactFormStore = defineStore('PageContactForm', {
    state: () => ({
        contactForm: {
            facebook: '',
            instagram: '',
            line: "",
            message: '',
            phone: '',
            googlePlay: '',
            appStore: '',
        },

    }),

})