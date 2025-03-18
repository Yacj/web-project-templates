# Segmented 分段选择器

分段选择器，用于展示多个选项并允许用户选择其中单个选项。

## 特性

- 支持多种尺寸
- 支持禁用状态
- 支持自定义选项内容
- 支持亮色/暗色模式
- 支持块级布局
- 支持自定义主题

## 基础用法

最简单的用法，通过 `options` 属性设置选项内容。

```vue
<template>
  <segmented
    v-model:value="value"
    :options="['Daily', 'Weekly', 'Monthly']"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('Daily')
</script>
```

## 不同尺寸

提供三种尺寸：small、middle（默认）、large。

```vue
<template>
  <div class="flex flex-col gap-4">
    <segmented
      v-model:value="value"
      size="small"
      :options="options"
    />
    <segmented
      v-model:value="value"
      :options="options"
    />
    <segmented
      v-model:value="value"
      size="large"
      :options="options"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('Daily')
const options = ['Daily', 'Weekly', 'Monthly']
</script>
```

## 禁用状态

可以禁用整个组件或单个选项。

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 禁用整个组件 -->
    <segmented
      v-model:value="value1"
      :options="options1"
      disabled
    />
    
    <!-- 禁用单个选项 -->
    <segmented
      v-model:value="value2"
      :options="options2"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('Daily')
const value2 = ref('Daily')

const options1 = ['Daily', 'Weekly', 'Monthly']
const options2 = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly', disabled: true },
  { value: 'Monthly', label: 'Monthly' }
]
</script>
```

## 自定义选项内容

使用具名插槽自定义选项内容。

```vue
<template>
  <segmented
    v-model:value="value"
    :options="options"
  >
    <template #label="{ label, payload }">
      <div class="flex items-center gap-2">
        <component
          :is="payload.icon"
          class="w-4 h-4"
        />
        {{ label }}
      </div>
    </template>
  </segmented>
</template>

<script setup>
import { ref } from 'vue'
import { Calendar, Clock, Monitor } from 'lucide-vue-next'

const value = ref('daily')
const options = [
  { 
    value: 'daily',
    label: 'Daily',
    payload: { icon: Calendar }
  },
  {
    value: 'weekly',
    label: 'Weekly',
    payload: { icon: Clock }
  },
  {
    value: 'monthly',
    label: 'Monthly',
    payload: { icon: Monitor }
  }
]
</script>
```

## 块级布局

设置 `block` 属性使组件宽度充满父容器。

```vue
<template>
  <segmented
    v-model:value="value"
    :options="options"
    block
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('Daily')
const options = ['Daily', 'Weekly', 'Monthly']
</script>
```

## 受控模式

通过 `v-model:value` 控制选中项。

```vue
<template>
  <div class="flex flex-col gap-4">
    <segmented
      v-model:value="value"
      :options="options"
    />
    <div>当前选中值: {{ value }}</div>
    <button @click="value = 'Weekly'">
      设置为 Weekly
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('Daily')
const options = ['Daily', 'Weekly', 'Monthly']
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值 | `string \| number` | - |
| options | 选项配置 | `Array<string \| number \| OptionConfig>` | `[]` |
| size | 组件大小 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| block | 是否为块级元素 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### OptionConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| label | 选项标签 | `string` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
| payload | 额外的数据 | `any` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 选中值改变时触发 | `(value: string \| number) => void` |
| change | 选中值改变时触发 | `(value: string \| number) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| label | 自定义选项内容 | `{ label: string, value: string \| number, payload: any, index: number }` |

## 主题定制

组件使用 CSS 变量实现主题定制，你可以覆盖这些变量来自定义外观：

```css
:root {
  /* 亮色模式 */
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

/* 暗色模式 */
.dark{
  :root {
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
}
```

## 最佳实践

### 1. 列表页筛选

```vue
<template>
  <div class="flex flex-col gap-4">
    <segmented
      v-model:value="timeRange"
      :options="timeRangeOptions"
      @change="handleTimeRangeChange"
    />
    <div class="data-list">
      <!-- 数据列表内容 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const timeRange = ref('7d')
const timeRangeOptions = [
  { value: '24h', label: '最近24小时' },
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' },
  { value: 'custom', label: '自定义' }
]

const handleTimeRangeChange = (value) => {
  // 处理时间范围改变
  if (value === 'custom') {
    // 显示自定义时间选择器
  } else {
    // 更新数据列表
  }
}
</script>
```

### 2. 数据视图切换

```vue
<template>
  <div class="flex flex-col gap-4">
    <segmented
      v-model:value="viewType"
      :options="viewOptions"
    >
      <template #label="{ label, payload }">
        <component
          :is="payload.icon"
          class="w-4 h-4"
        />
      </template>
    </segmented>
    
    <component :is="currentView" :data="data" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { List, Grid, Table } from 'lucide-vue-next'
import ListView from './ListView.vue'
import GridView from './GridView.vue'
import TableView from './TableView.vue'

const viewType = ref('list')
const viewOptions = [
  { value: 'list', label: '列表视图', payload: { icon: List } },
  { value: 'grid', label: '网格视图', payload: { icon: Grid } },
  { value: 'table', label: '表格视图', payload: { icon: Table } }
]

const currentView = computed(() => {
  const viewMap = {
    list: ListView,
    grid: GridView,
    table: TableView
  }
  return viewMap[viewType.value]
})

const data = ref([/* ... */])
</script>
```

## 注意事项

1. **选项数量**：建议选项数量不要超过5个，否则可能影响用户体验。

2. **选项文本长度**：选项文本保持简短，避免过长导致布局问题。

3. **响应性设计**：在小屏幕设备上使用 `block` 模式可能更合适。

4. **无障碍性**：组件内部使用了 radio input 以支持键盘操作和屏幕阅读器。

5. **性能考虑**：当选项数量较多时，建议使用 `v-memo` 优化渲染性能。

## 常见问题

1. **为什么选中项的动画有时候不流畅？**
    - 检查是否有 CSS transform 或 opacity 过渡效果影响
    - 确保父元素没有设置 `overflow: hidden`

2. **如何在暗色模式下自定义样式？**
   ```css
   @media (prefers-color-scheme: dark) {
     .my-theme {
       --segmented-bg: #2d2d2d;
       --segmented-text: rgba(255, 255, 255, 0.8);
     }
   }
   ```

3. **如何处理选项动态变化？**
   ```vue
   <script setup>
   import { ref, watch } from 'vue'
   
   const value = ref('option1')
   const options = ref([])
   
   watch(options, (newOptions) => {
     // 检查当前选中值是否还在选项中
     if (!newOptions.some(opt => 
       (typeof opt === 'object' ? opt.value : opt) === value.value
     )) {
       // 重置为第一个可用选项
       const firstOption = newOptions[0]
       value.value = typeof firstOption === 'object' 
         ? firstOption.value 
         : firstOption
     }
   })
   </script>
   ```
