<template>
  <PageContactFormDB />
  <PageHotelCategoryDB />
  <PostDB />
  <div class="max-w-[1920px] min-w-[375px] mx-auto ">
    <section
      ref="header"
      class="header fixed z-20 bg-white w-full top-0 left-0 "
    >

      <q-responsive :ratio="$q.screen.lt.sm ? 375 / 60 : 1920 / 80">
        <div class="max-w-[1920px] mx-auto px-4 h-full sm:px-14 flex flex-nowrap justify-between items-center gap-8">
          <q-router-link to="/home">
            <q-img
              class="min-w-[100px] w-[40.5vw] sm:w-[12vw] max-w-[230px]"
              src="@/assets/logo-big.png"
              :ratio="230 / 47"
            />
          </q-router-link>

          <div>
            <ul class="hidden sm:!flex ">
              <template v-for="link in menuLinks">
                <li class="sm:pl-3 md:pl-12 relative text-lg">

                  <q-router-link :to="link.link">
                    {{ link.text }}
                  </q-router-link>


                  <template v-if="link.childrenMenuLinks">
                    <ul class="subMenuArea absolute left-6 min-w-[220px] bg-white">
                      <template v-for="subLink, index in link.childrenMenuLinks">
                        <li
                          :class="{ 'border-t': index == 0, 'border-b': index == link.childrenMenuLinks.length - 1 }"
                          class="bg-gray-50  hover:bg-[#F4AA00] border-x"
                        >
                          <q-router-link
                            :to="subLink.link"
                            class="p-4 block"
                          >
                            {{ subLink.text }}
                          </q-router-link>


                        </li>
                      </template>
                    </ul>
                  </template>

                </li>
              </template>

            </ul>
            <button
              @click="showPhoneMenu = true"
              class="sm:hidden"
            >
              <img
                src="@/assets/HeaderPhoneMenuBtn.svg"
                alt=""
              >
            </button>
          </div>
        </div>
      </q-responsive>


    </section>
    <div
      v-if="headerSize"
      :style="`height:${headerSize.height.value}px;width:100px `"
      id="top"
    >
    </div>
    <!-- 手機板 -->
    <q-dialog
      v-if="$q.screen.lt.sm"
      v-model="showPhoneMenu"
      position="right"
      :maximized="true"
    >
      <q-card class="!w-screen h-screen min-w-[375px] flex flex-col flex-nowrap">

        <div>
          <q-responsive :ratio="375 / 75">
            <div class="px-3.5 w-full h-full bg-[#00586E] relative flex items-center">
              <button
                @click="showPhoneMenu = false"
                class="rotate-0"
              >
                <img
                  class="animate__rotateIn animate__animated 	"
                  src="@/assets/arrow-left.svg"
                >
              </button>
              <q-router-link
                to="/"
                class="absolute left-1/2 -translate-x-1/2"
              >
                <img
                  class="h-[35px] w-[129px]"
                  src="@/assets/logo-letter.png"
                >
              </q-router-link>
            </div>
          </q-responsive>

          <div class="select-none	">
            <ul>
              <template v-for="(link, index) in menuLinks">
                <li class="mt-8 mb-8 text-center">

                  <template v-if="link.childrenMenuLinks">
                    <div
                      class="cursor-pointer	"
                      @click="clickPhoneSubMenu(`${link.text}${index}`)"
                    >
                      <span class="border-b border-black pb-1 text-lg">
                        {{ link.text }}
                      </span>
                    </div>

                    <q-slide-transition>
                      <ul
                        v-show="focusPhoneSubMenu == `${link.text}${index}`"
                        class="phone-sub-menu-area mt-2 bg-white"
                      >
                        <template v-for="subLink, index in link.childrenMenuLinks">
                          <li
                            :class="{ 'border-t': index == 0, 'border-b': index == link.childrenMenuLinks.length - 1 }"
                            class="bg-gray-50 border-t"
                          >
                            <q-router-link
                              :to="subLink.link"
                              class="p-4 block text-center"
                            >
                              {{ subLink.text }}
                            </q-router-link>

                          </li>
                        </template>
                      </ul>
                    </q-slide-transition>


                  </template>
                  <template v-else>
                    <q-router-link
                      :to="link.link"
                      class="border-b border-black pb-1 text-lg"
                    >
                      {{ link.text }}
                    </q-router-link>
                  </template>
                </li>
              </template>
            </ul>
          </div>
        </div>

        <div class="font-bold mt-auto ">
          <div class="flex justify-center items-center">
            <q-icon
              name="person_outline"
              size="1.5rem"
              class="-mt-1 mr-2"
            />

            <q-router-link
              to=""
              class="text-lg"
            >登入</q-router-link>

            <span class="block mx-1">/</span>

            <q-router-link
              to=""
              class="text-lg"
            >註冊</q-router-link>

          </div>

          <div class="mt-4 bg-[#F6AC00] hover:bg-[#f9b10b]  rounded-3xl w-[318px] mx-auto text-white text-center">

            <q-router-link
              to=""
              class="p-1.5 font-bold block tracking-[.2em]"
            >
              登入tourbobo訂房即可領取專屬優惠！
            </q-router-link>
          </div>

          <div class="mt-4 mb-8 mx-auto flex  justify-center items-center">
            <q-router-link
              :to="link.facebook"
              class="mr-6"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8341 0.5169C20.3206 0.143872 19.7324 0.00415315 19.114 0.00339803C13.7099 -0.00113268 8.30616 -0.00113268 2.90262 0.00339803C1.25423 0.00339803 0.293724 1.09757 0.0815389 2.25441C0.0551102 2.39939 0.0271838 2.54439 0 2.68938V19.2891C0.0347349 19.4688 0.0671956 19.6485 0.104196 19.8283C0.227548 20.3911 0.527482 20.8997 0.960253 21.2801C1.39302 21.6604 1.936 21.8925 2.50997 21.9426C2.57841 21.955 2.64543 21.9743 2.71007 22H11.0117C11.0041 21.9079 10.9913 21.8157 10.9913 21.7236C10.9913 19.3948 10.9913 17.0658 10.9913 14.7365C10.9913 14.4526 10.9913 14.4526 10.7074 14.4526H8.25783V10.979C8.33334 10.9753 8.4149 10.9685 8.49721 10.9685C9.22815 10.9685 9.95809 10.9685 10.687 10.9685C10.9891 10.9685 10.9891 10.9685 10.9891 10.6777C10.9891 9.8252 10.9891 8.97268 10.9891 8.1194C10.9928 6.1644 12.5582 4.38385 14.498 4.13088C14.6964 4.10498 14.8961 4.09108 15.0961 4.08933C15.9418 4.0848 16.7875 4.08933 17.6332 4.08933H17.899V7.57194C17.7178 7.57194 17.5487 7.57194 17.3788 7.57194C16.8706 7.58176 16.3609 7.57196 15.855 7.61047C15.3264 7.64898 15.1814 7.79094 15.1678 8.31876C15.1459 9.14939 15.1625 9.98002 15.1595 10.8107C15.1595 10.9745 15.2652 10.9685 15.3777 10.9685C16.3594 10.9685 17.341 10.9685 18.3226 10.9685H18.6066C18.5748 11.0704 18.559 11.1384 18.531 11.2026C18.1278 12.2129 17.7186 13.2225 17.3229 14.2359C17.2572 14.4035 17.1681 14.4586 16.9906 14.4548C16.4681 14.4435 15.9441 14.4594 15.4215 14.4465C15.2139 14.4412 15.1535 14.5055 15.1535 14.7131C15.16 17.0494 15.16 19.3858 15.1535 21.7221C15.1535 21.8142 15.1399 21.9064 15.1331 21.9985H19.305C19.4779 21.9645 19.6516 21.932 19.8238 21.8973C20.3984 21.7802 20.9187 21.478 21.3051 21.0369C21.6915 20.5958 21.9226 20.0402 21.963 19.4552C21.9857 19.1207 22 18.7839 22 18.4479C22 13.2814 22 8.11514 22 2.94913C22.0008 1.9554 21.6625 1.11948 20.8341 0.5169Z"
                  fill="black"
                />
              </svg>

            </q-router-link>

            <q-router-link
              class="mr-6"
              :to="link.line"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2233 8.70126C13.0393 8.6952 12.903 8.83607 12.9007 9.05416C12.8954 9.49943 12.8909 10.7057 12.8909 10.7057C12.8909 10.7057 11.8958 9.43959 11.5006 8.92844C11.3953 8.79289 11.2885 8.63842 11.078 8.71491C10.8675 8.79139 10.8357 8.95115 10.8364 9.14804C10.8417 9.95982 10.8364 10.7716 10.8364 11.5841C10.8364 11.8416 10.9644 12.0112 11.1575 12.0165C11.3506 12.0218 11.4922 11.8446 11.493 11.575C11.493 11.1442 11.493 10.0136 11.493 10.0136C11.493 10.0136 12.516 11.3267 12.9378 11.8439C12.979 11.8936 13.0317 11.9323 13.0915 11.9566C13.1512 11.9809 13.216 11.99 13.2801 11.9832C13.4467 11.9726 13.527 11.8318 13.5262 11.6584C13.5262 10.789 13.5262 9.91667 13.5262 9.04961C13.527 8.84136 13.402 8.70732 13.2233 8.70126Z"
                  fill="black"
                />
                <path
                  d="M8.83352 11.3629C8.56773 11.3629 8.30344 11.3515 8.03688 11.3629C7.84681 11.3727 7.78699 11.3061 7.79002 11.1175C7.79835 10.4428 7.7938 9.76809 7.79002 9.09337C7.79002 8.84044 7.67038 8.6905 7.47652 8.68823C7.28266 8.68595 7.15923 8.83966 7.15696 9.08956C7.15317 9.50605 7.15696 9.92255 7.15696 10.339C7.15696 10.7692 7.15696 11.2001 7.15696 11.6309C7.16074 11.8914 7.28113 12.0096 7.54163 12.0164C7.97176 12.0217 8.40264 12.0224 8.83277 12.0164C9.05994 12.0164 9.20761 11.8702 9.20685 11.6824C9.20609 11.4946 9.066 11.3651 8.83352 11.3629Z"
                  fill="black"
                />
                <path
                  d="M9.95187 8.68996C9.72469 8.68163 9.59975 8.77627 9.59748 8.99663C9.5899 9.9003 9.5899 10.8039 9.59748 11.7076C9.59748 11.928 9.7315 12.0287 9.9496 12.0196C10.1677 12.0105 10.248 11.9212 10.2525 11.6902C10.2525 11.2525 10.2525 10.8148 10.2525 10.3771C10.2525 9.92579 10.251 9.47397 10.248 9.02163C10.2464 8.78688 10.1639 8.69677 9.95187 8.68996Z"
                  fill="black"
                />
                <path
                  d="M15.8524 11.3654C15.6517 11.3594 15.4503 11.3654 15.2466 11.3654C14.6976 11.3518 14.7839 11.4805 14.771 10.8672C14.771 10.7195 14.8316 10.6831 14.9649 10.6862C15.2451 10.6922 15.5253 10.69 15.8054 10.6862C16.0288 10.6862 16.1598 10.565 16.1651 10.3727C16.1704 10.1803 16.0379 10.0387 15.8077 10.0311C15.6214 10.0243 15.4336 10.0311 15.2473 10.0311C14.6976 10.016 14.7839 10.1478 14.771 9.53286C14.771 9.38595 14.8301 9.3481 14.9641 9.35113C15.2443 9.35719 15.5245 9.35491 15.8047 9.35113C16.0553 9.35113 16.1977 9.22615 16.1954 9.02093C16.1932 8.81572 16.0478 8.6961 15.7979 8.69459C15.3738 8.69459 14.9497 8.69459 14.5257 8.69459C14.247 8.69459 14.1167 8.82481 14.1152 9.10121C14.1152 9.51846 14.1152 9.9342 14.1152 10.3522C14.1152 10.7831 14.1152 11.214 14.1152 11.6456C14.1152 11.8879 14.2477 12.0242 14.487 12.0242C14.9414 12.0288 15.3958 12.0295 15.8448 12.0242C16.0629 12.0242 16.1954 11.891 16.1962 11.7002C16.1969 11.5093 16.0682 11.3723 15.8524 11.3654Z"
                  fill="black"
                />
                <path
                  d="M20.8936 0.51833C20.3786 0.143486 19.7887 0.00416494 19.1685 0.00340767C13.7496 -0.00113589 8.33037 -0.00113589 2.91091 0.00340767C1.25856 0.00340767 0.295319 1.10065 0.0817716 2.26077C0.0552675 2.40616 0.0272614 2.55158 0 2.69697V19.3438C0.034834 19.5241 0.0681454 19.7043 0.105251 19.8845C0.228805 20.4489 0.529449 20.959 0.963326 21.3404C1.3972 21.7218 1.94162 21.9546 2.51714 22.0049C2.58577 22.0174 2.65298 22.0366 2.7178 22.0624H19.3677C19.5411 22.0283 19.7153 21.9958 19.8887 21.9602C20.4628 21.8414 20.9823 21.5384 21.3682 21.0971C21.7541 20.6558 21.9853 20.1005 22.0264 19.5157C22.0484 19.1795 22.0628 18.8425 22.0628 18.5055C22.0628 13.3244 22.0628 8.14343 22.0628 2.96275C22.0613 1.95711 21.722 1.12414 20.8936 0.51833ZM17.7699 11.4986C17.632 11.9472 17.4316 12.3742 17.1747 12.767C16.1221 14.3914 14.6757 15.5886 13.0476 16.5814C12.3804 16.9873 11.7171 17.4143 10.9932 17.7127C10.7766 17.8013 10.6342 17.8679 10.451 17.7309C10.2677 17.5938 10.2813 17.3977 10.304 17.2008C10.3449 16.838 10.3934 16.4753 10.4199 16.1111C10.4403 15.8324 10.3154 15.7128 10.0337 15.6795C8.6979 15.5235 7.46356 15.0903 6.37159 14.2952C5.29325 13.5092 4.50343 12.5058 4.21946 11.1768C3.91201 9.73798 4.26412 8.44002 5.17359 7.29959C6.23376 5.97135 7.65136 5.2232 9.28932 4.89758C11.577 4.44322 13.7329 4.78398 15.6723 6.13493C17.027 7.07848 17.944 8.61194 17.9539 10.2332C17.9556 10.662 17.8928 11.0886 17.7676 11.4986H17.7699Z"
                  fill="black"
                />
              </svg>

            </q-router-link>

            <q-router-link :to="link.instagram">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4018 6.59653V15.6079C22.3882 15.7079 22.3738 15.8079 22.3617 15.9108C22.3026 16.4015 22.2791 16.8998 22.1784 17.3822C21.7346 19.5207 20.5268 21.0398 18.4678 21.8402C17.4834 22.2241 16.4452 22.3286 15.4002 22.3392C13.0322 22.3634 10.6642 22.3854 8.29628 22.3725C7.13313 22.3665 5.96393 22.3619 4.81971 22.084C2.96669 21.6342 1.59075 20.5839 0.772906 18.849C0.268571 17.7813 0.114839 16.6325 0.102723 15.4671C0.0769761 13.0484 0.0504764 10.6289 0.0694079 8.21022C0.0718968 7.19067 0.144758 6.17253 0.28749 5.16302C0.519212 3.597 1.27194 2.29678 2.5555 1.33582C3.65353 0.511919 4.92421 0.184028 6.26608 0.0893701C6.80298 0.0515071 7.34064 0.0295332 7.87754 0H14.571C15.0935 0.0287759 15.616 0.0560299 16.1377 0.0870776C17.0525 0.140843 17.9468 0.298374 18.7881 0.676247C20.8464 1.60162 21.93 3.25094 22.2715 5.43716C22.3283 5.8173 22.3579 6.20805 22.4018 6.59653ZM11.2466 20.4036V20.3696C11.8365 20.3696 12.4279 20.387 13.0171 20.3658C14.29 20.3203 15.5728 20.3362 16.8329 20.1765C18.5542 19.9591 19.7181 18.9649 20.1383 17.2519C20.308 16.5591 20.3655 15.826 20.3784 15.1097C20.4193 13.0398 20.4319 10.97 20.4163 8.90011C20.4189 7.81495 20.3622 6.73046 20.2466 5.65147C20.0331 3.8454 18.901 2.62771 17.1131 2.26953C16.3475 2.11808 15.5516 2.07186 14.7656 2.0605C12.6826 2.02971 10.5986 2.0257 8.51363 2.04841C7.52919 2.06053 6.52884 2.09534 5.55273 2.23695C3.84208 2.48458 2.67514 3.59625 2.33437 5.27964C2.19547 6.0163 2.12299 6.76394 2.1178 7.51356C2.07943 9.32039 2.06859 11.1275 2.08525 12.9348C2.09888 14.1865 2.13068 15.4421 2.2526 16.687C2.37755 17.9683 2.98713 19.011 4.13438 19.6744C4.83636 20.0803 5.61408 20.2492 6.41374 20.2802C8.02671 20.3363 9.63665 20.362 11.2466 20.4036Z"
                  fill="black"
                />
                <path
                  d="M5.4961 11.1916C5.4952 10.4364 5.64308 9.68842 5.93125 8.99037C6.21942 8.29233 6.64224 7.65788 7.17561 7.12325C7.70897 6.58862 8.34241 6.1643 9.03977 5.87447C9.73713 5.58465 10.4847 5.43503 11.2399 5.43413C11.9951 5.43324 12.7431 5.58109 13.4411 5.86926C14.1392 6.15743 14.7736 6.58028 15.3082 7.11364C15.8429 7.647 16.2672 8.28045 16.557 8.9778C16.8469 9.67516 16.9965 10.4228 16.9974 11.178C17.0133 14.3456 14.4325 16.9331 11.2558 16.9422C9.73001 16.9416 8.26672 16.3358 7.18696 15.2578C6.10719 14.1797 5.49911 12.7174 5.4961 11.1916ZM7.52253 11.1711C7.51939 11.9082 7.73494 12.6297 8.14189 13.2443C8.54884 13.859 9.12892 14.3391 9.80877 14.6239C10.4886 14.9088 11.2377 14.9857 11.9612 14.8448C12.6847 14.7039 13.3503 14.3516 13.8735 13.8324C14.3968 13.3133 14.7544 12.6506 14.901 11.9282C15.0476 11.2058 14.9767 10.4562 14.6972 9.77411C14.4177 9.09203 13.9422 8.50812 13.3309 8.0963C12.7195 7.68449 11.9998 7.46325 11.2627 7.46054C10.7731 7.45735 10.2877 7.55092 9.83443 7.7359C9.38115 7.92088 8.96887 8.19361 8.62132 8.53842C8.27376 8.88323 7.99779 9.29332 7.80922 9.74512C7.62065 10.1969 7.52322 10.6815 7.52253 11.1711Z"
                  fill="black"
                />
                <path
                  d="M18.5649 5.20249C18.5671 5.46713 18.4909 5.72648 18.3459 5.94784C18.2008 6.16921 17.9934 6.34267 17.7499 6.44631C17.5064 6.54995 17.2377 6.57915 16.9776 6.53021C16.7175 6.48127 16.4777 6.35639 16.2886 6.17132C16.0994 5.98626 15.9693 5.74929 15.9146 5.49034C15.86 5.2314 15.8832 4.96206 15.9815 4.71633C16.0798 4.4706 16.2486 4.25951 16.4667 4.10964C16.6849 3.95977 16.9425 3.87785 17.2071 3.87425C17.3839 3.87083 17.5595 3.90263 17.7239 3.9678C17.8882 4.03297 18.038 4.13021 18.1643 4.25384C18.2907 4.37747 18.3912 4.52503 18.46 4.6879C18.5288 4.85077 18.5644 5.0257 18.5649 5.20249Z"
                  fill="black"
                />
              </svg>
            </q-router-link>

          </div>
        </div>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import PageContactFormDB from './firestore/PageContactFormDB.vue';

