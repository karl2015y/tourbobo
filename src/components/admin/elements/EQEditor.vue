<template>
    <div class="flex">
        <div class="font-bold text-lg mt-6 text-gray-600">{{ props.name }}</div>

        <q-toggle
            class="mt-4"
            :model-value="mvalue !== ''"
            @update:model-value="(val) => { mvalue = val ? mvalue === '' ? '<span></span>' : mvalue : '' }"
        />
    </div>

    <q-editor
        v-show="mvalue"
        ref="editorRef"
        :id="QEditId"
        v-model="mvalue"
        :definitions="definitions"
        :toolbar="toolbar"
        :fonts="fonts"
    />
    <br>
    <input
        @change="uploadIt"
        class="hidden"
        type="file"
        :id="`${QEditId}-file-uploader`"
        data-target="file-uploader"
        accept="image/*"
    />

    <!-- 圖片MENU  -->
    <q-menu
        v-if="showImgMenu"
        @show="clickImg"
        touch-position
        :target="imgTarget"
    >
        <q-list>
            <q-item
                v-close-popup
                clickable
            >
                <q-item-section @click="handleImgDelete()">
                    刪除圖片
                </q-item-section>
            </q-item>
        </q-list>
    </q-menu>

    <!-- CSS 編輯器 -->
    <q-dialog v-model="showCssEditDialog">
        <q-card class="p-5">
            <q-card-section>
                <div class="text-h6">CSS 編輯器</div>
            </q-card-section>

            <q-input
                v-model="styleEditText"
                type="textarea"
                autogrow
                hint="輸入css語法"
            />


            <q-card-actions align="right">
                <q-btn
                    @click="setStyle()"
                    flat
                    label="OK"
                    color="primary"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <!-- 顏色選擇器 -->
    <q-dialog v-model="showColorEditDialog">
        <q-card class="p-5">
            <q-card-section>
                <div class="text-h6">顏色選擇器</div>
            </q-card-section>

            <q-color
                v-model="colorEditText"
                class="w-72"
            />

            <q-card-actions align="right">
                <q-btn
                    @click="setEditorTextColor()"
                    flat
                    label="OK"
                    color="primary"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>







</template>

<script lang="ts">

export default {
    name: 'EditorQEditor',
}
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { QEditor, QEditorProps, QInputProps, useQuasar } from 'quasar'
import { useNotify } from '@/composables/notify';
import { nanoid } from 'nanoid'
import { useDialog } from '@/composables/dialog';
import { uploadStorage } from '@/common/firebase';


</script>


<script setup lang="ts">
const editorRef = ref<QEditor | null>(null)
const $q = useQuasar()
const Notify = useNotify()

const Dialog = useDialog()

interface Props {
    name: string;
    modelValue: string;
    canEditProps?: boolean;
    componentProps?: any;
}

const props = withDefaults(defineProps<Props>(), {
    name: '',
    modelValue: '',
    canEditProps: true,
    componentProps: {}
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

// 圖片MENU
const showImgMenu = ref(false)
const imgTarget = ref<HTMLElement>()
const handleImgMenu = async () => {
    console.log('handleImgMenu');
    await nextTick()
    document.querySelectorAll(`div#${QEditId.value}`).forEach(element => {
        if (element.getAttribute('listener') !== 'true') {
            element.setAttribute('listener', 'true');
            element.addEventListener('click', function (e) {
                showImgMenu.value = false;

                const elementClicked = e.target as HTMLInputElement;
                // console.log('click', elementClicked.tagName, elementClicked.className, elementClicked);
                if (elementClicked.tagName == 'IMG' && elementClicked.className == 'QE') {
                    imgTarget.value = elementClicked
                    showImgMenu.value = true;
                }
            });
        }
    })
}
const clickImg = async () => {
    await nextTick()
    const id = imgTarget.value?.id;
    // console.log(id);
    const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLElement
    // console.log(`#${QEditId.value} #${id}`, element);

    styleEditText.value = element.style.cssText
}
// MENU 中的 CSS 編輯器
const showCssEditDialog = ref(false)
const styleEditText = ref('')

const setStyle = () => {
    const id = imgTarget.value?.id;
    const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLElement
    element.style.cssText = styleEditText.value
    mvalue.value = (document.querySelector(`#${QEditId.value} .q-editor__content`) as Element)!.innerHTML
    showCssEditDialog.value = false

}
// MENU 中的 刪除圖片
const handleImgDelete = () => {
    (Dialog.create({
        title: '刪除確認',
        message: '是否要刪除此圖片?',
        cancel: true,
        persistent: true
    })).onOk(() => {
        const id = imgTarget.value?.id;
        const element = document.querySelector(`#${QEditId.value} #${id}`) as HTMLElement
        element.remove()
        mvalue.value = (document.querySelector(`#${QEditId.value} .q-editor__content`) as Element)!.innerHTML
        Notify.handleSuccess("刪除成功")
    })

}




// QEditor 設定
const QEditId = ref(`QEDIT${nanoid()}`)
function convertFile(file: Blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = () => { reject(reader.error) }
        reader.readAsDataURL(file)
    })
}
const uploadIt = async (e?: Event) => {
    if (e?.type == "change") {
        const file = (e.target! as HTMLInputElement).files![0]
        const imgSrc = await uploadStorage("post", file)
        editorRef.value?.runCmd('insertImage', imgSrc)
        const fileUploader = document.querySelector(`#${QEditId.value}-file-uploader`)! as HTMLElement
        if (fileUploader) (fileUploader as HTMLInputElement).value = "";
    } else {
        const fileUploader = document.querySelector(`#${QEditId.value}-file-uploader`)! as HTMLElement
        if (fileUploader) fileUploader.click()
    }

}

