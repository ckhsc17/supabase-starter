<template>
  <h2 class=" bg-primary py-10 text-white text-center font-bold text-3xl mb-8 leading-loose">登入</h2>
  <div class=" max-w-lg mx-auto w-5/6">
    <!-- <div class=" text-center mb-4">
      <button :disabled="loading" type="button" @click="loginFB()">
        <div class="bg-[#4267B2] inline-block align-middle rounded text-center text-white text-4xl">
          <IconFacebook />
        </div>
        <span class="ml-2 inline-block align-middle">用FB登入</span>
      </button>
    </div> -->
    <form class="mb-4" @submit.prevent="handlerLogin">
      <p class="mb-4">
        <input :disabled="loading" v-model.trim="loginData.email" required class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100" placeholder="信箱" type="email">
      </p>
      <p class="mb-4">
        <input :disabled="loading" v-model.trim="loginData.password" required class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100" placeholder="密碼" type="password">
      </p>
      <div class=" flex justify-end items-center space-x-6">
        <span class=" text-amber-600" v-if="err">好像哪裡出錯了</span>
        <router-link to="/forgot" :disabled="loading" class=" text-stone-600 hover:underline" type="button">忘記密碼?</router-link>
        <button :disabled="loading" class="text-md font-bold hover:opacity-80 text-white bg-primary py-4 w-24 rounded-full" type="submit">
          <span v-if="!loading">登入</span>
          <span v-else><i class='bx bx-loader-alt bx-spin' ></i></span>
        </button>
      </div>
    </form>
    <div class="text-center">
      <p class="text-stone-600 mb-4">還沒有帳號？ <router-link replace to="/signup" class=" underline">立刻註冊</router-link></p>
      <p>
        <router-link class=" underline" to="/">回首頁</router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
import { reactive, watchEffect } from 'vue'
import IconFacebook from '../components/icons/IconFacebook.vue'
import { useLogin, useFBLogin } from '../composable/useAuth'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'



const loginData = reactive({
  email: '',
  password: ''
})

const {
  loading,
  login,
  err,
  result
} = useLogin()
const handlerLogin = async () => {
  await login({
    email: loginData.email,
    password: loginData.password
  })
}

const store = useUserStore()
const router = useRouter()
watchEffect(() => {
  if (result.value === null) return
  store.id =  result.value.id
  store.email = result.value.email
  router.push('/')
})

const { loginFB } = useFBLogin()
</script>