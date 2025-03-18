<script setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

defineOptions({
  name: 'CopyText',
})

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const { copy: copyToClipboard } = useClipboard()
const isCopied = ref(false)

async function copy() {
  await copyToClipboard(props.text)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 1000)
}
</script>

<template>
  <div class="copy-text flex-y-center">
    <span>{{ text }}</span>
    <button :class="{ copied: isCopied }" class="ml-2 text-lg flex cursor-pointer transition-transform duration-[0.3s] border-[none]" @click="copy">
      <SvgIcon v-if="isCopied" name="ci:check-big" class="text-green-600" />
      <SvgIcon v-else name="tabler:copy" />
    </button>
  </div>
</template>

<style scoped>
.copy-text {
  display: flex;
  align-items: center;
}

button.copied {
  color: green;
  transform: scale(1.2);
}
</style>
