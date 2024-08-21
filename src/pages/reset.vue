<template>
  <h2 class=" bg-primary py-10 text-white text-center font-bold text-3xl mb-8 leading-loose">忘記密碼</h2>

  <div class=" max-w-lg mx-auto w-5/6">
    <form @submit.prevent="resetPsd">
      <p class="mb-4">
        <input :disabled="loading" v-model="password" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100"
          placeholder="新密碼" type="password">
      </p>
      <p class="mb-4">
        <input :disabled="loading" v-model="confirmPassword" required
          class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100"
          placeholder="新密碼確認" type="password">
      </p>
      <p class="mb-4 px-8 text-amber-500" v-if="!isTheSame">密碼不相同</p>
      <div class=" flex justify-end items-center space-x-6">
        <span v-if="success">重設成功！！</span>
        <router-link v-if="success" class=" underline" to="/">回首頁</router-link>
        <button v-if="!success" :disabled="loading" class="text-md font-bold hover:opacity-80 text-white bg-primary py-4 px-8 rounded-full"
          type="submit">
          <span v-if="!loading">重設密碼</span>
          <span v-else><i class='bx bx-loader-alt bx-spin' ></i></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
import { useUpdateUser } from '../composable/useAuth'
import { useUserStore } from '../stores/user'
import { definePage } from 'vue-router/auto'
definePage({
  meta: {
    requiresAuth: true
  }
})

const password = ref('')
const confirmPassword = ref('')

const isTheSame = computed(() => {
  return password.value === confirmPassword.value
})



const { updateUser, loading, success } = useUpdateUser()
const store = useUserStore()

const resetPsd = async () => {
  if (!isTheSame.value) return
  await updateUser({
    email: store.email,
    password: confirmPassword.value
  })
}
</script>