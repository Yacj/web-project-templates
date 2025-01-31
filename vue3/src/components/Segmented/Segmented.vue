<script setup>
import { useResizeObserver } from '@vueuse/core'

defineOptions({
  name: 'Segmented',
})

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: 'middle',
    validator: value => ['small', 'middle', 'large'].includes(value),
  },
  value: {
    type: [String, Number],
    default: null,
  },
})

const emits = defineEmits(['update:value', 'change'])

// Refs
const segmentedGroupRef = ref(null)
const segmentedItemRefs = ref([])

// State
const selectedValue = ref(props.value)
const selectedWallWidth = ref(0)
const selectedWallOffsetLeft = ref(0)

// Constants
const SIZES = {
  small: {
    borderRadius: '2px',
    height: '20px',
    padding: '0 7px',
    fontSize: '14px',
  },
  middle: {
    borderRadius: '4px',
    height: '28px',
    padding: '0 11px',
    fontSize: '14px',
  },
  large: {
    borderRadius: '8px',
    height: '36px',
    padding: '0 11px',
    fontSize: '16px',
  },
}

// Computed
const selectedWallStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: `${selectedWallOffsetLeft.value}px`,
  backgroundColor: 'var(--segmented-wall-bg)',
  boxShadow: 'var(--segmented-wall-shadow)',
  width: `${selectedWallWidth.value}px`,
  height: '100%',
  borderRadius: SIZES[props.size].borderRadius,
  pointerEvents: 'none',
  transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
}))

// Methods
function getOptionProps(option) {
  if (typeof option === 'object') {
    return {
      value: option.value,
      label: option.label,
      disabled: option.disabled || false,
      payload: option.payload || {},
    }
  }
  return {
    value: option,
    label: option,
    disabled: false,
    payload: {},
  }
}

function updateSelectedWallState() {
  const selectedIndex = props.options.findIndex(
    option => getOptionProps(option).value === selectedValue.value,
  )
  const selectedTarget = segmentedItemRefs.value[selectedIndex]

  if (selectedTarget && segmentedGroupRef.value) {
    const { width, left } = selectedTarget.getBoundingClientRect()
    const { left: groupLeft } = segmentedGroupRef.value.getBoundingClientRect()
    selectedWallWidth.value = width
    selectedWallOffsetLeft.value = left - groupLeft
  }
}

function handleSelection(option) {
  const { value, disabled } = getOptionProps(option)
  if (!props.disabled && !disabled && value !== selectedValue.value) {
    selectedValue.value = value
    updateSelectedWallState()
    emits('update:value', value)
    emits('change', value)
  }
}

// Watchers
watch(
  () => props.value,
  async (newValue) => {
    if (newValue !== selectedValue.value) {
      selectedValue.value = newValue
      await nextTick()
      updateSelectedWallState()
    }
  },
  { immediate: true },
)

// Resize handling
useResizeObserver(segmentedGroupRef, updateSelectedWallState)
</script>

<template>
  <div
    class="m-segmented"
    :class="{
      [`segmented-${size}`]: true,
      'segmented-block': block,
    }"
  >
    <div ref="segmentedGroupRef" class="segmented-group">
      <div
        v-for="(option, index) in options"
        :key="index"
        ref="segmentedItemRefs"
        class="segmented-item"
        :class="{
          'segmented-item-selected': selectedValue === getOptionProps(option).value,
          'segmented-item-disabled': disabled || getOptionProps(option).disabled,
          'segmented-item-block': block,
        }"
        @click="() => handleSelection(option)"
      >
        <input
          type="radio"
          class="segmented-item-input"
          :checked="selectedValue === getOptionProps(option).value"
          :disabled="disabled || getOptionProps(option).disabled"
        >
        <div
          class="segmented-item-label"
          :title="getOptionProps(option).payload ? undefined : String(getOptionProps(option).label)"
        >
          <slot
            name="label"
            v-bind="getOptionProps(option)"
            :index="index"
          >
            {{ getOptionProps(option).label }}
          </slot>
        </div>
      </div>
      <div :style="selectedWallStyle" />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --segmented-bg: #f5f5f5;
  --segmented-text: rgba(0, 0, 0, 0.65);
  --segmented-text-hover: rgba(0, 0, 0, 0.88);
  --segmented-text-selected: rgba(0, 0, 0, 0.88);
  --segmented-text-disabled: rgba(0, 0, 0, 0.25);
  --segmented-wall-bg: #fff;
  --segmented-wall-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
  0 1px 6px -1px rgba(0, 0, 0, 0.02),
  0 2px 4px 0 rgba(0, 0, 0, 0.02);
  --segmented-hover-bg: rgba(0, 0, 0, 0.06);
}

.dark{
    // Dark mode variables
    --segmented-bg: #1f1f1f;
    --segmented-text: rgba(255, 255, 255, 0.65);
    --segmented-text-hover: rgba(255, 255, 255, 0.88);
    --segmented-text-selected: rgba(255, 255, 255, 0.88);
    --segmented-text-disabled: rgba(255, 255, 255, 0.25);
    --segmented-wall-bg: #2f2f2f;
    --segmented-wall-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3),
    0 1px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.2);
    --segmented-hover-bg: rgba(255, 255, 255, 0.06);
}

.m-segmented {
  display: inline-block;
  padding: 2px;
  color: var(--segmented-text);
  background-color: var(--segmented-bg);
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.segmented-block {
    display: flex;
    width: 100%;
  }

  .segmented-group {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: flex-start;
    width: 100%;
  }

  .segmented-item {
    position: relative;
    z-index: 1;
    text-align: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover:not(.segmented-item-selected):not(.segmented-item-disabled) {
      color: var(--segmented-text-hover);

      &::after {
        background-color: var(--segmented-hover-bg);
      }
    }

    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      transition: background-color 0.2s;
      pointer-events: none;
      content: '';
    }

    &-selected {
      color: var(--segmented-text-selected);
    }

    &-disabled {
      color: var(--segmented-text-disabled);
      cursor: not-allowed;
    }

    &-block {
      flex: 1;
      min-width: 0;
    }

    &-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }

    &-label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      :deep(svg) {
        fill: currentColor;
      }
    }
  }
}

.segmented-small .segmented-item-label {
  min-height: 20px;
  line-height: 20px;
  padding: 0 7px;
  font-size: 14px;
}

.segmented-middle .segmented-item-label {
  min-height: 28px;
  line-height: 28px;
  padding: 0 11px;
  font-size: 14px;
}

.segmented-large .segmented-item-label {
  min-height: 36px;
  line-height: 36px;
  padding: 0 11px;
  font-size: 16px;
}
</style>
