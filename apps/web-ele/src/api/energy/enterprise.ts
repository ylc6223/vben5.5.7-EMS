import { requestClient } from '#/api/request';

/**
 * 企业信息接口类型定义
 */
export interface EnterpriseInfo {
  id: string;
  name: string;
  code?: string;
  type?: string;
  status?: 'active' | 'inactive';
  description?: string;
  createTime?: string;
  updateTime?: string;
}

/**
 * 企业列表查询参数
 */
export interface EnterpriseListParams {
  keyword?: string;
  type?: string;
  status?: 'active' | 'inactive';
  page?: number;
  pageSize?: number;
}

/**
 * 企业列表响应数据
 */
export interface EnterpriseListResponse {
  items: EnterpriseInfo[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 获取企业列表
 * @param params 查询参数
 * @returns 企业列表数据
 */
export async function getEnterpriseListApi(
  params?: EnterpriseListParams,
): Promise<EnterpriseListResponse> {
  return requestClient.get('/energy/enterprises', {
    params,
  });
}

/**
 * 根据ID获取企业详情
 * @param id 企业ID
 * @returns 企业详情
 */
export async function getEnterpriseDetailApi(
  id: string,
): Promise<EnterpriseInfo> {
  return requestClient.get(`/energy/enterprises/${id}`);
}

/**
 * 搜索企业（用于下拉选择器）
 * @param keyword 搜索关键词，为空时返回所有活跃企业
 * @returns 企业选项列表
 */
export async function searchEnterprisesApi(keyword?: string): Promise<
  {
    label: string;
    value: string;
  }[]
> {
  console.log('searchEnterprisesApi called with keyword:', keyword);

  const response = await getEnterpriseListApi({
    keyword: keyword && keyword.trim() ? keyword.trim() : undefined, // 空字符串转为 undefined
    status: 'active',
    pageSize: 50, // 限制返回数量
  });

  console.log('Enterprise API response:', response);

  return response.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
}
