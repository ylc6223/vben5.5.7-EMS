import { requestClient } from '#/api/request';

// 企业收益报表数据类型定义
export interface EnterpriseIncomeReportData {
  time: string; // 时间
  // 售电收益数据
  electricityIncomeSharp: number; // 售电收益-尖
  electricityIncomePeak: number; // 售电收益-峰
  electricityIncomeFlat: number; // 售电收益-平
  electricityIncomeValley: number; // 售电收益-谷
  electricityIncomeDeepValley: number; // 售电收益-深谷
  electricityIncomeTotal: number; // 售电收益-总
  // 风电收益数据
  windIncomeSharp: number; // 风电收益-尖
  windIncomePeak: number; // 风电收益-峰
  windIncomeFlat: number; // 风电收益-平
  windIncomeValley: number; // 风电收益-谷
  windIncomeDeepValley: number; // 风电收益-深谷
  windIncomeTotal: number; // 风电收益-总
  // 储能收益数据 - 充电部分
  storageChargeIncomeSharp: number; // 储能充电收益-尖
  storageChargeIncomePeak: number; // 储能充电收益-峰
  storageChargeIncomeFlat: number; // 储能充电收益-平
  storageChargeIncomeValley: number; // 储能充电收益-谷
  storageChargeIncomeDeepValley: number; // 储能充电收益-深谷
  storageChargeIncomeTotal: number; // 储能充电收益-总
  // 储能收益数据 - 放电部分
  storageDischargeIncomeSharp: number; // 储能放电收益-尖
  storageDischargeIncomePeak: number; // 储能放电收益-峰
  storageDischargeIncomeFlat: number; // 储能放电收益-平
  storageDischargeIncomeValley: number; // 储能放电收益-谷
  storageDischargeIncomeDeepValley: number; // 储能放电收益-深谷
  storageDischargeIncomeTotal: number; // 储能放电收益-总
  // 充电收益数据
  chargingIncomeSharp: number; // 充电收益-尖
  chargingIncomePeak: number; // 充电收益-峰
  chargingIncomeFlat: number; // 充电收益-平
  chargingIncomeValley: number; // 充电收益-谷
  chargingIncomeDeepValley: number; // 充电收益-深谷
  chargingIncomeTotal: number; // 充电收益-总
  // 电网收益数据
  gridIncomeSharp: number; // 电网收益-尖
  gridIncomePeak: number; // 电网收益-峰
  gridIncomeFlat: number; // 电网收益-平
  gridIncomeValley: number; // 电网收益-谷
  gridIncomeDeepValley: number; // 电网收益-深谷
  gridIncomeTotal: number; // 电网收益-总
  // 光伏收益数据 - 消纳部分
  solarConsumptionIncomeSharp: number; // 光伏消纳收益-尖
  solarConsumptionIncomePeak: number; // 光伏消纳收益-峰
  solarConsumptionIncomeFlat: number; // 光伏消纳收益-平
  solarConsumptionIncomeValley: number; // 光伏消纳收益-谷
  solarConsumptionIncomeDeepValley: number; // 光伏消纳收益-深谷
  solarConsumptionIncomeTotal: number; // 光伏消纳收益-总
  // 光伏收益数据 - 上网和总计
  gridConnectionIncome: number; // 上网收益
  grandTotalIncome: number; // 总收益
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

// 企业收益报表查询参数
export interface EnterpriseIncomeReportParams {
  startTime?: string;
  endTime?: string;
  enterprise?: string;
  reportType?: 'monthly' | 'yearly';
}

// 企业收益报表响应数据
export interface EnterpriseIncomeReportResponse {
  items: EnterpriseIncomeReportData[];
}

// 光伏收益报表数据类型定义
export interface PhotovoltaicIncomeReportData {
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

// 光伏收益报表查询参数
export interface PhotovoltaicIncomeReportParams {
  startTime?: string;
  endTime?: string;
  enterprise?: string;
  reportType?: 'monthly' | 'yearly';
}

// 光伏收益报表响应数据
export interface PhotovoltaicIncomeReportResponse {
  items: PhotovoltaicIncomeReportData[];
}

// 储能收益报表数据类型定义
export interface EnergyStorageIncomeReportData {
  time: string; // 时间字段

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

// 储能收益报表查询参数
export interface EnergyStorageIncomeReportParams {
  startTime?: string;
  endTime?: string;
  enterprise?: string;
  reportType?: 'monthly' | 'yearly';
}

// 储能收益报表响应数据
export interface EnergyStorageIncomeReportResponse {
  items: EnergyStorageIncomeReportData[];
}

/**
 * 获取企业收益报表数据
 */
export async function getEnterpriseIncomeReportApi(
  params?: EnterpriseIncomeReportParams,
): Promise<EnterpriseIncomeReportResponse> {
  return requestClient.get<EnterpriseIncomeReportResponse>('/income/report', {
    params,
  });
}

/**
 * 获取光伏收益报表数据
 */
export async function getPhotovoltaicIncomeReportApi(
  params?: PhotovoltaicIncomeReportParams,
): Promise<PhotovoltaicIncomeReportResponse> {
  return requestClient.get<PhotovoltaicIncomeReportResponse>('/income/photovoltaic-report', {
    params,
  });
}

/**
 * 获取储能收益报表数据
 */
export async function getEnergyStorageIncomeReportApi(
  params?: EnergyStorageIncomeReportParams,
): Promise<EnergyStorageIncomeReportResponse> {
  return requestClient.get<EnergyStorageIncomeReportResponse>('/income/energy-storage-report', {
    params,
  });
}
