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
    >
        <template v-slot:fontInfo>
            <div v-if="selectedElement && selectedElement.style">

                <span v-if="selectedElement.style.lineHeight">
                    文字高度：{{ selectedElement.style.lineHeight }}
                </span>
                <span v-else-if="selectedElement.parentElement && selectedElement.parentElement.style.lineHeight">
                    文字高度：{{ selectedElement.parentElement.style.lineHeight }}
                </span>
                <span v-if="selectedElement.style.fontWeight">
                    文字粗度：{{ selectedElement.style.fontWeight }}
                </span>
                <span v-else-if="selectedElement.parentElement && selectedElement.parentElement.style.fontWeight">
                    文字粗度：{{ selectedElement.parentElement.style.fontWeight }}
                </span>
            </div>
        </template>

    </q-editor>



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

            <q-btn
                label="透明色"
                @click="colorEditText = 'initial'"
                class="mb-2"
            />

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


    <!-- 插入按鈕 -->
    <q-dialog v-model="showBtnAddDialog">
        <q-card class="p-5 w-64">
            <q-card-section>
                <div class="text-h6">插入按鈕</div>
            </q-card-section>

            <q-input
                label="連結"
                v-model="postBtnParam.link"
            />
             <q-input
                label="文字"
                v-model="postBtnParam.text"
            />

            <q-input
                label="距離上面(px)"
                v-model="postBtnParam.topMargin"
            />
             <q-input
                label="距離下面(px)"
                v-model="postBtnParam.bottomMargin"
            />
             <q-input
                label="距離左邊(px)"
                v-model="postBtnParam.leftMargin"
            />
            <q-card-actions align="right">
                <q-btn
                    @click="showBtnAddDialog=false"
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
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import { QEditor, QEditorProps, QInputProps, useQuasar } from 'quasar'
import { useNotify } from '@/composables/notify';
import { nanoid } from 'nanoid'
import { useDialog } from '@/composables/dialog';
import { uploadStorage } from '@/common/firebase';
import { useTextSelection } from '@vueuse/core';
import { keys } from 'lodash';
import { ElementNode } from '@vue/compiler-core';


</script>


<script setup lang="ts">
const textSelection = useTextSelection()
const selectedText = ref('')
const selectedElement = ref()
watchEffect(() => {
    selectedElement.value = textSelection.selection.value?.focusNode?.parentElement
    if (textSelection.text.value.length > 0) {
        selectedText.value = textSelection.text.value
    }
})

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

const showBtnAddDialog = ref(false);
const postBtnParam = ref({
    topMargin: 20,
    bottomMargin: 20,
    leftMargin: 55,
    text: '按鈕文字',
    link: 'https://'
})

const handelLineHeightFunction = (lineHeight: string) => {
    const element = window.getSelection()?.focusNode?.parentElement
    if (element) {
        element.style.lineHeight = lineHeight
        const editorElement = editorRef.value?.$el.querySelector('.q-editor__content')
        if (editorElement && editorElement.innerHTML) {
            mvalue.value = editorElement.innerHTML
        }
    }
}

