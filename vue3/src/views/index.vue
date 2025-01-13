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
  <div class="min-h-screen bg-gray-100">
    <p>当前主题：{{ currentTheme }}</p>
    <button @click="toggleTheme">
      切换主题
    </button>
    <div class="">
      <div class="w-full flex">
        <!-- 左侧栏 -->
        <aside class="w-1/4 bg-blue-200 p-4">
          <h2 class="text-lg font-bold">
            左侧栏
          </h2>
          <p>左侧内容</p>
        </aside>

        <!-- 中间内容区 -->
        <main class="flex-1 bg-white p-4">
          <h1 class="text-2xl font-bold">
            主要内容
          </h1>
          <p>这里是主要内容区域，占据剩余的宽度。</p>
        </main>

        <!-- 右侧栏 -->
        <aside class="w-1/4 bg-green-200 p-4">
          <h2 class="text-lg font-bold">
            右侧栏
          </h2>
          <p>右侧内容</p>
        </aside>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
