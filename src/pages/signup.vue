<template>
  <h2 class=" bg-primary py-10 text-white text-center font-bold text-3xl mb-8 leading-loose">註冊</h2>
  <div class=" max-w-lg mx-auto w-5/6">
    <!-- <div class=" text-center mb-4">
      <button :disabled="loading" type="button" @click="loginFB()">
        <div class="bg-[#4267B2] inline-block align-middle rounded text-center text-white text-4xl">
          <IconFacebook />
        </div>
        <span class="ml-2 inline-block align-middle">用FB登入</span>
      </button>
    </div> -->
    <form class="mb-4" @submit.prevent="handlerSignup">
      <p class="mb-4">
        <input :disabled="loading" v-model="signupData.email" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100"
          placeholder="信箱" type="email">
      </p>
      <p class="mb-4">
        <input :disabled="loading" v-model="signupData.password" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100"
          placeholder="密碼" type="password">
      </p>
      <div class=" flex justify-end items-center space-x-6">
        <span class=" text-amber-600" v-if="error">好像哪裡出錯了</span>
        <button :disabled="loading" class="text-md font-bold hover:opacity-80 text-white bg-primary py-4 w-24 rounded-full"
          type="submit">
          <span v-if="!loading">註冊</span>
          <span v-else><i class='bx bx-loader-alt bx-spin' ></i></span>
        </button>
      </div>
    </form>
    <div class="text-center">
      <p class="text-stone-600 mb-4">有帳號了？ <router-link to="/login" replace class=" underline">前往登入</router-link></p>
      <p>
        <router-link class=" underline" to="/">回首頁</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useSignUp, useFBLogin } from '../composable/useAuth'
import IconFacebook from '../components/icons/IconFacebook.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const store = useUserStore()

const router = useRouter()

const { loading, signup, error, success } = useSignUp()
const signupData = reactive({
  email: '',
  password: ''
})

const handlerSignup = () => {
  signup({
    email: signupData.email,
    password: signupData.password
  })
}
watch(success, user => {
  store.id = user.id
  router.push('/profile')
})

const { loginFB } = useFBLogin()
</script>