const handelLineHeight = {
    lightHeight10: {
        tip: '行距1',
        handler: () => {
            handelLineHeightFunction("1")

        }
    },
    lightHeight15: {
        tip: '行距1.5',
        handler: () => {
            handelLineHeightFunction("1.5")

        }
    },
    lightHeight20: {
        tip: '行距2',
        handler: () => {
            handelLineHeightFunction("2")

        }
    },
    lightHeight25: {
        tip: '行距2.5',
        handler: () => {
            handelLineHeightFunction("2.5")

        }
    },
    lightHeight30: {
        tip: '行距3',
        handler: () => {
            handelLineHeightFunction("3")

        }
    },
    lightHeight35: {
        tip: '行距3.5',
        handler: () => {
            handelLineHeightFunction("3.5")

        }
    },
    lightHeight40: {
        tip: '行距4',
        handler: () => {
            handelLineHeightFunction("4")

        }
    },
    lightHeight45: {
        tip: '行距4.5',
        handler: () => {
            handelLineHeightFunction("4.5")

        }
    },
    lightHeight50: {
        tip: '行距5',
        handler: () => {
            handelLineHeightFunction("5")

        }
    },
    lightHeight55: {
        tip: '行距5.5',
        handler: () => {
            handelLineHeightFunction("5.5")

        }
    },
    lightHeight60: {
        tip: '行距6',
        handler: () => {
            handelLineHeightFunction("6")

        }
    },
    lightHeight65: {
        tip: '行距6.5',
        handler: () => {
            handelLineHeightFunction("6.5")

        }
    },
    lightHeight70: {
        tip: '行距7',
        handler: () => {
            handelLineHeightFunction("7")

        }
    },
    lightHeight75: {
        tip: '行距7.5',
        handler: () => {
            handelLineHeightFunction("7.5")

        }
    },
    lightHeight80: {
        tip: '行距8',
        handler: () => {
            handelLineHeightFunction("8")

        }
    },
    lightHeight85: {
        tip: '行距8.5',
        handler: () => {
            handelLineHeightFunction("8.5")

        }
    },
    lightHeight90: {
        tip: '行距9',
        handler: () => {
            handelLineHeightFunction("9")

        }
    },
    lightHeight95: {
        tip: '行距9.5',
        handler: () => {
            handelLineHeightFunction("9.5")

        }
    },
    lightHeight100: {
        tip: '行距10',
        handler: () => {
            handelLineHeightFunction("10")

        }
    },
}
const handelFontWeightFunction = (fontWeight: string) => {
    const element = window.getSelection()?.focusNode?.parentElement
    if (element) {
        element.style.fontWeight = fontWeight
        const editorElement = editorRef.value?.$el.querySelector('.q-editor__content')
        if (editorElement && editorElement.innerHTML) {
            mvalue.value = editorElement.innerHTML
        }
    }
}
const handelFontWeight = {
    fontWeight100: {
        tip: '字體粗細 100',
        handler: () => {
            handelFontWeightFunction('100')
        }
    },
    fontWeight200: {
        tip: '字體粗細 200',
        handler: () => {
            handelFontWeightFunction('200')

        }
    },
    fontWeight300: {
        tip: '字體粗細 300',
        handler: () => {
            handelFontWeightFunction('300')

        }
    },
    fontWeight400: {
        tip: '字體粗細 400',
        handler: () => {
            handelFontWeightFunction('400')

        }
    },
    fontWeight500: {
        tip: '字體粗細 500',
        handler: () => {
            handelFontWeightFunction('500')

        }
    },
    fontWeight600: {
        tip: '字體粗細 600',
        handler: () => {
            handelFontWeightFunction('600')

        }
    },
    fontWeight700: {
        tip: '字體粗細 700',
        handler: () => {
            handelFontWeightFunction('700')

        }
    },
    fontWeight800: {
        tip: '字體粗細 800',
        handler: () => {
            handelFontWeightFunction('800')

        }
    },
    fontWeight900: {
        tip: '字體粗細 900',
        handler: () => {
            handelFontWeightFunction('900')

        }
    },
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
            if (colorEditText.value == 'initial') {
                editorRef.value?.runCmd('ForeColor', '#000000')

            } else {
                editorRef.value?.runCmd('ForeColor', colorEditText.value)
            }

        }
    },
    handelBGColor: {
        tip: '背景上色',
        icon: 'format_paint',
        label: '背景上色',
        handler: () => {
            editorRef.value?.runCmd('backColor', colorEditText.value)

        }
    },
    handelPostBtn: {
        tip: '設定按鈕',
        label: '設定按鈕',
        handler: () => {
            showBtnAddDialog.value = true;
        }
    },
    handelInserPostBtn: {
        tip: '插入按鈕',
        label: '插入按鈕',
        handler: () => {
            editorRef.value?.runCmd('insertHTML', `
             <a
            href="${postBtnParam.value.link}"
            style="margin-top: ${postBtnParam.value.topMargin}px; margin-bottom: ${postBtnParam.value.bottomMargin}px; margin-left: ${postBtnParam.value.leftMargin}px;"
            class="post-btn">
            <div>${postBtnParam.value.text}</div>
        </a> 
            `)
        }
    },
    ...handelLineHeight,
    ...handelFontWeight


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
    ['token', 'hr', 'link', 'custom_btn', 'handelPostBtn', 'handelInserPostBtn'],
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
            label: '行距',
            icon: 'height',
            options: keys(handelLineHeight)
        },
        {
            label: '字體粗細',
            icon: 'format_bold',
            options: keys(handelFontWeight)
        },

        'fontInfo',

        {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
                'default_font',
                'noto_serif_tc',
                'noto_sans_tc',
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
    noto_sans_tc: 'Noto Sans TC',
    noto_serif_tc: 'Noto Serif TC',
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

<style>
</style>
<style scoped >
:deep() .post-btn {
    @apply block whitespace-nowrap hover:drop-shadow-xl;
}

:deep() .post-btn div {
    @apply inline-block bg-[#FF5F00] text-white text-xl font-bold pl-3 pr-8 py-2 [clip-path:polygon(0%_0%,calc(100%_-_30px)_0%,calc(100%_-_10px)_50%,calc(100%_-_30px)_100%,0%_100%)]
}

:deep() .q-editor__content a {
    @apply text-[#ff5f00] cursor-pointer
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
    content: ',,';
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: 0.2em;
    letter-spacing: -6px;
    font-family: Arial, Helvetica, sans-serif;

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
