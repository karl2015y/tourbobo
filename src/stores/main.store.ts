import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    footer: {
      zIndex:0,
      styleType:"2"
    }
  })
})