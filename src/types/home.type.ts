export type BannerListType = {
    image: string;
    smallImage?: string;
    link: string;
}

export type CityType = {
    available: boolean;
    city_id: number;
    city_name: string;
    city_en_name: string;
    image: string;
}

export type AreaType = {
    name: string,
    hotes_id: string[],
}

export type ActivityType = {
    image: string;
    link: string;
    name: string;
}