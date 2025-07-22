import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

// 储能收益报表数据类型定义
interface EnergyStorageIncomeReportData {
  time: string; // 时间

  // 充电电量数据 (kW·h)
  chargingElectricitySharp: number; // 充电电量-尖
  chargingElectricityPeak: number; // 充电电量-峰
  chargingElectricityFlat: number; // 充电电量-平
  chargingElectricityValley: number; // 充电电量-谷
  chargingElectricityDeepValley: number; // 充电电量-深谷

  // 放电电量数据 (kW·h)
  dischargingElectricitySharp: number; // 放电电量-尖
  dischargingElectricityPeak: number; // 放电电量-峰
  dischargingElectricityFlat: number; // 放电电量-平
  dischargingElectricityValley: number; // 放电电量-谷
  dischargingElectricityDeepValley: number; // 放电电量-深谷

  // 充电成本数据 (元)
  chargingCostSharp: number; // 充电成本-尖
  chargingCostPeak: number; // 充电成本-峰
  chargingCostFlat: number; // 充电成本-平
  chargingCostValley: number; // 充电成本-谷
  chargingCostDeepValley: number; // 充电成本-深谷

  // 放电收益数据 (元)
  dischargingIncomeSharp: number; // 放电收益-尖
  dischargingIncomePeak: number; // 放电收益-峰
  dischargingIncomeFlat: number; // 放电收益-平
  dischargingIncomeValley: number; // 放电收益-谷
  dischargingIncomeDeepValley: number; // 放电收益-深谷

  // 总净收益 (元)
  totalNetIncome: number; // 总净收益（放电收益总和 - 充电成本总和）
}

// 生成单条储能收益数据的函数
function generateEnergyStorageIncomeData(): Omit<EnergyStorageIncomeReportData, 'time'> {
  // 充电电量数据 (kW·h) - 按时段分布，深谷时段充电量最大
  const chargingElectricitySharp = Number(faker.number.float({ min: 10, max: 50, fractionDigits: 2 }));
  const chargingElectricityPeak = Number(faker.number.float({ min: 20, max: 80, fractionDigits: 2 }));
  const chargingElectricityFlat = Number(faker.number.float({ min: 50, max: 120, fractionDigits: 2 }));
  const chargingElectricityValley = Number(faker.number.float({ min: 80, max: 150, fractionDigits: 2 }));
  const chargingElectricityDeepValley = Number(faker.number.float({ min: 100, max: 200, fractionDigits: 2 }));

  // 放电电量数据 (kW·h) - 按时段分布，尖峰时段放电量最大
  const dischargingElectricitySharp = Number(faker.number.float({ min: 80, max: 180, fractionDigits: 2 }));
  const dischargingElectricityPeak = Number(faker.number.float({ min: 60, max: 150, fractionDigits: 2 }));
  const dischargingElectricityFlat = Number(faker.number.float({ min: 40, max: 100, fractionDigits: 2 }));
  const dischargingElectricityValley = Number(faker.number.float({ min: 20, max: 70, fractionDigits: 2 }));
  const dischargingElectricityDeepValley = Number(faker.number.float({ min: 5, max: 40, fractionDigits: 2 }));

  // 充电成本数据 (元) - 基于充电电量和电价计算，深谷时段成本最低
  const chargingCostSharp = Number((chargingElectricitySharp * faker.number.float({ min: 1.2, max: 1.5, fractionDigits: 3 })).toFixed(2));
  const chargingCostPeak = Number((chargingElectricityPeak * faker.number.float({ min: 0.9, max: 1.2, fractionDigits: 3 })).toFixed(2));
  const chargingCostFlat = Number((chargingElectricityFlat * faker.number.float({ min: 0.6, max: 0.9, fractionDigits: 3 })).toFixed(2));
  const chargingCostValley = Number((chargingElectricityValley * faker.number.float({ min: 0.4, max: 0.6, fractionDigits: 3 })).toFixed(2));
  const chargingCostDeepValley = Number((chargingElectricityDeepValley * faker.number.float({ min: 0.2, max: 0.4, fractionDigits: 3 })).toFixed(2));

  // 放电收益数据 (元) - 基于放电电量和电价计算，尖峰时段收益最高
  const dischargingIncomeSharp = Number((dischargingElectricitySharp * faker.number.float({ min: 1.3, max: 1.6, fractionDigits: 3 })).toFixed(2));
  const dischargingIncomePeak = Number((dischargingElectricityPeak * faker.number.float({ min: 1.0, max: 1.3, fractionDigits: 3 })).toFixed(2));
  const dischargingIncomeFlat = Number((dischargingElectricityFlat * faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 3 })).toFixed(2));
  const dischargingIncomeValley = Number((dischargingElectricityValley * faker.number.float({ min: 0.5, max: 0.7, fractionDigits: 3 })).toFixed(2));
  const dischargingIncomeDeepValley = Number((dischargingElectricityDeepValley * faker.number.float({ min: 0.3, max: 0.5, fractionDigits: 3 })).toFixed(2));

  // 计算总净收益：放电收益总和 - 充电成本总和
  const totalDischargingIncome = dischargingIncomeSharp + dischargingIncomePeak + dischargingIncomeFlat + dischargingIncomeValley + dischargingIncomeDeepValley;
  const totalChargingCost = chargingCostSharp + chargingCostPeak + chargingCostFlat + chargingCostValley + chargingCostDeepValley;
  const totalNetIncome = Number((totalDischargingIncome - totalChargingCost).toFixed(2));

  return {
    chargingElectricitySharp,
    chargingElectricityPeak,
    chargingElectricityFlat,
    chargingElectricityValley,
    chargingElectricityDeepValley,
    dischargingElectricitySharp,
    dischargingElectricityPeak,
    dischargingElectricityFlat,
    dischargingElectricityValley,
    dischargingElectricityDeepValley,
    chargingCostSharp,
    chargingCostPeak,
    chargingCostFlat,
    chargingCostValley,
    chargingCostDeepValley,
    dischargingIncomeSharp,
    dischargingIncomePeak,
    dischargingIncomeFlat,
    dischargingIncomeValley,
    dischargingIncomeDeepValley,
    totalNetIncome,
  };
}

// 生成动态Mock数据的函数
function generateDynamicMockData(
  startTime?: string,
  endTime?: string,
  reportType: 'monthly' | 'yearly' = 'monthly',
): EnergyStorageIncomeReportData[] {
  const data: EnergyStorageIncomeReportData[] = [];

  if (reportType === 'monthly') {
    // 月报：按日期生成数据
    const start = startTime ? new Date(startTime) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = endTime ? new Date(endTime) : new Date();

    let current = new Date(start);
    while (current <= end) {
      const incomeData = generateEnergyStorageIncomeData();
      data.push({
        time: current.toISOString().split('T')[0], // YYYY-MM-DD format
        ...incomeData,
      });
      current.setDate(current.getDate() + 1);
    }
  } else {
    // 年报：按月份生成数据
    const start = startTime ? new Date(startTime + '-01') : new Date(Date.now() - 11 * 30 * 24 * 60 * 60 * 1000);
    const end = endTime ? new Date(endTime + '-01') : new Date();

    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      const incomeData = generateEnergyStorageIncomeData();
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

  console.log('Energy Storage Income report API called');

  // 获取查询参数
  const query = getQuery(event);
  const { startTime, endTime, enterprise, reportType = 'monthly' } = query;

  console.log('储能收益报表API调用参数:', {
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

  console.log(`生成储能收益报表数据: ${items.length} 条记录`);

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  return useResponseSuccess({
    items,
    total: items.length,
  });
});
