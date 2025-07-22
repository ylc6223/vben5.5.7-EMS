import { faker } from '@faker-js/faker/locale/zh_CN';

import { useResponseSuccess } from '~/utils/response';

// 光伏收益报表数据类型定义
interface PhotovoltaicIncomeReportData {
  time: string; // 时间字段

  // 第一大列：消纳
  sharpAmount: number; // 尖电量(kWh)
  sharpIncome: number; // 尖收益(元)
  peakAmount: number; // 峰电量(kWh)
  peakIncome: number; // 峰收益(元)
  flatAmount: number; // 平电量(kWh)
  flatIncome: number; // 平收益(元)
  valleyAmount: number; // 谷电量(kWh)
  valleyIncome: number; // 谷收益(元)
  deepValleyAmount: number; // 深谷电量(kWh)
  deepValleyIncome: number; // 深谷收益(元)
  consumptionTotalIncome: number; // 消纳总收益(元)

  // 第二大列：上网
  gridAmount: number; // 上网电量(kWh)
  gridIncome: number; // 上网收益(元)

  // 第三大列：总
  totalAmount: number; // 总电量(kWh)
  totalIncome: number; // 总收益(元)
}

// 生成单条光伏收益数据的函数
function generatePhotovoltaicIncomeData(): Omit<PhotovoltaicIncomeReportData, 'time'> {
  // 第一大列：消纳
  const sharpAmount = Number(faker.number.float({ min: 100, max: 500, fractionDigits: 1 })); // 尖电量(kWh)
  const sharpIncome = Number(faker.number.float({ min: 80, max: 400, fractionDigits: 2 })); // 尖收益(元)
  const peakAmount = Number(faker.number.float({ min: 200, max: 800, fractionDigits: 1 })); // 峰电量(kWh)
  const peakIncome = Number(faker.number.float({ min: 150, max: 600, fractionDigits: 2 })); // 峰收益(元)
  const flatAmount = Number(faker.number.float({ min: 300, max: 1000, fractionDigits: 1 })); // 平电量(kWh)
  const flatIncome = Number(faker.number.float({ min: 200, max: 700, fractionDigits: 2 })); // 平收益(元)
  const valleyAmount = Number(faker.number.float({ min: 400, max: 1200, fractionDigits: 1 })); // 谷电量(kWh)
  const valleyIncome = Number(faker.number.float({ min: 250, max: 800, fractionDigits: 2 })); // 谷收益(元)
  const deepValleyAmount = Number(faker.number.float({ min: 500, max: 1500, fractionDigits: 1 })); // 深谷电量(kWh)
  const deepValleyIncome = Number(faker.number.float({ min: 300, max: 900, fractionDigits: 2 })); // 深谷收益(元)

  // 消纳总收益（各时段收益之和）
  const consumptionTotalIncome = Number((sharpIncome + peakIncome + flatIncome + valleyIncome + deepValleyIncome).toFixed(2));

  // 第二大列：上网
  const gridAmount = Number(faker.number.float({ min: 200, max: 800, fractionDigits: 1 })); // 上网电量(kWh)
  const gridIncome = Number(faker.number.float({ min: 150, max: 600, fractionDigits: 2 })); // 上网收益(元)

  // 第三大列：总（计算得出）
  const totalAmount = Number((sharpAmount + peakAmount + flatAmount + valleyAmount + deepValleyAmount + gridAmount).toFixed(1)); // 总电量
  const totalIncome = Number((consumptionTotalIncome + gridIncome).toFixed(2)); // 总收益

  return {
    // 消纳
    sharpAmount,
    sharpIncome,
    peakAmount,
    peakIncome,
    flatAmount,
    flatIncome,
    valleyAmount,
    valleyIncome,
    deepValleyAmount,
    deepValleyIncome,
    consumptionTotalIncome,

    // 上网
    gridAmount,
    gridIncome,

    // 总
    totalAmount,
    totalIncome,
  };
}

// 生成动态Mock数据的函数
function generateDynamicMockData(
  startTime?: string,
  endTime?: string,
  reportType: 'monthly' | 'yearly' = 'monthly',
): PhotovoltaicIncomeReportData[] {
  const data: PhotovoltaicIncomeReportData[] = [];

  if (reportType === 'monthly') {
    // 月报：按日期生成数据
    const start = startTime ? new Date(startTime) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = endTime ? new Date(endTime) : new Date();

    let current = new Date(start);
    while (current <= end) {
      const incomeData = generatePhotovoltaicIncomeData();
      data.push({
        time: current.toISOString().split('T')[0], // YYYY-MM-DD format
        ...incomeData,
      });
      current.setDate(current.getDate() + 1);
    }
  } else {
    // 年报：按月份生成数据
    const start = startTime ? new Date(startTime) : new Date(new Date().getFullYear() - 1, 0, 1);
    const end = endTime ? new Date(endTime) : new Date();

    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      const incomeData = generatePhotovoltaicIncomeData();
      // 年报数据通常比月报数据大（月度汇总）
      Object.keys(incomeData).forEach((key) => {
        if (typeof incomeData[key as keyof typeof incomeData] === 'number') {
          (incomeData as any)[key] = Number((incomeData[key as keyof typeof incomeData] * 30).toFixed(2));
        }
      });

      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      data.push({
        time: `${year}-${month}`, // YYYY-MM format
        ...incomeData,
      });
      current.setMonth(current.getMonth() + 1);
    }
  }

  return data;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log('光伏收益报表Mock API 查询参数:', query);

  const data = generateDynamicMockData(
    query.startTime as string,
    query.endTime as string,
    query.reportType as 'monthly' | 'yearly'
  );

  console.log('光伏收益报表Mock API 返回数据条数:', data.length);

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  return useResponseSuccess({
    items: data,
    total: data.length,
  });
});
