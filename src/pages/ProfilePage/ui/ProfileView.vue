<template>
  <div class="min-h-screen flex items-center justify-center text-gray-100 p-4 relative overflow-hidden">
    <div class="animated-background"></div>
    <div class="w-full max-w-2xl z-10">
      <div class="bg-gray-800 bg-opacity-80 rounded-lg overflow-hidden shadow-2xl">
        <div class="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-500">
          <div class="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div class="w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden">
              <img :src="userStore.avatar || '/default-avatar.png'" alt="Profile" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div class="p-8 pt-20">
          <h2
            class="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Profile Settings
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="form-group">
              <label for="username" class="block text-sm font-medium mb-1">Username</label>
              <input v-model="form.username" id="username" type="text" class="form-input"
                :class="{ 'border-red-500': errors.username }" />
              <p v-if="errors.username" class="text-red-400 text-xs mt-1">{{ errors.username }}</p>
            </div>

            <div class="form-group">
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input v-model="form.email" id="email" type="email" class="form-input"
                :class="{ 'border-red-500': errors.email }" />
              <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <div class="form-group">
              <label for="status" class="block text-sm font-medium mb-1">Status</label>
              <select v-model="form.status" id="status" class="form-input bg-gray-700">
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="busy">Busy</option>
              </select>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="handleDelete"
                class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                Delete Account
              </button>
              <button type="submit" class="submit-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/entities/user/model/store/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  username: userStore.username,
  email: userStore.email,
  status: userStore.status,
})

const errors = reactive({
  username: '',
  email: '',
})

const validateForm = () => {
  let isValid = true

  if (!form.username) {
    errors.username = 'Username is required'
    isValid = false
  }

  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    await userStore.updateProfile({
      username: form.username,
      email: form.email,
      status: form.status,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    try {
      await userStore.deleteUser()
      router.push('/auth')
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }
}

onMounted(async () => {
  try {
    await userStore.fetchProfile()
    form.username = userStore.username
    form.email = userStore.email
    form.status = userStore.status
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
})
</script>

<style scoped>
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #1a202c, #2d3748, #4a5568);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  z-index: 0;
}

.form-input {
  @apply w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-100;
}

.submit-button {
  @apply px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>