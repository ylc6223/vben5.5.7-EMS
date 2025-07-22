import { faker } from '@faker-js/faker/locale/zh_CN';

import { useResponseSuccess } from '~/utils/response';

// 风电收益报表数据类型定义
interface WindPowerIncomeReportData {
  time: string; // 时间字段

  // 尖时段
  sharpElectricity: number; // 尖电量(kW·h)
  sharpIncome: number; // 尖收益(元)

  // 峰时段
  peakElectricity: number; // 峰电量(kW·h)
  peakIncome: number; // 峰收益(元)

  // 平时段
  flatElectricity: number; // 平电量(kW·h)
  flatIncome: number; // 平收益(元)

  // 谷时段
  valleyElectricity: number; // 谷电量(kW·h)
  valleyIncome: number; // 谷收益(元)

  // 深谷时段
  deepValleyElectricity: number; // 深谷电量(kW·h)
  deepValleyIncome: number; // 深谷收益(元)

  // 汇总列
  totalAmount: number; // 总发电量(kW·h)
  totalIncome: number; // 总收益(元)
}

// 生成单条风电收益数据的函数
function generateWindPowerIncomeData(): Omit<WindPowerIncomeReportData, 'time'> {
  // 尖时段数据 - 电价最高，发电量相对较少（风力通常在夜间较强）
  const sharpElectricity = Number(faker.number.float({ min: 80, max: 250, fractionDigits: 2 }));
  const sharpIncome = Number((sharpElectricity * faker.number.float({ min: 0.8, max: 1.2, fractionDigits: 4 })).toFixed(2));

  // 峰时段数据 - 电价较高，发电量适中
  const peakElectricity = Number(faker.number.float({ min: 120, max: 350, fractionDigits: 2 }));
  const peakIncome = Number((peakElectricity * faker.number.float({ min: 0.6, max: 0.9, fractionDigits: 4 })).toFixed(2));

  // 平时段数据 - 电价适中，发电量较高
  const flatElectricity = Number(faker.number.float({ min: 200, max: 450, fractionDigits: 2 }));
  const flatIncome = Number((flatElectricity * faker.number.float({ min: 0.4, max: 0.7, fractionDigits: 4 })).toFixed(2));

  // 谷时段数据 - 电价较低，发电量较高（夜间风力较强）
  const valleyElectricity = Number(faker.number.float({ min: 250, max: 500, fractionDigits: 2 }));
  const valleyIncome = Number((valleyElectricity * faker.number.float({ min: 0.3, max: 0.5, fractionDigits: 4 })).toFixed(2));

  // 深谷时段数据 - 电价最低，发电量最高（深夜风力最强）
  const deepValleyElectricity = Number(faker.number.float({ min: 300, max: 600, fractionDigits: 2 }));
  const deepValleyIncome = Number((deepValleyElectricity * faker.number.float({ min: 0.2, max: 0.4, fractionDigits: 4 })).toFixed(2));

  // 计算总发电量
  const totalAmount = Number((sharpElectricity + peakElectricity + flatElectricity + valleyElectricity + deepValleyElectricity).toFixed(2));

  // 计算总收益
  const totalIncome = Number((sharpIncome + peakIncome + flatIncome + valleyIncome + deepValleyIncome).toFixed(2));

  return {
    sharpElectricity,
    sharpIncome,
    peakElectricity,
    peakIncome,
    flatElectricity,
    flatIncome,
    valleyElectricity,
    valleyIncome,
    deepValleyElectricity,
    deepValleyIncome,
    totalAmount,
    totalIncome,
  };
}

// 生成动态Mock数据的函数
function generateDynamicMockData(
  startTime?: string,
  endTime?: string,
  reportType: 'monthly' | 'yearly' = 'monthly',
): WindPowerIncomeReportData[] {
  const data: WindPowerIncomeReportData[] = [];

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
        ...generateWindPowerIncomeData(),
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
        ...generateWindPowerIncomeData(),
      });

      current.setMonth(current.getMonth() + 1);
    }
  }

  return data;
}

export default defineEventHandler(async (event) => {
  console.log('Wind Power Income report API called');

  // 获取查询参数
  const query = getQuery(event);
  const { startTime, endTime, enterprise, reportType = 'monthly' } = query;

  console.log('风电收益报表API调用参数:', {
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

  console.log(`风电收益报表Mock数据生成完成，共 ${items.length} 条记录`);

  return useResponseSuccess({
    items,
    total: items.length,
  });
});
