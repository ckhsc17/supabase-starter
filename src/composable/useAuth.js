import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '../stores/user'
import supabase from '../supabase'

const useLogin = () => {
  const err = ref(false)
  const loading = ref(false)
  const result = ref(null)

  const doLogin = async ({ email, password }) => {
    loading.value = true
    err.value = false
    result.value = null
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      err.value = true
    } else {
      result.value = data.user
    }
    loading.value = false
  }
  return {
    loading,
    err,
    login: doLogin,
    result
  }
}

const useSignUp = () => {
  const error = ref(false)
  const loading = ref(false)
  const success = ref(null)
  const doSignUp = async ({ email, password }) => {
    loading.value = true
    error.value = false
    success.value = null
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (data.user) {
      success.value = data.user
    } else {
      error.value = true
    }
    loading.value = false
  }
  return {
    loading,
    error,
    signup: doSignUp,
    success
  }
}

const useFBLogin = () => {
  const path = location.origin + '/callback/'

  const doFetch = async () => {
    const { data } =  await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: path
      }
    })
  }

  return {
    loginFB: doFetch
  }
}

const useForgotPsd = () => {
  const loading = ref(false)
  const success = ref(false)
  const err = ref(null)
  const path = location.origin + '/reset/'
  const doFetch = async email => {
    loading.value = true
    success.value = false
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: path
    })
    loading.value = false
    success.value = true
    err.value = error
  }
  
  return {
    forgotPsd: doFetch,
    loading,
    success,
    err
  }
}

const useUpdateUser = () => {
  const loading = ref(false)
  const success = ref(false)
  const doFetch = async ({ password, email }) => {
    loading.value = true
    success.value = false
    const { data, error } = await supabase.auth.updateUser({
      email,
      password
    })
    success.value = res.error ? false : true
    loading.value = false
  }
  return {
    updateUser: doFetch,
    loading,
    success
  }
}

const useGetUser = () => {
  const user = ref({})
  const loading = ref(false)
  const store = useUserStore()

  const doFetch = async () => {
    loading.value = true
    const { data, error } = await supabase.auth.getUser()
    user.value = data.user
    store.id = data.user?.id
    store.email = data.user?.email
    loading.value = false
  }

  onBeforeMount(doFetch)
  return {
    user,
    reload: doFetch,
    loading
  }
}

const useLogout = () => {
  const loading = ref(false)
  const logout = async () => {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    loading.value = false
  }

  return {
    logout
  }
}

export {
  useFBLogin,
  useLogin,
  useSignUp,
  useForgotPsd,
  useUpdateUser,
  useGetUser,
  useLogout
}