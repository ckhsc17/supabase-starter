<template>
  <div class="mx-auto w-11/12 py-6">
    <table class=" table-auto w-full mb-10">
      <thead>
        <tr>
          <th class=" bg-gray-100 px-4 pt-2">id</th>
          <th class=" bg-gray-100 px-4 pt-2">task</th>
          <th class=" bg-gray-100 px-4 pt-2">likes</th>
          <th class=" bg-gray-100 px-4 pt-2">is_complete</th>
          <th class=" bg-gray-100 px-4 pt-2">最後更新時間</th>
          <th class=" bg-gray-100 px-4 pt-2">操作</th>
        </tr>
      </thead>
      <tbody class=" text-center">
        <tr v-for="item in list" :key="item.id">
          <td class="p-4 border-b">{{ item.id }}</td>
          <td class="p-4 border-b">{{ item.task }}</td>
          <td class="p-4 border-b">
            <p>{{ item.likes }}</p>
            <p>
              <button @click="likeTodo(item.id)" type="button" class=" bg-primary/80 text-white p-1 rounded">按讚</button>
            </p>
          </td>
          <td class="p-4 border-b">{{ item.is_complete }} <button @click="updateTodo({ is_complete: !item.is_complete }, item.id)" type="button" class=" hover:underline">完成</button> </td>
          <td class="p-4 border-b break-words">{{ new Date(item.updated_at).getHours() }}時{{ new Date(item.updated_at).getMinutes() }}分{{ new Date(item.updated_at).getSeconds() }}秒</td>
          <td class="p-4 border-b">
            <button type="button" class=" hover:underline" @click="deleteTodo(item.id)">刪除</button>  
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="submitHandler" class=" w-11/12 mx-auto max-w-md">
      <div class="mb-6">
        <input :disabled="loading" v-model.trim="task" required class="focus:ring-2 disabled:text-stone-400 block w-full text-xl text-stone-700 border-none py-6 px-10 rounded-full ring-primary bg-gray-100" placeholder="task" type="text">
      </div>
      <div class=" text-right">
        <button :disabled="loading" class="text-md font-bold hover:opacity-80 text-white bg-primary py-4 w-24 rounded-full" type="submit">
          <span v-if="!loading">新增</span>
          <span v-else><i class='bx bx-loader-alt bx-spin' ></i></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import useTodos from '../composable/useTodos'


definePage({
  meta: {
    requiresAuth: true
  }
})

const task = ref('')

const {
  loading,
  list,
  addTodo,
  deleteTodo,
  updateTodo,
  likeTodo
} = useTodos()

const submitHandler = async () => {
  await addTodo({
    user_id: '9fe1408a-b5d8-4fd8-92aa-0c631e514c29',
    task: task.value
  })
}
</script>