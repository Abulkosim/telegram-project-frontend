<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="form-group">
      <label for="username" class="block text-sm font-medium mb-1">Username</label>
      <input autocomplete="off" v-model="form.username" id="username" type="text" required class="form-input"
        :class="{ 'border-red-500': errors.username }" />
      <p v-if="errors.username" class="text-red-400 text-xs mt-1">{{ errors.username }}</p>
    </div>

    <div class="form-group">
      <label for="email" class="block text-sm font-medium mb-1">Email</label>
      <input autocomplete="off" v-model="form.email" id="email" type="email" required class="form-input"
        :class="{ 'border-red-500': errors.email }" />
      <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="password" class="block text-sm font-medium mb-1">Password</label>
      <input autocomplete="off" v-model="form.password" id="password" type="password" required class="form-input"
        :class="{ 'border-red-500': errors.password }" />
      <p v-if="errors.password" class="text-red-400 text-xs mt-1">{{ errors.password }}</p>
    </div>

    <button type="submit" class="submit-button" :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
      :disabled="isLoading">
      {{ isLoading ? 'Signing up...' : 'Sign up' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits(['submit'])

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: ''
})

const validateForm = () => {
  let isValid = true

  if (!form.username) {
    errors.username = 'Username is required'
    isValid = false
  } else {
    errors.username = ''
  }

  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  } else {
    errors.email = ''
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 4) {
    errors.password = 'Password must be at least 4 characters'
    isValid = false
  } else {
    errors.password = ''
  }

  return isValid
}

const submitForm = () => {
  if (validateForm()) {
    emit('submit', form)
  }
}
</script>