import supabase from '../supabase'

export default () => {
  
  const fetchImage = async () => {
    const { data } = await supabase.storage.from('avatar').list('/')
  }

  return {
    fetchImage
  }
}