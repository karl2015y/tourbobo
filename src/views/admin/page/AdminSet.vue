<template>
    <div class="p-5 bg-grey-1 shadow-md">


        <div class="flex gap-3 items-center">
            <div class="text-xl font-bold">
                管理員列表

            </div>

            <div>
                <q-btn
                    @click="clickCreate()"
                    round
                    color="primary"
                    icon="add"
                    size="sm"
                />
            </div>

        </div>

        <div class=" mt-1 p-3">
            <div v-if="adminArray.length == 0">
                無資料
            </div>

            <div
                v-for="(item, index) in adminArray"
                class="mt-3 flex justify-between shadow p-3 bg-white flex-nowrap"
            >
                <div class="flex gap-2 w-[85%] flex-nowrap">
                    <div>{{ index + 1 }}.</div>
                    <div class="">
                        <div>Email：{{ item.email ? item.email : '無' }}</div>
                        <div>名字：{{ item.name ? item.name : '無' }}</div>
                    </div>

                </div>
                <div class="">
                    <q-btn
                        @click="clickEditd(index)"
                        text-color="black"
                        label="編輯"
                    />
                    <q-btn
                        class="ml-1"
                        @click="deleted(index)"
                        color="negative"
                        text-color="white"
                        label="刪除"
                    />
                </div>
            </div>
        </div>
        <q-dialog v-model="showdForm">
            <q-card style="width: 300px;">
                <q-card-section class="flex items-center">
                    <div class="text-h6">{{ editingdIndex > -1 ? "編輯" : "新增" }}管理員</div>
                    <q-space />
                    <q-btn
                        icon="close"
                        flat
                        round
                        dense
                        v-close-popup
                    />
                </q-card-section>

                <q-card-section>
                    <div class="px-3 mb-3">
                        <q-input
                            v-model="dataForm.email"
                            label="Email"
                            :readonly="editingdIndex > -1"
                        />
                    </div>
                    <div class="px-3 mb-3">
                        <q-input
                            v-model="dataForm.name"
                            label="名字"
                        />
                    </div>
                    <div class="flex justify-end">
                        <q-btn
                            v-if="editingdIndex > -1"
                            @click="updated()"
                            text-color="black"
                            label="更新"
                        />
                        <q-btn
                            v-else
                            @click="created()"
                            text-color="black"
                            label="新增"
                        />


                    </div>

                </q-card-section>

            </q-card>
        </q-dialog>


    </div>
</template>

<script setup lang="ts">
import { db } from '@/common/firebase';
import { useFirestore } from '@vueuse/firebase/useFirestore';
import { ref, watchEffect } from 'vue';
import EQSelect from '@/components/admin/elements/EQSelect.vue';
import { cloneDeep, isEqual } from 'lodash';
import { useDialog } from '@/composables/dialog';
import { useNotify } from '@/composables/notify';
const Dialog = useDialog()
const Notify = useNotify()

const AdminsDB = db().collection('Admin');
const Admins = ref<Array<any>>((useFirestore(AdminsDB)) as any)
const adminArray = ref<Array<any>>([])
watchEffect(() => {
    if (Admins.value) {
        adminArray.value = Admins.value.map(item => ({ email: item.id, ...item }))
    }
})


const FormDefault = {
    email: '',
    name: '',
}

const dataForm = ref(FormDefault)
const resetdForm = (form?: typeof FormDefault) => {
    editingdIndex.value = -1
    if (form) {
        dataForm.value = JSON.parse(JSON.stringify(form))
    } else {
        dataForm.value = JSON.parse(JSON.stringify(FormDefault))
    }
}
const showdForm = ref(false)
const clickCreate = () => {
    resetdForm()
    showdForm.value = true
}

const created = () => {
    AdminsDB.doc(dataForm.value.email).set({ name: dataForm.value.name }).then(() => {
        Notify.handleSuccess("新增成功")
    })

}
const editingdIndex = ref<number>(-1)
const clickEditd = (index: number) => {
    resetdForm(adminArray.value[index])
    editingdIndex.value = index
    showdForm.value = true
}
const updated = () => {
    if (editingdIndex.value > -1) {
        AdminsDB.doc(dataForm.value.email).set({ name: dataForm.value.name }).then(() => {
            Notify.handleSuccess("新增成功")
        })
    }
}

const deleted = (index: number) => {
    console.log('delete index', index);

    Dialog.create({
        title: '刪除確認',
        message: '是否要刪除?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        // dataArray.value.splice(index, 1)
        // saved()
        AdminsDB.doc(adminArray.value[index].email).delete().then(() => {
            Notify.handleSuccess("刪除成功")
        })

    })
}



</script>

<style scoped>
</style>