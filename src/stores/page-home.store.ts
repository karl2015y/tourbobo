import { ActivityType, AreaType, BannerListType, CityType } from '@/types/home.type'
import { defineStore } from 'pinia'

export const usePageHomeStore = defineStore('PageHome', {
    state: () => ({
        bannerList: <BannerListType[]>[],
        activityList: <ActivityType[]>[],
        cities: <CityType[]>[],
        areaArray: <AreaType[]>[],
    }),
    
})