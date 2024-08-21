import { ref } from 'vue'
import supabase from '../supabase'


const useProfile = ({ id }) => {
  const loading = ref(false)
  const result = ref(null)
  const err = ref(false)

  const doFetch = () => {
    loading.value = true
    result.value = null
    err.value = false
    supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        loading.value = false
        result.value = data
        err.value = error ? true : false
      })
  }
  
  doFetch()

  return {
    loading,
    result,
    err,
    reload: doFetch
  }
}

export {
  useProfile
}