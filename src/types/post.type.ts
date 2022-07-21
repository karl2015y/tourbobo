export type PostType = {
    post_id: string;
    category_id: string;
    category?: string;
    title: string;
    subTitle: string;
    createDate: string;
    content: string;
    Image: string;
    note: string;
}

export type PostCategoryType = {
    postCategory_id: string;
    postCategory_name: string;
}