import { onMounted, ref } from 'vue'
import supabase from '../supabase'

const useTodos = () => {
  const loading = ref(false)
  const list = ref([])

  const addTodo = async (todo) => {
    loading.value = true
    await supabase.from('todos').insert(todo).select()
    await getTodos()
    loading.value = false
  }

  const getTodos = async () => {
    loading.value = true
    const { data, error } = await supabase.from('todos').select(`
      *,
      members (
        *
      )
    `)
    list.value = data
    loading.value = false
  }

  const deleteTodo = async (id) => {
    loading.value = true
    const { error } = await supabase.from('todos').delete().eq('id', id)
    await getTodos()
    loading.value = false
  }

  const updateTodo = async (updateObj, id) => {
    loading.value = true
    const { error } = await supabase.from('todos').update(updateObj).eq('id', id)
    await getTodos()
    loading.value = false
  }

  const likeTodo = async (id) => {
    loading.value = true
    await supabase.rpc('increselike', {
      todo_id: id
    })
    await getTodos()
    loading.value = false
  }

  onMounted(async () => {
    await getTodos()
    supabase.channel('todos').on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'todos'
      },
      (event) => {
        console.log(event)
      }
    ).subscribe()
  })

  return {
    addTodo,
    loading,
    list,
    deleteTodo,
    updateTodo,
    likeTodo
  }
}

export default useTodos