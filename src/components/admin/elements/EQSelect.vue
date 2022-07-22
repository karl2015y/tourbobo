<template>
    <div>

        <div class="flex gap-3 items-center">
            <div class="text-xl font-bold">
                {{ props.name }}

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
            <div v-if="dataArray.length == 0">
                無資料
            </div>

            <draggable
                v-model="dataArray"
                item-key="id"
                handle=".handle"
            >
                <template #item="{ element, index }">
                    <div class="mt-3 flex justify-between shadow p-3 bg-white flex-nowrap">
                        <div class="flex gap-2 flex-1 flex-nowrap">
                            <div class="flex  justify-center items-center">

                                <q-btn
                                    class="handle mr-1"
                                    size="xs"
                                    icon="drag_handle"
                                    round
                                >
                                    <q-tooltip>拖曳移動</q-tooltip>

                                </q-btn>
                                {{ element.id }}.

                            </div>
                            <div class="border-l pl-3 flex flex-col justify-center">
                                <div v-if="props.key1Name">{{ props.key1Label }}：{{ element.key1 ? element.key1 : '無' }}
                                </div>
                                <div v-if="props.key2Name">{{ props.key2Label }}：{{ element.key2 ? element.key2 : '無' }}
                                </div>
                                <div v-if="props.key3Name">{{ props.key3Label }}：{{ element.key3 ? element.key3 : '無' }}
                                </div>
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
                </template>
            </draggable>



        </div>
        <q-dialog v-model="showdForm">
            <q-card style="width: 300px;">
                <q-card-section class="flex items-center">
                    <div class="text-h6">{{ editingdIndex > -1 ? "編輯" : "新增" }}{{ props.name }}</div>
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
                    <div
                        class="px-3 mb-3"
                        v-if="props.key1Name"
                    >
                        <q-input
                            v-model="dataForm.key1"
                            :label="props.key1Label"
                        />
                    </div>
                    <div
                        class="px-3 mb-3"
                        v-if="props.key2Name"
                    >
                        <q-input
                            v-model="dataForm.key2"
                            :label="props.key2Label"
                        />
                    </div>
                    <div
                        class="px-3 mb-3"
                        v-if="props.key3Name"
                    >
                        <q-input
                            v-model="dataForm.key3"
                            :label="props.key3Label"
                        />
                    </div>
                    <div class="flex justify-end">
                        <q-btn
                            v-if="editingdIndex > -1"
                            @click="updated()"
                            :loading="loading"
                            text-color="black"
                            label="更新"
                        />
                        <q-btn
                            v-else
                            @click="created()"
                            :loading="loading"
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
import { useDialog } from '@/composables/dialog';
import { useNotify } from '@/composables/notify';
import { isEmpty } from 'lodash';
import { computed, reactive, ref, watchEffect } from 'vue';
import draggable from 'vuedraggable'

const Dialog = useDialog()
const Notify = useNotify()



interface Props {
    name: string;
    modelValue: Array<any>;
    key1Name?: string;
    key1Label?: string;
    key2Name?: string;
    key2Label?: string;
    key3Name?: string;
    key3Label?: string;
    noId?: boolean;
    returnObjTemp?: { [key: string]: any };
}

const props = defineProps<Props>()
//   雙向value
const emit = defineEmits<{
    (e: 'update:modelValue', value: Array<any>): void;
}>();



const dataArray = computed({
    get: () => {
        return handelGetModelValue(props.modelValue)
    }
    ,
    set: (val) => {
        emit("update:modelValue", handelUpdateModelValue(val));
    }
})



const handelUpdateModelValue = (val: Array<typeof FormDefault>) => {
    return val.map((objs, index) => {
        const _obj: { [key: string]: any } = { id: index + 1 }
        if (props.key1Name) {
            _obj[props.key1Name] = objs.key1;
        }
        if (props.key2Name) {
            _obj[props.key2Name] = objs.key2;
        }
        if (props.key3Name) {
            _obj[props.key3Name] = objs.key3;
        }
        if (props.noId) {
            delete _obj['id']
        }
        if (props.returnObjTemp) {
            if (isEmpty(props.modelValue[index])) {
                return { ...props.returnObjTemp, ..._obj }
            } else {
                return { ...props.modelValue[index], ..._obj }
            }
        }

        return _obj


    })
}
const handelGetModelValue = (val: Array<{ [key: string]: any }>) => {
    return val.map((objs, index) => {
        const _obj: { [key: string]: any } = {}
        if (props.key1Name) _obj[props.key1Name] = "key1";
        if (props.key2Name) _obj[props.key2Name] = "key2";
        if (props.key3Name) _obj[props.key3Name] = "key3";

        const keys: { [key: string]: any } = {}
        Object.keys(objs).forEach(function (key) {
            if (_obj[key]) keys[_obj[key]] = objs[key];
        });


        return <typeof FormDefault>{
            id: objs.id ?? index + 1,
            ...keys
        }
    })
}


const loading = ref(false)



const FormDefault = {
    id: 0,
    key1: '',
    key2: '',
    key3: '',
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
    dataForm.value.id = dataArray.value.length + 1
    dataArray.value.push(dataForm.value)
    saved()
}
const editingdIndex = ref<number>(-1)
const clickEditd = (index: number) => {
    resetdForm(dataArray.value[index])
    editingdIndex.value = index
    showdForm.value = true
}
const updated = () => {
    if (editingdIndex.value > -1) {
        dataArray.value[editingdIndex.value] = JSON.parse(JSON.stringify(dataForm.value))
        saved()
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
        dataArray.value.splice(index, 1)
        saved()

    })
}

const saved = () => {
    dataArray.value = dataArray.value
    showdForm.value = false

}
</script>

<style scoped>
</style>