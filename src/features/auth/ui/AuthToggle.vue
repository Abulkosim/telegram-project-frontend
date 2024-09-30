<template>
  <p class="text-center mt-6 text-sm">
    {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
    <a @click="toggle"
      class="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200 ease-in-out cursor-pointer">
      {{ isRegister ? 'Sign in' : 'Sign up' }}
    </a>
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  isRegister: boolean
}>()

const emit = defineEmits(['toggle'])

const toggle = () => {
  emit('toggle')
}
</script>