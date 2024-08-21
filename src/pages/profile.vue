<script setup>
import {  ref } from 'vue'
import supabase from '../supabase'

// const fetchImage = async () => {

//   const { data } = await supabase.storage.from('avatar').list('')

//   const { data } = await supabase.storage.from('avatar').createSignedUrl('nosegates', 60)
//   console.log(data)
// }

const img = ref('')

const loading = ref(false)


const previewImage = async (e) => {
  loading.value = true
  const file = e.target.files[0]
  const name = `avatar_${Date.now()}`
  await supabase.storage.from('avatar').upload(name, file)
  const { data: { signedUrl } } = await supabase.storage.from('avatar').createSignedUrl(name, 60)
  img.value = signedUrl
  loading.value = false
}
</script>

<template>
  <h2 class=" bg-primary py-10 text-white text-center font-bold text-3xl mb-8 leading-loose">個人資訊</h2>
  <div class="max-w-lg mx-auto w-5/6">
    <form @submit.prevent="submitHandler">
      <ul class=" mb-10">
        <li class=" flex items-center space-x-4">
          <div class="shrink-0">
            <img v-if="img" class="h-16 w-16 object-cover rounded-full" :src="img" alt="Current profile photo" />
            <div v-else class="h-16 w-16 object-cover rounded-full bg-slate-300"></div>
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input @change="previewImage($event)" type="file" class="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "/>
          </label>
        </li>
      </ul>
    </form>
  </div>
</template>
