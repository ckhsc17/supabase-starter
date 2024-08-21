<script setup>
import HeaderWrapper from './components/HeaderWrapper.vue'
import { useUserStore } from './stores/user'
import supabase from './supabase'
import { onMounted } from 'vue'


const store = useUserStore()
onMounted(async () => {
  supabase.auth.onAuthStateChange((_, session) => {
    if (session === null) return
    store.id = session.user.id
    store.email = session.user.email
  })
})

</script>

<template>
  <HeaderWrapper/>
  <main class="text-stone-700">
    <router-view />
  </main>
</template>
