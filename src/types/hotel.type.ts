

export type HotelCategorySubCategoryHotelsWithTagsType = {
    hotel_id: string;
    tags: string[];
}

export type HotelCategorySubCategoryType = {
    order: string;
    name: string;
    description: string;
    discountDescription: string;
    hotels: HotelCategorySubCategoryHotelsWithTagsType[]
}

export type HotelCategoryType = {
    name: string;
    title: string;
    subTitle: string;
    image: string;
    smallImage?: string;
    hoverImage: string;
    subCategoryData: HotelCategorySubCategoryType[]
}


