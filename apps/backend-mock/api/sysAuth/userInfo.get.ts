import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
  // 验证访问令牌
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  // 根据用户名获取对应的用户信息
  const mockUserInfoMap: Record<string, any> = {
    'FAQC': {
      account: 'FAQC',
      realName: '富奥汽车',
      avatar: null,
      introduction: '富奥汽车零部件有限公司管理员',
      address: '吉林省长春市',
      signature: '致力于汽车零部件制造与创新',
      orgId: 21255947002821,
      orgName: '富奥汽车',
      orgType: '201',
      posName: '系统管理员',
      buttons: [
        'sysUser:page',
        'sysUser:update',
        'sysUser:add',
        'sysUser:delete',
        'sysUser:detail',
        'sysUser:grantRole',
        'sysUser:resetPwd',
        'sysUser:setStatus',
        'sysOnlineUser:forceOffline',
        'sysRole:page',
        'sysRole:update',
        'sysRole:add',
        'sysRole:delete',
        'sysRole:grantMenu',
        'sysRole:grantDataScope',
        'sysRole:setStatus',
        'sysOrg:update',
        'sysOrg:add',
        'sysOrg:delete',
        'sysPos:list',
        'sysPos:update',
        'sysPos:add',
        'sysPos:delete',
        'sysUser:changePwd',
        'sysUser:baseInfo',
        'sysFile:uploadSignature',
        'sysFile:uploadAvatar',
        'sysNotice:page',
        'sysNotice:update',
        'sysNotice:add',
        'sysNotice:delete',
        'sysNotice:detail',
        'sysMenu:page',
        'sysMenu:update',
        'sysMenu:add',
        'sysMenu:delete',
        'sysMenu:detail',
        'energy:overview',
        'energy:monitor',
        'energy:analysis',
        'energy:report'
      ]
    },
    'vben': {
      account: 'vben',
      realName: 'Vben',
      avatar: '/avatars/vben.png',
      introduction: 'Vue Vben Admin 超级管理员',
      address: '中国',
      signature: 'Vue3 + TypeScript + Vite 管理系统',
      orgId: 1,
      orgName: 'Vben组织',
      orgType: '100',
      posName: '超级管理员',
      buttons: [
        'super:all',
        'admin:all',
        'user:all'
      ]
    },
    'admin': {
      account: 'admin',
      realName: 'Admin',
      avatar: '/avatars/admin.png',
      introduction: '系统管理员',
      address: '中国',
      signature: '负责系统管理和维护',
      orgId: 2,
      orgName: '管理组织',
      orgType: '200',
      posName: '管理员',
      buttons: [
        'admin:all',
        'user:read'
      ]
    },
    'jack': {
      account: 'jack',
      realName: 'Jack',
      avatar: '/avatars/jack.png',
      introduction: '普通用户',
      address: '中国',
      signature: '系统普通用户',
      orgId: 3,
      orgName: '用户组织',
      orgType: '300',
      posName: '普通用户',
      buttons: [
        'user:read'
      ]
    }
  };

  // 获取当前用户的详细信息
  const currentUserInfo = mockUserInfoMap[userinfo.username] || mockUserInfoMap['FAQC'];

  return useResponseSuccess(currentUserInfo);
});