const uploadYoutube = () => {
    Dialog.create({
        title: '嵌入影片',
        message: '選擇一個 Youtube 影片，點擊「分享」→「嵌入」，複製右方程式碼',
        prompt: {
            model: '',
            type: 'textarea' // optional
        },
        cancel: true,
        persistent: true
    }).onOk(data => {
        mvalue.value += data
        Notify.handleSuccess("嵌入成功")

    })
}


const showColorEditDialog = ref(false)
const colorEditText = ref('')
const setEditorTextColor = () => {
    showColorEditDialog.value = false
}
const definitions = ref<any>({
    upload: {
        tip: '上傳圖片',
        icon: 'file_upload',
        label: '上傳圖片',
        handler: uploadIt
    },
    uploadYoutube: {
        tip: '嵌入影片',
        icon: 'movie',
        label: '嵌入影片',
        handler: uploadYoutube
    },
    pickColor: {
        tip: '顏色選擇器',
        icon: 'color_lens',
        label: '顏色選擇器',
        handler: () => {
            showColorEditDialog.value = true
        }
    },
    handelTextColor: {
        tip: '字體上色',
        icon: 'brush',
        label: '字體上色',
        handler: () => {
            editorRef.value?.runCmd('ForeColor', colorEditText.value)

        }
    },
    handelBGColor: {
        tip: '背景上色',
        icon: 'format_paint',
        label: '背景上色',
        handler: () => {
            editorRef.value?.runCmd('backColor', colorEditText.value)

        }
    }

})
const toolbar = ref([
    ['viewsource'],

    [
        {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
        }
    ],
    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
    ['token', 'hr', 'link', 'custom_btn'],
    ['print', 'fullscreen'],
    [
        {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'code'
            ]
        },
        {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
            ]
        },
        {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana'
            ]
        },
        'removeFormat',

    ],
    ['pickColor', 'handelTextColor', 'handelBGColor'],
    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

    ['undo', 'redo'],
    ['upload', 'uploadYoutube'],
])

const fonts = ref({
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
})




onMounted(() => {
    handleImgMenu()
})

</script>

<style scoped >
:deep() .q-editor__content a {
    @apply text-[#00A29A] cursor-pointer hover:text-[#06b8b0]
}

:deep() .q-editor__content ul {
    padding: revert;
    @apply list-disc
}
:deep() .q-editor__content ul li {
    @apply list-disc
}

:deep() .q-editor__content ol {
    list-style-type: decimal;
    padding: revert;
}
:deep() .q-editor__content ol li {
    list-style-type: decimal;
}

:deep() .q-editor__content blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
}

:deep() .q-editor__content blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
}


:deep() .q-editor__content h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
}

:deep() .q-editor__content h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;

}

:deep() .q-editor__content h3 {
    font-size: 1.5rem;
    line-height: 2rem;
}

:deep() .q-editor__content h4 {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

:deep() .q-editor__content h5 {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

:deep() .q-editor__content h6 {
    font-size: 0.75rem;
    line-height: 1rem;
}

:deep() .q-editor__content pre {
    overflow: auto;
}

:deep() .q-editor__content pre>code {
    display: block;
    padding: 1rem;
    word-wrap: normal;
}
</style>
