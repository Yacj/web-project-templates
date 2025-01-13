import { defineStore } from 'pinia'

const useSettingsStore = defineStore('Settings', () => {
  const title = ref('')

  const colorScheme = ref('light') // 默认值
  const prefersColorScheme = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null
  const currentColorScheme = ref()

  function updateTheme() {
    if (colorScheme.value === '') {
      colorScheme.value = prefersColorScheme?.matches ? 'dark' : 'light'
    }
    currentColorScheme.value = colorScheme.value
    if (colorScheme.value === 'light') {
      document.documentElement.classList.remove('dark')
    }
    else if (colorScheme.value === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }

  function toggleTheme() {
    colorScheme.value = colorScheme.value === 'light' ? 'dark' : 'light'
    updateTheme()
  }

  watch(
    colorScheme,
    (val) => {
      if (val === '' && prefersColorScheme) {
        prefersColorScheme.addEventListener('change', updateTheme)
      }
      else {
        prefersColorScheme?.removeEventListener('change', updateTheme)
      }
      updateTheme() // 确保主题立即更新
    },
    { immediate: true },
  )

  function setTitle(val) {
    title.value = val
  }

  onUnmounted(() => {
    prefersColorScheme?.removeEventListener('change', updateTheme)
  })

  return {
    title,
    setTitle,
    colorScheme,
    currentColorScheme,
    updateTheme,
    toggleTheme,
  }
})

export default useSettingsStore
