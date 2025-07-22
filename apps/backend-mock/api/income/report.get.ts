import { faker } from '@faker-js/faker/locale/zh_CN';

import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

// 企业收益报表数据类型定义
interface EnterpriseIncomeReportData {
  time: string; // 时间
  // 售电收益数据
  electricityIncomeSharp: number;
  electricityIncomePeak: number;
  electricityIncomeFlat: number;
  electricityIncomeValley: number;
  electricityIncomeDeepValley: number;
  electricityIncomeTotal: number;
  // 风电收益数据
  windIncomeSharp: number;
  windIncomePeak: number;
  windIncomeFlat: number;
  windIncomeValley: number;
  windIncomeDeepValley: number;
  windIncomeTotal: number;
  // 储能收益数据 - 充电部分
  storageChargeIncomeSharp: number;
  storageChargeIncomePeak: number;
  storageChargeIncomeFlat: number;
  storageChargeIncomeValley: number;
  storageChargeIncomeDeepValley: number;
  storageChargeIncomeTotal: number;
  // 储能收益数据 - 放电部分
  storageDischargeIncomeSharp: number;
  storageDischargeIncomePeak: number;
  storageDischargeIncomeFlat: number;
  storageDischargeIncomeValley: number;
  storageDischargeIncomeDeepValley: number;
  storageDischargeIncomeTotal: number;
  // 充电收益数据
  chargingIncomeSharp: number;
  chargingIncomePeak: number;
  chargingIncomeFlat: number;
  chargingIncomeValley: number;
  chargingIncomeDeepValley: number;
  chargingIncomeTotal: number;
  // 电网收益数据
  gridIncomeSharp: number;
  gridIncomePeak: number;
  gridIncomeFlat: number;
  gridIncomeValley: number;
  gridIncomeDeepValley: number;
  gridIncomeTotal: number;
  // 光伏收益数据 - 消纳部分
  solarConsumptionIncomeSharp: number;
  solarConsumptionIncomePeak: number;
  solarConsumptionIncomeFlat: number;
  solarConsumptionIncomeValley: number;
  solarConsumptionIncomeDeepValley: number;
  solarConsumptionIncomeTotal: number;
  // 光伏收益数据 - 上网和总计
  gridConnectionIncome: number;
  grandTotalIncome: number;
  // 新增光伏字段 - 按图片结构
  solarConsumptionAmount: number; // 光伏消纳量(kW·h)
  solarGridConnectionAmount: number; // 光伏并网量(kW·h)
  solarIncome: number; // 光伏收益(元)
  // 新增储能字段 - 按图片结构
  storageChargeAmount: number; // 储能充电量(kW·h)
  storageDischargeAmount: number; // 储能放电量(kW·h)
  storageIncomeTotal: number; // 储能收益(元)
  // 新增充电桩字段 - 按图片结构
  chargingPileAmount: number; // 充电桩电量(kW·h)
  chargingPileIncome: number; // 充电桩收益(元)
  // 新增风电字段 - 按图片结构
  windConsumptionAmount: number; // 风电消纳量(kW·h)
  windGridConnectionAmount: number; // 风电并网量(kW·h)
  windIncome: number; // 风电收益(元)
}

