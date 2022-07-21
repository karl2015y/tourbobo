<template>
    <user-header />
    <post-list
        :postCategory="postCategory"
        :postArray="postArray"
    />
    <user-footer />

</template>

<script setup lang="ts">
import UserHeader from '@/components/Header.vue';
import UserFooter from '@/components/Footer.vue';
import PostList from '../components/Post/PostList.vue';
import { ref } from 'vue';
const postCategory = ref([
    {
        postCategory_id: "1",
        postCategory_name: "最新消息"
    },
    {
        postCategory_id: "2",
        postCategory_name: "優惠資訊"
    },

])

const postArray = ref([
    {
        post_id: '123',
        category_id: '1',
        title: 'QQ國旅補助最高折助最高折抵1300！',
        subTitle: '優惠活動開跑啦！暑假就訂tourbobo一起出去玩！',
        createDate: '2022/07/15',
        content: '很多內1容',
        Image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
        note: '＊所有活動皆為限時限量活動，如取消後恕不保留資格＊tourbobo 主辦單位保有最終修改、變更、活動解釋及取消本活動之權利，如有任何變更內容或詳細注意事項將公布於本活動辦法中，恕不另行通知。＊優惠活動（學生個人專屬方案、台新、防疫計程車千元補助、KKBOX滿額贈等）請擇一使用，恕無法併行！'
    },
    {
        post_id: 'asd',
        category_id: '2',
        title: 'AA國旅補助最高折助最高折抵1300！',
        subTitle: '優惠活動開跑啦！暑假就訂tourbobo一起出去玩！',
        createDate: '2022/07/15',
        content: '很多內容',
        Image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
        note: '＊所有活動皆為限時限量活動，如取消後恕不保留資格＊tourbobo 主辦單位保有最終修改、變更、活動解釋及取消本活動之權利，如有任何變更內容或詳細注意事項將公布於本活動辦法中，恕不另行通知。＊優惠活動（學生個人專屬方案、台新、防疫計程車千元補助、KKBOX滿額贈等）請擇一使用，恕無法併行！'
    },
    {
        post_id: 'qwe',
        category_id: '1',
        title: 'ZZ國旅補助最高折助最高折抵1300！',
        subTitle: '優惠活動開跑啦！暑假就訂tourbobo一起出去玩！',
        createDate: '2022/07/15',
        content: '很多內容',
        Image: 'https://firebasestorage.googleapis.com/v0/b/outsource-1c28f.appspot.com/o/tbb%2Factivity%2F0712%20tbb_%E4%B8%80%E8%88%AC%E8%A8%82%E6%88%BF%E6%B4%BB%E5%8B%95banner.png?alt=media&token=0ae70681-7ce4-4791-a93c-f15f2c9e34c3',
        note: '＊所有活動皆為限時限量活動，如取消後恕不保留資格＊tourbobo 主辦單位保有最終修改、變更、活動解釋及取消本活動之權利，如有任何變更內容或詳細注意事項將公布於本活動辦法中，恕不另行通知。＊優惠活動（學生個人專屬方案、台新、防疫計程車千元補助、KKBOX滿額贈等）請擇一使用，恕無法併行！'
    },
])
</script>

<style scoped>
</style>