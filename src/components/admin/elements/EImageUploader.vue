<template>



    <div>
        <div class="font-bold text-lg mt-6 text-gray-600">{{ props.name }}</div>


        <template v-if="mvalue">
            <div class="relative">

                <q-img :src="mvalue" @error="mvalue=''"  />
                <q-btn
                    @click="removeFile()"
                    round
                    color="red"
                    icon="close"
                    class="absolute -top-1 right-0"
                    size="xs"
                >
                    <q-tooltip>刪除該圖片，重新上傳</q-tooltip>

                </q-btn>

            </div>
        </template>

        <template v-else>
            <q-file
                filled
                v-model="model"
                label="上傳圖片"
                accept="image/*"
            >
                <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                </template>
            </q-file>
        </template>


    </div>







</template>

<script lang="ts">

export default {
    name: 'EImageUploader',
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { QInputProps } from 'quasar'
import { removeStorage, storage } from "@/common/firebase"
import { nanoid } from 'nanoid'
import { last } from 'lodash';
import firebase from 'firebase';
import { useNotify } from '@/composables/notify';

</script>


<script setup lang="ts">

const Notify = useNotify()

const storageRef = storage().ref();
// const imagesRef = storageRef.child('images');

interface Props {
    name: string;
    modelValue: string;
    path?: string;

}
const props = withDefaults(defineProps<Props>(), {
    name: '',
    modelValue: '',
    path: 'images'

});

const emit = defineEmits<{
    (e: 'update:modelValue', value: QInputProps['modelValue']): void;
}>();

//   雙向value
const mvalue = computed({
    get: () => props.modelValue
    ,
    set: (val) => {
        emit("update:modelValue", val);
    }
})
let imagesRef: firebase.storage.Reference | null = null
const convertFile = (file: File,): Promise<string> => {
    return new Promise((resolve, reject) => {
        // let reader = new FileReader()
        // reader.onload = () => { resolve((reader.result) as string) }
        // reader.onerror = () => { reject(reader.error) }
        // reader.readAsDataURL(file)

        // Upload file and metadata to the object 'images/mountains.jpg'
        imagesRef = storageRef.child(props.path + '/' + nanoid() + '.' + last(file.name.split('.')))
        const uploadTask = imagesRef.put(file, {
            contentType: file.type
        })

        uploadTask.on(storage.TaskEvent.STATE_CHANGED, {
            'complete': function () {
                console.log('upload complete!');
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string | PromiseLike<string>) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        });


    })
}
const removeFile = async () => {
    await removeStorage(mvalue.value)
    mvalue.value = ''
    model.value = null
    Notify.handleSuccess('刪除成功')

}
const model = ref<File | null>(null)
watch(() => model.value, async (file: File | null) => {
    console.log(file);
    if (file) { mvalue.value = await convertFile(file) }
})







</script>

<style scoped lang="sass">
</style>