// 生成单条收益数据的函数
function generateIncomeData(): Omit<EnterpriseIncomeReportData, 'time'> {
  // 售电收益数据 (元)
  const electricityIncomeSharp = Number(faker.number.float({ min: 1000, max: 5000, fractionDigits: 2 }));
  const electricityIncomePeak = Number(faker.number.float({ min: 800, max: 4000, fractionDigits: 2 }));
  const electricityIncomeFlat = Number(faker.number.float({ min: 600, max: 3000, fractionDigits: 2 }));
  const electricityIncomeValley = Number(faker.number.float({ min: 400, max: 2000, fractionDigits: 2 }));
  const electricityIncomeDeepValley = Number(faker.number.float({ min: 200, max: 1000, fractionDigits: 2 }));
  const electricityIncomeTotal = Number((electricityIncomeSharp + electricityIncomePeak + electricityIncomeFlat + electricityIncomeValley + electricityIncomeDeepValley).toFixed(2));

  // 风电收益数据 (元)
  const windIncomeSharp = Number(faker.number.float({ min: 800, max: 4000, fractionDigits: 2 }));
  const windIncomePeak = Number(faker.number.float({ min: 600, max: 3000, fractionDigits: 2 }));
  const windIncomeFlat = Number(faker.number.float({ min: 400, max: 2000, fractionDigits: 2 }));
  const windIncomeValley = Number(faker.number.float({ min: 300, max: 1500, fractionDigits: 2 }));
  const windIncomeDeepValley = Number(faker.number.float({ min: 100, max: 800, fractionDigits: 2 }));
  const windIncomeTotal = Number((windIncomeSharp + windIncomePeak + windIncomeFlat + windIncomeValley + windIncomeDeepValley).toFixed(2));

  // 储能充电收益数据 (元)
  const storageChargeIncomeSharp = Number(faker.number.float({ min: 200, max: 1000, fractionDigits: 2 }));
  const storageChargeIncomePeak = Number(faker.number.float({ min: 150, max: 800, fractionDigits: 2 }));
  const storageChargeIncomeFlat = Number(faker.number.float({ min: 100, max: 600, fractionDigits: 2 }));
  const storageChargeIncomeValley = Number(faker.number.float({ min: 80, max: 400, fractionDigits: 2 }));
  const storageChargeIncomeDeepValley = Number(faker.number.float({ min: 50, max: 200, fractionDigits: 2 }));
  const storageChargeIncomeTotal = Number((storageChargeIncomeSharp + storageChargeIncomePeak + storageChargeIncomeFlat + storageChargeIncomeValley + storageChargeIncomeDeepValley).toFixed(2));

  // 储能放电收益数据 (元)
  const storageDischargeIncomeSharp = Number(faker.number.float({ min: 300, max: 1500, fractionDigits: 2 }));
  const storageDischargeIncomePeak = Number(faker.number.float({ min: 250, max: 1200, fractionDigits: 2 }));
  const storageDischargeIncomeFlat = Number(faker.number.float({ min: 200, max: 1000, fractionDigits: 2 }));
  const storageDischargeIncomeValley = Number(faker.number.float({ min: 150, max: 800, fractionDigits: 2 }));
  const storageDischargeIncomeDeepValley = Number(faker.number.float({ min: 100, max: 500, fractionDigits: 2 }));
  const storageDischargeIncomeTotal = Number((storageDischargeIncomeSharp + storageDischargeIncomePeak + storageDischargeIncomeFlat + storageDischargeIncomeValley + storageDischargeIncomeDeepValley).toFixed(2));

  // 充电收益数据 (元)
  const chargingIncomeSharp = Number(faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }));
  const chargingIncomePeak = Number(faker.number.float({ min: 400, max: 2000, fractionDigits: 2 }));
  const chargingIncomeFlat = Number(faker.number.float({ min: 300, max: 1500, fractionDigits: 2 }));
  const chargingIncomeValley = Number(faker.number.float({ min: 200, max: 1000, fractionDigits: 2 }));
  const chargingIncomeDeepValley = Number(faker.number.float({ min: 100, max: 500, fractionDigits: 2 }));
  const chargingIncomeTotal = Number((chargingIncomeSharp + chargingIncomePeak + chargingIncomeFlat + chargingIncomeValley + chargingIncomeDeepValley).toFixed(2));

  // 电网收益数据 (元)
  const gridIncomeSharp = Number(faker.number.float({ min: 600, max: 3000, fractionDigits: 2 }));
  const gridIncomePeak = Number(faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }));
  const gridIncomeFlat = Number(faker.number.float({ min: 400, max: 2000, fractionDigits: 2 }));
  const gridIncomeValley = Number(faker.number.float({ min: 300, max: 1500, fractionDigits: 2 }));
  const gridIncomeDeepValley = Number(faker.number.float({ min: 200, max: 1000, fractionDigits: 2 }));
  const gridIncomeTotal = Number((gridIncomeSharp + gridIncomePeak + gridIncomeFlat + gridIncomeValley + gridIncomeDeepValley).toFixed(2));

  // 光伏消纳收益数据 (元)
  const solarConsumptionIncomeSharp = Number(faker.number.float({ min: 400, max: 2000, fractionDigits: 2 }));
  const solarConsumptionIncomePeak = Number(faker.number.float({ min: 300, max: 1500, fractionDigits: 2 }));
  const solarConsumptionIncomeFlat = Number(faker.number.float({ min: 250, max: 1200, fractionDigits: 2 }));
  const solarConsumptionIncomeValley = Number(faker.number.float({ min: 200, max: 1000, fractionDigits: 2 }));
  const solarConsumptionIncomeDeepValley = Number(faker.number.float({ min: 150, max: 800, fractionDigits: 2 }));
  const solarConsumptionIncomeTotal = Number((solarConsumptionIncomeSharp + solarConsumptionIncomePeak + solarConsumptionIncomeFlat + solarConsumptionIncomeValley + solarConsumptionIncomeDeepValley).toFixed(2));

  // 光伏上网收益 (元)
  const gridConnectionIncome = Number(faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }));

  // 新增光伏字段数据生成
  const solarConsumptionAmount = Number(faker.number.float({ min: 100, max: 800, fractionDigits: 1 })); // 消纳量(kW·h)
  const solarGridConnectionAmount = Number(faker.number.float({ min: 50, max: 400, fractionDigits: 1 })); // 并网量(kW·h)
  const solarIncome = Number(faker.number.float({ min: 300, max: 1500, fractionDigits: 2 })); // 收益(元)

  // 新增储能字段数据生成
  const storageChargeAmount = Number(faker.number.float({ min: 80, max: 600, fractionDigits: 1 })); // 充电量(kW·h)
  const storageDischargeAmount = Number(faker.number.float({ min: 60, max: 500, fractionDigits: 1 })); // 放电量(kW·h)
  const storageIncomeTotal = Number(faker.number.float({ min: 200, max: 1200, fractionDigits: 2 })); // 收益(元)

  // 新增充电桩字段数据生成
  const chargingPileAmount = Number(faker.number.float({ min: 50, max: 400, fractionDigits: 1 })); // 电量(kW·h)
  const chargingPileIncome = Number(faker.number.float({ min: 150, max: 800, fractionDigits: 2 })); // 收益(元)

  // 新增风电字段数据生成
  const windConsumptionAmount = Number(faker.number.float({ min: 120, max: 900, fractionDigits: 1 })); // 消纳量(kW·h)
  const windGridConnectionAmount = Number(faker.number.float({ min: 80, max: 600, fractionDigits: 1 })); // 并网量(kW·h)
  const windIncome = Number(faker.number.float({ min: 400, max: 2000, fractionDigits: 2 })); // 收益(元)

  // 总收益现在由前端计算，这里保留原有的grandTotalIncome字段以保持兼容性
  const grandTotalIncome = 0; // 前端会重新计算，这里设为0

  return {
    electricityIncomeSharp,
    electricityIncomePeak,
    electricityIncomeFlat,
    electricityIncomeValley,
    electricityIncomeDeepValley,
    electricityIncomeTotal,
    windIncomeSharp,
    windIncomePeak,
    windIncomeFlat,
    windIncomeValley,
    windIncomeDeepValley,
    windIncomeTotal,
    storageChargeIncomeSharp,
    storageChargeIncomePeak,
    storageChargeIncomeFlat,
    storageChargeIncomeValley,
    storageChargeIncomeDeepValley,
    storageChargeIncomeTotal,
    storageDischargeIncomeSharp,
    storageDischargeIncomePeak,
    storageDischargeIncomeFlat,
    storageDischargeIncomeValley,
    storageDischargeIncomeDeepValley,
    storageDischargeIncomeTotal,
    chargingIncomeSharp,
    chargingIncomePeak,
    chargingIncomeFlat,
    chargingIncomeValley,
    chargingIncomeDeepValley,
    chargingIncomeTotal,
    gridIncomeSharp,
    gridIncomePeak,
    gridIncomeFlat,
    gridIncomeValley,
    gridIncomeDeepValley,
    gridIncomeTotal,
    solarConsumptionIncomeSharp,
    solarConsumptionIncomePeak,
    solarConsumptionIncomeFlat,
    solarConsumptionIncomeValley,
    solarConsumptionIncomeDeepValley,
    solarConsumptionIncomeTotal,
    gridConnectionIncome,
    grandTotalIncome,
    // 新增光伏字段
    solarConsumptionAmount,
    solarGridConnectionAmount,
    solarIncome,
    // 新增储能字段
    storageChargeAmount,
    storageDischargeAmount,
    storageIncomeTotal,
    // 新增充电桩字段
    chargingPileAmount,
    chargingPileIncome,
    // 新增风电字段
    windConsumptionAmount,
    windGridConnectionAmount,
    windIncome,
  };
}

