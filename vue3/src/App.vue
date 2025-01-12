<script setup>
import useSettingsStore from '@/store/modules/settings.js'
import { RouterView } from 'vue-router'

const settingsStore = useSettingsStore()
watch(() => settingsStore.title, () => {
  const title = settingsStore.title
  document.title = title ? `${title} - ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE
}, {
  immediate: true,
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
