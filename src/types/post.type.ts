export type PostType = {
    available:boolean;
    isTopPost?:boolean;
    showOnBoard: boolean;
    post_id: string;
    category_id: string;
    category?: string;
    title: string;
    subTitle: string;
    createDate: string;
    content: string;
    image: string;
    note: string;
}

export type PostCategoryType = {
    postCategory_id: string;
    postCategory_name: string;
}