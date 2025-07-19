<template>
  <div class="demo-page">
    <div class="demo-header">
      <h1>SearchSelector 组件演示</h1>
      <p>展示企业搜索选择器的各种功能和数据展示</p>
    </div>

    <div class="demo-grid">
      <!-- 基本功能演示 -->
      <div class="demo-card">
        <h3>🔍 基本搜索功能</h3>
        <SearchSelector
          v-model="selectedCompany1"
          :data-source="searchCompanies"
          placeholder="搜索企业"
          search-placeholder="输入企业名称、类型或地址"
          remote
          :debounce-delay="300"
          @change="handleChange1"
        />
        <div class="result-display">
          <p><strong>选中企业:</strong> {{ getCompanyLabel(selectedCompany1) }}</p>
        </div>
      </div>

      <!-- 自定义样式演示 -->
      <div class="demo-card">
        <h3>🎨 自定义选项样式</h3>
        <SearchSelector
          v-model="selectedCompany2"
          :data-source="searchCompanies"
          placeholder="选择企业"
          :popover-width="450"
          remote
          @change="handleChange2"
        >
          <template #option="{ option }">
            <div class="custom-option">
              <div class="option-header">
                <span class="option-name">{{ option.label }}</span>
                <span class="option-type" :class="getTypeClass(option.type)">{{ option.type }}</span>
              </div>
              <div class="option-details">
                <span class="option-code">{{ option.code }}</span>
                <span class="option-scale">{{ option.scale }}企业</span>
              </div>
              <div class="option-address">{{ option.address }}</div>
            </div>
          </template>
        </SearchSelector>
        <div class="result-display">
          <p><strong>选中企业:</strong> {{ getCompanyLabel(selectedCompany2) }}</p>
        </div>
      </div>

      <!-- 不同配置演示 -->
      <div class="demo-card">
        <h3>⚙️ 配置选项</h3>
        <div class="config-section">
          <label>
            <span>防抖延迟:</span>
            <select v-model="config.debounceDelay">
              <option :value="100">100ms</option>
              <option :value="300">300ms</option>
              <option :value="500">500ms</option>
              <option :value="1000">1000ms</option>
            </select>
          </label>
          <label>
            <span>最小搜索长度:</span>
            <select v-model="config.minSearchLength">
              <option :value="0">0</option>
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
            </select>
          </label>
          <label>
            <span>弹出框宽度:</span>
            <select v-model="config.popoverWidth">
              <option :value="300">300px</option>
              <option :value="400">400px</option>
              <option :value="500">500px</option>
              <option :value="600">600px</option>
            </select>
          </label>
        </div>
        <SearchSelector
          v-model="selectedCompany3"
          :data-source="searchCompanies"
          placeholder="测试配置"
          :debounce-delay="config.debounceDelay"
          :min-search-length="config.minSearchLength"
          :popover-width="config.popoverWidth"
          remote
          @change="handleChange3"
        />
        <div class="result-display">
          <p><strong>当前配置:</strong></p>
          <ul>
            <li>防抖延迟: {{ config.debounceDelay }}ms</li>
            <li>最小搜索长度: {{ config.minSearchLength }}</li>
            <li>弹出框宽度: {{ config.popoverWidth }}px</li>
          </ul>
        </div>
      </div>

      <!-- 按钮样式演示 -->
      <div class="demo-card">
        <h3>🎯 按钮样式</h3>
        <div class="button-styles">
          <SearchSelector
            v-model="selectedCompany4"
            :data-source="searchCompanies"
            placeholder="Primary"
            button-type="primary"
            button-size="small"
            remote
          />
          <SearchSelector
            v-model="selectedCompany5"
            :data-source="searchCompanies"
            placeholder="Success"
            button-type="success"
            button-size="default"
            remote
          />
          <SearchSelector
            v-model="selectedCompany6"
            :data-source="searchCompanies"
            placeholder="Warning"
            button-type="warning"
            button-size="large"
            remote
          />
        </div>
      </div>

      <!-- 数据统计演示 -->
      <div class="demo-card full-width">
        <h3>📊 搜索统计</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">搜索次数</span>
            <span class="stat-value">{{ searchStats.count }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最后搜索</span>
            <span class="stat-value">{{ searchStats.lastKeyword || '无' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">选择次数</span>
            <span class="stat-value">{{ searchStats.selections }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最后选择</span>
            <span class="stat-value">{{ searchStats.lastSelected || '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 企业类型分布 -->
      <div class="demo-card full-width">
        <h3>🏢 企业类型分布</h3>
        <div class="type-distribution">
          <div 
            v-for="(count, type) in typeDistribution" 
            :key="type"
            class="type-item"
            :class="getTypeClass(type)"
          >
            <span class="type-name">{{ type }}</span>
            <span class="type-count">{{ count }}家</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SearchSelector from './components/SearchSelector.vue'
import { searchCompanies, getCompanyTypes, type Company } from './services/companyService'

// 选择的企业
const selectedCompany1 = ref()
const selectedCompany2 = ref()
const selectedCompany3 = ref()
const selectedCompany4 = ref()
const selectedCompany5 = ref()
const selectedCompany6 = ref()

// 配置选项
const config = ref({
  debounceDelay: 300,
  minSearchLength: 0,
  popoverWidth: 400
})

// 搜索统计
const searchStats = ref({
  count: 0,
  lastKeyword: '',
  selections: 0,
  lastSelected: ''
})

// 企业类型分布
const typeDistribution = ref<Record<string, number>>({})

// 获取企业标签
const getCompanyLabel = (value: any) => {
  if (!value) return '未选择'
  // 这里可以根据value查找对应的企业名称
  return `企业ID: ${value}`
}

// 获取类型样式类
const getTypeClass = (type?: string) => {
  const typeClasses: Record<string, string> = {
    '新能源': 'type-new-energy',
    '光伏': 'type-solar',
    '储能': 'type-storage',
    '风电': 'type-wind',
    '水电': 'type-hydro',
    '氢能': 'type-hydrogen',
    '智能电网': 'type-smart-grid',
    '分布式能源': 'type-distributed',
    '节能环保': 'type-environmental',
    '海洋能源': 'type-marine',
    '绿色建筑': 'type-green-building',
    '生物质能源': 'type-biomass',
    '清洁能源': 'type-clean',
    '可再生能源': 'type-renewable',
    '能源管理': 'type-management',
    '环保能源': 'type-eco',
    '绿色电力': 'type-green-power'
  }
  return typeClasses[type || ''] || 'type-default'
}

// 事件处理
const handleChange1 = (value: any, option: Company) => {
  searchStats.value.selections++
  searchStats.value.lastSelected = option.label
}

const handleChange2 = (value: any, option: Company) => {
  searchStats.value.selections++
  searchStats.value.lastSelected = option.label
}

const handleChange3 = (value: any, option: Company) => {
  searchStats.value.selections++
  searchStats.value.lastSelected = option.label
}

// 初始化数据
onMounted(async () => {
  try {
    // 获取所有企业数据来统计类型分布
    const companies = await searchCompanies('')
    const distribution: Record<string, number> = {}
    
    companies.forEach(company => {
      const type = company.type || '其他'
      distribution[type] = (distribution[type] || 0) + 1
    })
    
    typeDistribution.value = distribution
  } catch (error) {
    console.error('初始化数据失败:', error)
  }
})

defineOptions({
  name: "SearchSelectorDemo"
})
</script>

<style scoped>
.demo-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f7fa;
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.demo-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.demo-header p {
  color: #7f8c8d;
  font-size: 16px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.demo-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
}

.demo-card.full-width {
  grid-column: 1 / -1;
}

.demo-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 18px;
}

.result-display {
  margin-top: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.config-section label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.config-section select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100px;
}

.button-styles {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #495057;
}

.type-distribution {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.type-item {
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-size: 12px;
}

.type-name {
  display: block;
  font-weight: 500;
  margin-bottom: 2px;
}

.type-count {
  display: block;
  font-size: 11px;
  opacity: 0.8;
}

/* 企业类型样式 */
.type-new-energy { background: #e3f2fd; color: #1976d2; }
.type-solar { background: #fff3e0; color: #f57c00; }
.type-storage { background: #e8f5e8; color: #388e3c; }
.type-wind { background: #f3e5f5; color: #7b1fa2; }
.type-hydro { background: #e0f2f1; color: #00695c; }
.type-hydrogen { background: #fce4ec; color: #c2185b; }
.type-smart-grid { background: #e8eaf6; color: #3f51b5; }
.type-distributed { background: #fff8e1; color: #ff8f00; }
.type-environmental { background: #e0f7fa; color: #0097a7; }
.type-marine { background: #e1f5fe; color: #0277bd; }
.type-green-building { background: #f1f8e9; color: #689f38; }
.type-biomass { background: #efebe9; color: #5d4037; }
.type-clean { background: #e8f5e8; color: #2e7d32; }
.type-renewable { background: #e3f2fd; color: #1565c0; }
.type-management { background: #fafafa; color: #424242; }
.type-eco { background: #e0f2f1; color: #00796b; }
.type-green-power { background: #e8f5e8; color: #43a047; }
.type-default { background: #f5f5f5; color: #757575; }

/* 自定义选项样式 */
.custom-option {
  padding: 8px 0;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.option-name {
  font-weight: 500;
  color: #2c3e50;
}

.option-type {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.option-details {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #6c757d;
  margin-bottom: 2px;
}

.option-code {
  font-family: monospace;
}

.option-address {
  font-size: 11px;
  color: #6c757d;
  line-height: 1.3;
}
</style>
