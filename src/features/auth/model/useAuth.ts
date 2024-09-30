import { ref } from 'vue'
import { authApi } from '@/shared/api/api'

export function useAuth() {
  const isLoading = ref(false)
  const error = ref('')

  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await authApi.login(email, password)
      document.cookie = `token=${response.data.token}`
    } catch (err) {
      error.value = 'An error occurred during login. Please try again.'
      console.error('Login error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const register = async (username: string, email: string, password: string) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await authApi.register(username, email, password)
      document.cookie = `token=${response.data.token}`
    } catch (err) {
      error.value = 'An error occurred during registration. Please try again.'
      console.error('Registration error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    login,
    register
  }
}