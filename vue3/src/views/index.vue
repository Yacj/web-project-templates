<script setup>
import useSettingsStore from '@/store/modules/settings.js'

const settingsStore = useSettingsStore()

// 计算属性绑定当前主题
const currentTheme = computed(() => settingsStore.colorScheme)

// 切换主题
function toggleTheme() {
  settingsStore.toggleTheme()
}
</script>

<template>
  <div class="container max-auto bg-gray-100 dark:bg-gray-800">
    <p>当前主题：{{ currentTheme }}</p>
    <button @click="toggleTheme">
      切换主题
    </button>
  </div>
</template>

<style lang="scss" scoped>

</style>
