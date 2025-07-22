import type { UserInfo } from "@vben/types";

/**
 * 实际API返回的用户信息结构
 */
interface ApiUserInfo {
  account: string;
  realName: string;
  avatar: string | null;
  introduction: string | null;
  address: string | null;
  signature: string | null;
  orgId: number;
  orgName: string;
  orgType: string;
  posName: string | null;
  buttons: string[];
  homePath?: string;
}

/**
 * 将API返回的用户信息转换为应用期望的UserInfo格式
 * @param apiUserInfo API返回的用户信息
 * @returns 转换后的UserInfo
 */
export function transformApiUserInfo(apiUserInfo: ApiUserInfo): UserInfo {
  return {
    // 基础用户信息映射
    userId: apiUserInfo.orgId?.toString() || "", // 使用orgId作为userId
    username: apiUserInfo.account || "",
    realName: apiUserInfo.realName || "",
    avatar: apiUserInfo.avatar || "/default-avatar.png", // 提供默认头像

    // 从buttons数组推导角色信息
    roles: deriveRolesFromButtons(apiUserInfo.buttons || []),

    // UserInfo扩展字段
    desc: apiUserInfo.introduction || apiUserInfo.signature || `${apiUserInfo.realName} - ${apiUserInfo.orgName}`,
    homePath: apiUserInfo.homePath || "/", // 使用API返回的homePath，默认为根路径
    token: "", // token通常在登录时单独设置

    // 保留原始API数据作为扩展信息
    orgId: apiUserInfo.orgId,
    orgName: apiUserInfo.orgName,
    orgType: apiUserInfo.orgType,
    posName: apiUserInfo.posName,
    buttons: apiUserInfo.buttons,
    address: apiUserInfo.address,
    signature: apiUserInfo.signature
  };
}

/**
 * 从权限按钮数组推导用户角色
 * @param buttons 权限按钮数组
 * @returns 角色数组
 */
function deriveRolesFromButtons(buttons: string[]): string[] {
  const roleSet = new Set<string>();

  // 根据权限按钮推导角色
  if (buttons.length === 0) {
    return ["user"]; // 默认用户角色
  }

  // 系统管理员权限检查
  const adminPermissions = ["sysUser:", "sysRole:", "sysMenu:", "sysConfig:"];
  const hasAdminPermissions = adminPermissions.some(permission =>
    buttons.some(button => button.startsWith(permission))
  );

  if (hasAdminPermissions) {
    roleSet.add("admin");
  }

  // 设备管理权限检查
  const devicePermissions = ["dev:", "iotDev:", "devType:"];
  const hasDevicePermissions = devicePermissions.some(permission =>
    buttons.some(button => button.startsWith(permission))
  );

  if (hasDevicePermissions) {
    roleSet.add("device-manager");
  }

  // 如果有任何权限，至少是普通用户
  if (buttons.length > 0) {
    roleSet.add("user");
  }

  return Array.from(roleSet);
}

/**
 * 扩展BasicUserInfo类型以包含实际API返回的额外字段
 * 这样既保持了原有类型的兼容性，又能访问新字段
 */
declare module "@vben-core/typings" {
  interface BasicUserInfo {
    // 原始API返回的额外字段（可选）
    orgId?: number;
    orgName?: string;
    orgType?: string;
    posName?: string | null;
    buttons?: string[];
    address?: string | null;
    signature?: string | null;
  }
}

export type { ApiUserInfo };
