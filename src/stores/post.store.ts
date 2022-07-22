import { PostType, PostCategoryType } from '@/types/post.type'
import { defineStore } from 'pinia'


const getPost = (postArray: Array<PostType>, id: string) => {
    return postArray.find(((post: PostType) => (post.post_id == id)))
}
const getCategoryPosts = (postArray: Array<PostType>, category_id: string) => {
    return postArray.filter(((post: PostType) => (post.category_id === category_id)))
}



export const usePostStore = defineStore('post', {
    state: () => ({
        postCategoryArray: <Array<PostCategoryType>>[],
        postArray: <Array<PostType>>[]
    }),
    getters: {
        postsByCategory: (state) => {
            return (category_id: string) => {
                if (category_id) {
                    return getCategoryPosts(state.postArray, category_id)
                }
                return state.postArray
            }
        },

        postById: (state) => {
            return (post_id: string) => {
                if (post_id) {
                    return getPost(state.postArray, post_id)
                }
                return {} as PostType
            }
        },

    }
})