// 生成动态Mock数据的函数
function generateDynamicMockData(
  startTime?: string,
  endTime?: string,
  reportType: 'monthly' | 'yearly' = 'monthly',
): EnterpriseIncomeReportData[] {
  const data: EnterpriseIncomeReportData[] = [];

  if (reportType === 'monthly') {
    // 月报：按日期生成数据
    const start = startTime ? new Date(startTime) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = endTime ? new Date(endTime) : new Date();

    let current = new Date(start);
    while (current <= end) {
      const incomeData = generateIncomeData();
      data.push({
        time: current.toISOString().split('T')[0], // YYYY-MM-DD format
        ...incomeData,
      });
      current.setDate(current.getDate() + 1);
    }
  } else {
    // 年报：按月份生成数据
    const start = startTime ? new Date(startTime) : new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1);
    const end = endTime ? new Date(endTime) : new Date();

    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      const incomeData = generateIncomeData();
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
  // 暂时跳过token验证，先确保API能工作
  // const userinfo = verifyAccessToken(event);
  // if (!userinfo) {
  //   return unAuthorizedResponse(event);
  // }

  console.log('Income report API called');

  // 获取查询参数
  const query = getQuery(event);
  const { startTime, endTime, enterprise, reportType = 'monthly' } = query;

  console.log('收益报表API调用参数:', {
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

  console.log(`生成收益报表数据: ${items.length} 条记录`);

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  return useResponseSuccess({
    items,
    total: items.length,
  });
});