import PageHotelCategoryDB from '@/components/firestore/PageHotelCategoryDB.vue';
import PostDB from './firestore/PostDB.vue';
import { computed, ref, watch, watchEffect } from 'vue';
import { useElementSize } from '@vueuse/core'
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { usePageHotelCategoryStore } from '@/stores/page-hotelCategory.store';
import { map } from 'lodash';
import { usePostStore } from '@/stores/post.store';
import { usePageContactFormStore } from '@/stores/page-contactForm.store';
const route = useRoute()
const $q = useQuasar()

const pageHotelCategoryStore = usePageHotelCategoryStore()
const postStore = usePostStore()

type MenuLinkType = {
  text: string,
  link: string,
  childrenMenuLinks?: Array<MenuLinkType>
}
const menuLinks = ref<MenuLinkType[]>([])
watchEffect(() => {
  if (pageHotelCategoryStore.hotelCategoryData && postStore.postArray) {
    menuLinks.value = [
      {
        text: "線上訂房",
        link: "/"
      },
      {
        text: "最新資訊",
        link: "/post",
        childrenMenuLinks: map(postStore.postCategoryArray, (o) => ({
          text: o.postCategory_name,
          link: `/post?category=${o.postCategory_name}`
        }))

      },
      {
        text: "精選分類",
        link: "/hotel-category",
        childrenMenuLinks: map(pageHotelCategoryStore.hotelCategoryData, (o) => ({
          text: o.name,
          link: `/hotel-category?category=${o.name}`
        }))



      },

      {
        text: "加盟合作",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfcGzKlc8o7SE4ZLS9oSYQz2ylQeAYgD4xJ3a3r3bCCLqlhSw/viewform"
      },

    ]
  }
})






const header = ref(null)
const headerSize = useElementSize(header)
const showPhoneMenu = ref(false)
const focusPhoneSubMenu = ref('')
const clickPhoneSubMenu = (_clickPhoneSubMenu: string) => {
  if (focusPhoneSubMenu.value == _clickPhoneSubMenu) {
    focusPhoneSubMenu.value = ''
  } else {
    focusPhoneSubMenu.value = _clickPhoneSubMenu
  }
}

const pageContactStore = usePageContactFormStore()
const link = computed(() => pageContactStore.contactForm)

watch(() => route.fullPath, () => {
  showPhoneMenu.value = false
})

</script>


<style scoped >
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, height 0.3s ease;
  height: 150px;
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
}

section.header {
  box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 30%);
}

li>.subMenuArea {
  visibility: hidden;
  opacity: 0;
  padding-top: 0;
  transition: visibility 0s, opacity 0.3s linear, padding-top 0.3s linear;
}

li:hover>.subMenuArea {
  visibility: visible;
  opacity: 1;
  padding-top: 1rem;
}
</style>
