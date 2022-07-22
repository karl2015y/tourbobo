import { HotelCategoryType } from '@/types/hotel.type'
import { defineStore } from 'pinia'

export const usePageHotelCategoryStore = defineStore('PageHotelCategory', {
    state: () => ({
        hotelCategoryData: <HotelCategoryType[]>[],
    }),
    
})