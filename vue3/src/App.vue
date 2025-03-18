<script setup>
import useSettingsStore from '@/store/modules/settings.js'
import log from '@/utils/log.js'
import { RouterView } from 'vue-router'

const settingsStore = useSettingsStore()
watch(() => settingsStore.title, () => {
  const title = settingsStore.title
  document.title = title ? `${title} - ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE
}, {
  immediate: true,
})

log.warn('按钮颜色可能不兼容深色模式')
log.warnOnce('按钮颜色可能不兼容深色模式') // 只会打印一次
log.error('弹窗未正确渲染')
log.info('表单已成功提交')
log.table({ id: 1, name: '测试' }, '获取数据成功:')
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
