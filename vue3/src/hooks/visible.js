import { ref } from 'vue'

export default function useVisible(initValue = false) {
  const visible = ref(!!initValue) // 确保默认值始终为布尔类型

  const setVisible = (value) => {
    if (typeof value === 'boolean') {
      visible.value = value
    }
    else {
      console.warn('setVisible expects a boolean value')
    }
  }

  const toggle = () => {
    visible.value = !visible.value
  }

  return {
    visible,
    setVisible,
    toggle,
  }
}
