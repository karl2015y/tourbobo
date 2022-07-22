import { defineStore } from 'pinia'
import { createGlobalState } from '@vueuse/core'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    userName: ''
  })
})

