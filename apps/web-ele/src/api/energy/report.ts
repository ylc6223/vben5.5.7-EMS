import { requestClient } from '#/api/request';

// 企业能源报表数据类型定义
export interface EnterpriseEnergyReportData {
  time: string; // 时间
  // 负荷数据
  loadSharp: number; // 负荷-尖
  loadPeak: number; // 负荷-峰
  loadFlat: number; // 负荷-平
  loadValley: number; // 负荷-谷
  loadDeepValley: number; // 负荷-深谷
  loadTotal: number; // 负荷-总
  // 风电数据
  windSharp: number; // 风电-尖
  windPeak: number; // 风电-峰
  windFlat: number; // 风电-平
  windValley: number; // 风电-谷
  windDeepValley: number; // 风电-深谷
  windTotal: number; // 风电-总
  // 储能数据 - 充电部分
  storageChargeSharp: number; // 储能充电-尖
  storageChargePeak: number; // 储能充电-峰
  storageChargeFlat: number; // 储能充电-平
  storageChargeValley: number; // 储能充电-谷
  storageChargeDeepValley: number; // 储能充电-深谷
  storageChargeTotal: number; // 储能充电-总
  // 储能数据 - 放电部分
  storageDischargeSharp: number; // 储能放电-尖
  storageDischargePeak: number; // 储能放电-峰
  storageDischargeFlat: number; // 储能放电-平
  storageDischargeValley: number; // 储能放电-谷
  storageDischargeDeepValley: number; // 储能放电-深谷
  storageDischargeTotal: number; // 储能放电-总
  // 充电桩数据
  chargingPileSharp: number; // 充电桩-尖
  chargingPilePeak: number; // 充电桩-峰
  chargingPileFlat: number; // 充电桩-平
  chargingPileValley: number; // 充电桩-谷
  chargingPileDeepValley: number; // 充电桩-深谷
  chargingPileTotal: number; // 充电桩-总
  // 电网数据
  gridSharp: number; // 电网-尖
  gridPeak: number; // 电网-峰
  gridFlat: number; // 电网-平
  gridValley: number; // 电网-谷
  gridDeepValley: number; // 电网-深谷
  gridTotal: number; // 电网-总
  // 光伏数据 - 消纳部分
  solarConsumptionSharp: number; // 光伏消纳-尖
  solarConsumptionPeak: number; // 光伏消纳-峰
  solarConsumptionFlat: number; // 光伏消纳-平
  solarConsumptionValley: number; // 光伏消纳-谷
  solarConsumptionDeepValley: number; // 光伏消纳-深谷
  solarConsumptionTotal: number; // 光伏消纳-总
  // 上网
  gridConnection: number; // 上网
  // 总
  grandTotal: number; // 总
}

// API响应数据类型
export interface EnterpriseEnergyReportResponse {
  items: EnterpriseEnergyReportData[];
  total: number;
}

// 查询参数类型
export interface EnterpriseEnergyReportParams {
  startTime?: string;
  endTime?: string;
  reportType?: 'monthly' | 'yearly';
}

/**
 * 获取企业能源报表数据
 * @param params 查询参数
 * @returns Promise<EnterpriseEnergyReportResponse>
 */
export async function getEnterpriseEnergyReportApi(
  params?: EnterpriseEnergyReportParams,
): Promise<EnterpriseEnergyReportResponse> {
  return requestClient.get('/energy/report', { params });
}
