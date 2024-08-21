<template>
<div class=" h-screen">
<ul class=" w-11/12 mx-auto max-w-lg bg-primary/5">
  <li class="p-3 rounded-md">在現用戶</li>
  <li class="p-3 rounded-md mb-2 last:mb-0 bg-lime-200" v-for="user in users" :id="user.uuid">
    <p>ID: {{ user.uuid }}</p>
    <p>上線時間: {{ user.online_at }}</p>
  </li>
</ul>
</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import supabase from '../supabase'

const ROOM = 'chat'
const RANDOM_ID = crypto.randomUUID()
const users = ref([])

const channel = supabase.channel(ROOM, {
  config: {
    presence: {
      key: RANDOM_ID
    }
  }
})


const unsubscribe = async () => {
  await channel.untrack()
}

const subscribe = async () => {
  channel
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      newPresences.forEach(user => {
        users.value.push({
          uuid: user.uuid,
          online_at: user.online_at
        })
      })
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      leftPresences.forEach(user => {
        const userIndex = users.value.findIndex(member => member.uuid === user.uuid)
        users.value.splice(userIndex, 1)
      })
    })
    .subscribe(async (state) => {
      if (state !== 'SUBSCRIBED') return
      await channel.track({
        online_at: new Date(),
        uuid: RANDOM_ID
      })
    })
}

onMounted(subscribe)
onBeforeUnmount(unsubscribe)

</script>