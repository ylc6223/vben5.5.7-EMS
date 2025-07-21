<template>
  <div class="demo-container">
    <h2>SearchSelector 组件演示</h2>
    
    <div class="demo-section">
      <h3>基本用法（自动选择第一项）</h3>
      <SearchSelector
        v-model="selectedValue1"
        :options="options1"
        placeholder="请选择企业"
        @change="handleChange1"
      />
      <p>当前选中值: {{ selectedValue1 }}</p>
      <p>当前选中标签: {{ getSelectedLabel(selectedValue1, options1) }}</p>
    </div>

    <div class="demo-section">
      <h3>自定义按钮文本</h3>
      <SearchSelector
        v-model="selectedValue2"
        :options="options2"
        button-text="选择城市"
        search-placeholder="搜索城市名称"
        @change="handleChange2"
      />
      <p>当前选中值: {{ selectedValue2 }}</p>
    </div>

    <div class="demo-section">
      <h3>不同尺寸和类型</h3>
      <div class="button-group">
        <SearchSelector
          v-model="selectedValue3"
          :options="options3"
          button-type="primary"
          button-size="small"
          placeholder="小尺寸"
        />
        <SearchSelector
          v-model="selectedValue4"
          :options="options3"
          button-type="success"
          button-size="default"
          placeholder="默认尺寸"
        />
        <SearchSelector
          v-model="selectedValue5"
          :options="options3"
          button-type="warning"
          button-size="large"
          placeholder="大尺寸"
        />
      </div>
    </div>

    <div class="demo-section">
      <h3>动态选项</h3>
      <button @click="addOption">添加选项</button>
      <button @click="removeOption">移除选项</button>
      <SearchSelector
        v-model="selectedValueDynamic"
        :options="dynamicOptions"
        placeholder="动态选项"
        @change="handleDynamicChange"
      />
      <p>选项数量: {{ dynamicOptions.length }}</p>
      <p>当前选中: {{ selectedValueDynamic }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchSelector from './SearchSelector.vue'

// 基本用法
const selectedValue1 = ref()
const options1 = ref([
  { label: "深圳市绿色能源科技有限公司", value: "company1" },
  { label: "广州新能源发展有限公司", value: "company2" },
  { label: "东莞智慧能源管理公司", value: "company3" },
])

// 自定义按钮文本
const selectedValue2 = ref()
const options2 = ref([
  { label: "深圳", value: "shenzhen" },
  { label: "广州", value: "guangzhou" },
  { label: "东莞", value: "dongguan" },
  { label: "佛山", value: "foshan" },
])

// 不同尺寸
const selectedValue3 = ref()
const selectedValue4 = ref()
const selectedValue5 = ref()
const options3 = ref([
  { label: "选项A", value: "a" },
  { label: "选项B", value: "b" },
  { label: "选项C", value: "c" },
])

// 动态选项
const selectedValueDynamic = ref()
const dynamicOptions = ref([
  { label: "初始选项1", value: "init1" },
  { label: "初始选项2", value: "init2" },
])

// 方法
const handleChange1 = (value: any, option: any) => {
  console.log('基本用法选择:', option.label, value)
}

const handleChange2 = (value: any, option: any) => {
  console.log('自定义按钮选择:', option.label, value)
}

const handleDynamicChange = (value: any, option: any) => {
  console.log('动态选项选择:', option.label, value)
}

const getSelectedLabel = (value: any, options: any[]) => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : '未选择'
}

const addOption = () => {
  const newIndex = dynamicOptions.value.length + 1
  dynamicOptions.value.push({
    label: `新选项${newIndex}`,
    value: `new${newIndex}`
  })
}

const removeOption = () => {
  if (dynamicOptions.value.length > 1) {
    dynamicOptions.value.pop()
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.demo-section h3 {
  margin-top: 0;
  color: #303133;
}

.demo-section p {
  margin: 10px 0;
  color: #606266;
  font-size: 14px;
}

.button-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.button-group > * {
  flex: 1;
  min-width: 150px;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #66b1ff;
}
</style>
