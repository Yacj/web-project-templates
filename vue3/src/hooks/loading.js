export default function useLoading(initValue = false, initText = 'Loading...') {
  const loading = ref(initValue)
  const loadingText = ref(initText)

  // 设置加载状态
  const setLoading = (value) => {
    loading.value = value
  }

  // 设置加载文本
  const setLoadingText = (text) => {
    loadingText.value = text
  }

  // 同时更新加载状态和文本
  const updateLoadingState = (value, text) => {
    loading.value = value
    if (text !== undefined) {
      loadingText.value = text
    }
  }

  // 切换加载状态
  const toggleLoading = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    loadingText,
    setLoading,
    setLoadingText,
    updateLoadingState,
    toggleLoading,
  }
}
