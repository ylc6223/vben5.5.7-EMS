import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';
import { transformApiUserInfo, type ApiUserInfo } from './user-adapter';

/**
 * 获取用户信息
 */
export async function getUserInfoApi(): Promise<UserInfo> {
  // 调用实际的API接口
  const apiUserInfo = await requestClient.get<ApiUserInfo>('/sysAuth/userInfo');

  // 使用适配器将API返回的数据转换为应用期望的格式
  return transformApiUserInfo(apiUserInfo);
}
