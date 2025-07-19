<template>
  <div class="demo-container">
    <h2>SearchSelector 高级功能演示</h2>
    
    <div class="demo-section">
      <h3>1. 异步数据源 + 远程搜索</h3>
      <SearchSelector
        v-model="selectedCompany"
        :data-source="searchCompanies"
        placeholder="请选择企业"
        search-placeholder="搜索企业名称、类型或地址"
        remote
        :debounce-delay="300"
        :min-search-length="0"
        :popover-width="450"
        @change="handleCompanyChange"
        @load-error="handleLoadError"
      >
        <template #option="{ option }">
          <div class="company-option">
            <div class="company-name">{{ option.label }}</div>
            <div class="company-info">
              <span class="company-type">{{ option.type }}</span>
              <span class="company-code">{{ option.code }}</span>
            </div>
            <div class="company-address">{{ option.address }}</div>
          </div>
        </template>
      </SearchSelector>
      <p>当前选中: {{ selectedCompany }}</p>
      <p>选中企业信息: {{ selectedCompanyInfo }}</p>
    </div>

    <div class="demo-section">
      <h3>2. 本地数据源（初始化加载）</h3>
      <SearchSelector
        v-model="selectedCity"
        :data-source="loadCities"
        placeholder="请选择城市"
        search-placeholder="搜索城市名称"
        :filterable="true"
        @change="handleCityChange"
        @load-error="handleLoadError"
      />
      <p>当前选中城市: {{ selectedCity }}</p>
    </div>

    <div class="demo-section">
      <h3>3. 静态选项 + 本地搜索</h3>
      <SearchSelector
        v-model="selectedDepartment"
        :options="departments"
        placeholder="请选择部门"
        search-placeholder="搜索部门名称"
        @change="handleDepartmentChange"
      />
      <p>当前选中部门: {{ selectedDepartment }}</p>
    </div>

    <div class="demo-section">
      <h3>4. 错误处理演示</h3>
      <SearchSelector
        v-model="selectedError"
        :data-source="errorDataSource"
        placeholder="测试错误处理"
        search-placeholder="输入任何内容触发错误"
        remote
        @change="handleErrorChange"
        @load-error="handleLoadError"
      />
      <p>当前选中: {{ selectedError }}</p>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    </div>

    <div class="demo-section">
      <h3>5. 自定义配置</h3>
      <div class="config-controls">
        <label>
          <input type="checkbox" v-model="customConfig.remote"> 远程模式
        </label>
        <label>
          <input type="number" v-model="customConfig.debounceDelay" min="0" max="2000"> 防抖延迟(ms)
        </label>
        <label>
          <input type="number" v-model="customConfig.minSearchLength" min="0" max="5"> 最小搜索长度
        </label>
      </div>
      <SearchSelector
        v-model="selectedCustom"
        :data-source="customDataSource"
        :remote="customConfig.remote"
        :debounce-delay="customConfig.debounceDelay"
        :min-search-length="customConfig.minSearchLength"
        placeholder="自定义配置测试"
        @change="handleCustomChange"
      />
      <p>当前选中: {{ selectedCustom }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchSelector from './SearchSelector.vue'
import { searchCompanies, type Company } from '../services/companyService'

// 企业选择
const selectedCompany = ref()
const selectedCompanyInfo = ref<Company | null>(null)

// 城市选择
const selectedCity = ref()

// 部门选择
const selectedDepartment = ref()
const departments = ref([
  { label: '技术部', value: 'tech' },
  { label: '市场部', value: 'marketing' },
  { label: '销售部', value: 'sales' },
  { label: '人事部', value: 'hr' },
  { label: '财务部', value: 'finance' }
])

// 错误处理
const selectedError = ref()
const errorMessage = ref('')

// 自定义配置
const selectedCustom = ref()
const customConfig = ref({
  remote: true,
  debounceDelay: 300,
  minSearchLength: 1
})

// 城市数据源（本地模式）
const loadCities = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
    { label: '杭州', value: 'hangzhou' },
    { label: '南京', value: 'nanjing' }
  ]
}

// 错误数据源
const errorDataSource = async (keyword?: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  throw new Error('模拟网络错误')
}

// 自定义数据源
const customDataSource = async (keyword?: string) => {
  await new Promise(resolve => setTimeout(resolve, customConfig.value.debounceDelay))
  
  const data = [
    { label: '自定义选项1', value: 'custom1' },
    { label: '自定义选项2', value: 'custom2' },
    { label: '自定义选项3', value: 'custom3' },
    { label: '测试选项A', value: 'testA' },
    { label: '测试选项B', value: 'testB' }
  ]
  
  if (!keyword) return data
  
  return data.filter(item => 
    item.label.toLowerCase().includes(keyword.toLowerCase())
  )
}

// 事件处理
const handleCompanyChange = (value: any, option: Company) => {
  selectedCompanyInfo.value = option
  console.log('选择企业:', option)
}

const handleCityChange = (value: any, option: any) => {
  console.log('选择城市:', option)
}

const handleDepartmentChange = (value: any, option: any) => {
  console.log('选择部门:', option)
}

const handleErrorChange = (value: any, option: any) => {
  console.log('错误测试选择:', option)
}

const handleCustomChange = (value: any, option: any) => {
  console.log('自定义配置选择:', option)
}

const handleLoadError = (error: any) => {
  errorMessage.value = `加载失败: ${error.message}`
  console.error('数据加载错误:', error)
  
  // 3秒后清除错误信息
  setTimeout(() => {
    errorMessage.value = ''
  }, 3000)
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 900px;
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

.company-option {
  padding: 4px 0;
}

.company-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.company-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.company-type {
  background: #f0f9ff;
  color: #0369a1;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.company-code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 11px;
  color: #909399;
}

.company-address {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.config-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.config-controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.config-controls input[type="number"] {
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.error-message {
  color: #f56c6c;
  background: #fef0f0;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #fbc4c4;
}
</style>
