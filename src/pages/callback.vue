<template>
  <div class="py-20 text-center">
    <i class='bx bx-loader-circle bx-burst bx-lg' ></i>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
router.replace('/')
</script>