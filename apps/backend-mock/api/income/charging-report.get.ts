import { faker } from '@faker-js/faker/locale/zh_CN';

import { useResponseSuccess } from '~/utils/response';

// 充电收益报表数据类型定义
interface ChargingIncomeReportData {
  time: string; // 时间字段

  // 尖时段
  sharpElectricity: number; // 尖电量(kW·h)
  sharpCost: number; // 尖成本(元)

  // 峰时段
  peakElectricity: number; // 峰电量(kW·h)
  peakCost: number; // 峰成本(元)

  // 平时段
  flatElectricity: number; // 平电量(kW·h)
  flatCost: number; // 平成本(元)

  // 谷时段
  valleyElectricity: number; // 谷电量(kW·h)
  valleyCost: number; // 谷成本(元)

  // 深谷时段
  deepValleyElectricity: number; // 深谷电量(kW·h)
  deepValleyCost: number; // 深谷成本(元)

  // 汇总列
  chargingAmount: number; // 充电金额(元)
  netProfit: number; // 净收益(元) = 充电金额 - 总成本
}

// 生成单条充电收益数据的函数
function generateChargingIncomeData(): Omit<ChargingIncomeReportData, 'time'> {
  // 尖时段数据 - 电价最高，用电量相对较少
  const sharpElectricity = Number(faker.number.float({ min: 50, max: 200, fractionDigits: 2 }));
  const sharpCost = Number((sharpElectricity * faker.number.float({ min: 1.2, max: 1.5, fractionDigits: 4 })).toFixed(2));

  // 峰时段数据 - 电价较高，用电量适中
  const peakElectricity = Number(faker.number.float({ min: 100, max: 300, fractionDigits: 2 }));
  const peakCost = Number((peakElectricity * faker.number.float({ min: 0.9, max: 1.2, fractionDigits: 4 })).toFixed(2));

  // 平时段数据 - 电价适中，用电量适中
  const flatElectricity = Number(faker.number.float({ min: 150, max: 400, fractionDigits: 2 }));
  const flatCost = Number((flatElectricity * faker.number.float({ min: 0.6, max: 0.9, fractionDigits: 4 })).toFixed(2));

  // 谷时段数据 - 电价较低，用电量较多
  const valleyElectricity = Number(faker.number.float({ min: 200, max: 500, fractionDigits: 2 }));
  const valleyCost = Number((valleyElectricity * faker.number.float({ min: 0.3, max: 0.6, fractionDigits: 4 })).toFixed(2));

  // 深谷时段数据 - 电价最低，用电量最多
  const deepValleyElectricity = Number(faker.number.float({ min: 300, max: 600, fractionDigits: 2 }));
  const deepValleyCost = Number((deepValleyElectricity * faker.number.float({ min: 0.1, max: 0.3, fractionDigits: 4 })).toFixed(2));

  // 计算总成本
  const totalCost = Number((sharpCost + peakCost + flatCost + valleyCost + deepValleyCost).toFixed(2));

  // 计算充电金额（比总成本高20%-50%，模拟充电服务费）
  const profitMargin = faker.number.float({ min: 1.2, max: 1.5, fractionDigits: 3 });
  const chargingAmount = Number((totalCost * profitMargin).toFixed(2));

  // 计算净收益 = 充电金额 - 总成本
  const netProfit = Number((chargingAmount - totalCost).toFixed(2));

  return {
    sharpElectricity,
    sharpCost,
    peakElectricity,
    peakCost,
    flatElectricity,
    flatCost,
    valleyElectricity,
    valleyCost,
    deepValleyElectricity,
    deepValleyCost,
    chargingAmount,
    netProfit,
  };
}

// 生成动态Mock数据的函数
function generateDynamicMockData(
  startTime?: string,
  endTime?: string,
  reportType: 'monthly' | 'yearly' = 'monthly',
): ChargingIncomeReportData[] {
  const data: ChargingIncomeReportData[] = [];

  if (reportType === 'monthly') {
    // 月报：生成日期数据
    const start = startTime ? new Date(startTime) : new Date();
    const end = endTime ? new Date(endTime) : new Date();

    // 确保开始日期不晚于结束日期
    if (start > end) {
      return data;
    }

    const current = new Date(start);
    while (current <= end) {
      const timeStr = current.toISOString().split('T')[0]; // YYYY-MM-DD 格式

      data.push({
        time: timeStr,
        ...generateChargingIncomeData(),
      });

      current.setDate(current.getDate() + 1);
    }
  } else {
    // 年报：生成月份数据
    const start = startTime ? new Date(startTime + '-01') : new Date();
    const end = endTime ? new Date(endTime + '-01') : new Date();

    // 确保开始月份不晚于结束月份
    if (start > end) {
      return data;
    }

    const current = new Date(start);
    while (current <= end) {
      const timeStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM 格式

      data.push({
        time: timeStr,
        ...generateChargingIncomeData(),
      });

      current.setMonth(current.getMonth() + 1);
    }
  }

  return data;
}

export default defineEventHandler(async (event) => {
  console.log('Charging Income report API called');

  // 获取查询参数
  const query = getQuery(event);
  const { startTime, endTime, enterprise, reportType = 'monthly' } = query;

  console.log('充电收益报表API调用参数:', {
    startTime,
    endTime,
    enterprise,
    reportType,
  });

  // 如果没有选择企业，返回空数据
  if (!enterprise) {
    console.log('未选择企业，返回空数据');
    return useResponseSuccess({
      items: [],
      total: 0,
    });
  }

  // 生成动态Mock数据
  const items = generateDynamicMockData(
    startTime as string,
    endTime as string,
    reportType as 'monthly' | 'yearly',
  );

  console.log(`充电收益报表Mock数据生成完成，共 ${items.length} 条记录`);

  return useResponseSuccess({
    items,
    total: items.length,
  });
});
