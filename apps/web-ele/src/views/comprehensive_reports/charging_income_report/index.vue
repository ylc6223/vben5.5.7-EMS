<template>
  <div class="charging-income-report">
    <div class="page-header">
      <h1>充电收益报表</h1>
      <p>Charging Income Report</p>
    </div>
    <div class="page-content">
      <el-card>
        <template #header>
          <span>充电收益报表内容</span>
        </template>
        <div class="content-placeholder">
          <el-empty description="页面内容待开发" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 充电收益报表页面
defineOptions({
  name: 'ChargingIncomeReport',
});
</script>

<style scoped>
.charging-income-report {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.content-placeholder {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
