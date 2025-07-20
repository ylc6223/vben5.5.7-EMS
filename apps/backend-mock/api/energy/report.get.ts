import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import { MOCK_ENTERPRISE_ENERGY_REPORT_DATA } from '~/utils/mock-data';

// 生成动态Mock数据的函数
function generateDynamicMockData(startTime?: string, endTime?: string, reportType: 'monthly' | 'yearly' = 'monthly') {
  const data = [];

  // 如果没有提供时间范围，使用默认数据
  if (!startTime || !endTime) {
    return [...MOCK_ENTERPRISE_ENERGY_REPORT_DATA];
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (reportType === 'monthly') {
    // 月报：按日期生成数据
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const actualDays = Math.min(diffDays, 31);

    for (let i = 0; i < actualDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      if (currentDate > end) break;

      const dateStr = currentDate.toISOString().split('T')[0];
      const baseIndex = i % MOCK_ENTERPRISE_ENERGY_REPORT_DATA.length;
      const baseData = MOCK_ENTERPRISE_ENERGY_REPORT_DATA[baseIndex];

      // 添加随机变化（±10%）
      const randomFactor = () => 0.9 + Math.random() * 0.2;
      const newData: any = { ...baseData, time: dateStr };

      Object.keys(baseData).forEach(key => {
        if (key !== 'time' && typeof (baseData as any)[key] === 'number') {
          newData[key] = Number(((baseData as any)[key] * randomFactor()).toFixed(1));
        }
      });

      data.push(newData);
    }
  } else {
    // 年报：按月份生成数据
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    let currentYear = startYear;
    let currentMonth = startMonth;

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
      const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
      const baseIndex = currentMonth % MOCK_ENTERPRISE_ENERGY_REPORT_DATA.length;
      const baseData = MOCK_ENTERPRISE_ENERGY_REPORT_DATA[baseIndex];

      // 年报数据通常比月报数据大（月度汇总）
      const monthlyFactor = () => 25 + Math.random() * 10; // 25-35倍
      const newData: any = { ...baseData, time: monthStr };

      Object.keys(baseData).forEach(key => {
        if (key !== 'time' && typeof (baseData as any)[key] === 'number') {
          newData[key] = Number(((baseData as any)[key] * monthlyFactor()).toFixed(1));
        }
      });

      data.push(newData);

      // 移动到下一个月
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
  }

  return data;
}

export default defineEventHandler(async (event) => {
  // 暂时跳过token验证，先确保API能工作
  // const userinfo = verifyAccessToken(event);
  // if (!userinfo) {
  //   return unAuthorizedResponse(event);
  // }

  console.log('Energy report API called');

  // 获取查询参数
  const query = getQuery(event);
  const { startTime, endTime, reportType } = query;

  console.log('Query params:', { startTime, endTime, reportType });

  // 生成动态数据
  const filteredData = generateDynamicMockData(
    startTime as string,
    endTime as string,
    (reportType as 'monthly' | 'yearly') || 'monthly'
  );

  console.log('Generated data length:', filteredData.length);

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  return useResponseSuccess({
    items: filteredData,
    total: filteredData.length,
  });
});
