import { defineStore } from 'pinia'
import { userApi } from '@/shared/api/api'

interface UserState {
  id: string
  username: string
  email: string
  avatar?: string
  status?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    username: '',
    email: '',
    avatar: '',
    status: 'online'
  }),

  actions: {
    async fetchProfile() {
      const response = await userApi.getProfile(this.id)
      this.setUser(response.data)
    },

    async updateProfile(userData: Partial<UserState>) {
      const response = await userApi.updateProfile(this.id, userData)
      this.setUser(response.data)
    },

    async deleteUser() {
      await userApi.deleteUser(this.id)
    },

    async getAllUsers() {
      const response = await userApi.getAllUsers()
      this.setUser(response.data)
    },

    setUser(userData: Partial<UserState>) {
      Object.assign(this, userData)
    }
  }
})