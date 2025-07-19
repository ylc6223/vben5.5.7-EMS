import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    account?: string;
    password?: string;
    code?: string;
    codeId?: string;
  }

  /** 注册接口参数 */
  export interface RegisterParams {
    account: string;
    password: string;
    code: string;
    codeId: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data) {
  // const data: AuthApi.LoginParams = {
  //   account: 'FAQC',
  //   password: '123456',
  //   code: '5',
  //   codeId: '21842883024069',
  // };
  return requestClient.post<AuthApi.LoginResult>('/sysAuth/login', data, {
    headers: {
      isToken: false,
    },
  });
}

/**
 * 注册
 */
export async function registerApi(data: AuthApi.RegisterParams) {
  return requestClient.post('/register', data, {
    headers: {
      isToken: false,
    },
  });
}

/**
 * 获取切换机构TOKEN
 */
export async function getSwitchOrgTokenApi(id: string) {
  return requestClient.get('/sysAuth/ChangeOrgToken', {
    params: { orgId: id },
  });
}

/**
 * 获取验证码
 */
export async function getCaptchaApi() {
  return requestClient.get('/sysAuth/captcha', {
    headers: {
      isToken: false,
    },
  });
}

/**
 * 获取短信验证码
 */
export async function getSmsCaptchaApi() {
  return requestClient.get('/captchaSms', {
    headers: {
      isToken: false,
    },
  });
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/sysAuth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  // return requestClient.get<string[]>('/auth/codes');
  // 这里返回一个空数组即可
  // https://doc.vben.pro/guide/in-depth/login.html
  return [];
}
