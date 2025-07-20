export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
  homePath?: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: 'Vben',
    roles: ['super'],
    username: 'vben',
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    username: 'admin',
    homePath: '/workspace',
  },
  {
    id: 2,
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    username: 'jack',
    homePath: '/analytics',
  },
  {
    id: 3,
    password: '123456',
    realName: '富奥汽车',
    roles: ['admin'],
    username: 'FAQC',
    homePath: '/energy/overview',
  },
];

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
    username: 'vben',
  },
  {
    // admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'admin',
  },
  {
    // user
    codes: ['AC_1000001', 'AC_1000002'],
    username: 'jack',
  },
  {
    // FAQC admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'FAQC',
  },
];

// 移除重复的dashboard菜单，因为在mixed模式下会与静态路由重复
// 静态路由已经在 apps/web-ele/src/router/routes/modules/dashboard.ts 中定义了完整的菜单结构
const dashboardMenus: any[] = [];

const createDemosMenus = (role: 'admin' | 'super' | 'user') => {
  const roleWithMenus = {
    admin: {
      component: '/demos/access/admin-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.adminVisible',
      },
      name: 'AccessAdminVisibleDemo',
      path: '/demos/access/admin-visible',
    },
    super: {
      component: '/demos/access/super-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.superVisible',
      },
      name: 'AccessSuperVisibleDemo',
      path: '/demos/access/super-visible',
    },
    user: {
      component: '/demos/access/user-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.userVisible',
      },
      name: 'AccessUserVisibleDemo',
      path: '/demos/access/user-visible',
    },
  };

  return [
    {
      meta: {
        icon: 'ic:baseline-view-in-ar',
        keepAlive: true,
        order: 1000,
        title: 'demos.title',
      },
      name: 'Demos',
      path: '/demos',
      redirect: '/demos/access',
      children: [
        {
          name: 'AccessDemos',
          path: '/demosaccess',
          meta: {
            icon: 'mdi:cloud-key-outline',
            title: 'demos.access.backendPermissions',
          },
          redirect: '/demos/access/page-control',
          children: [
            {
              name: 'AccessPageControlDemo',
              path: '/demos/access/page-control',
              component: '/demos/access/index',
              meta: {
                icon: 'mdi:page-previous-outline',
                title: 'demos.access.pageAccess',
              },
            },
            {
              name: 'AccessButtonControlDemo',
              path: '/demos/access/button-control',
              component: '/demos/access/button-control',
              meta: {
                icon: 'mdi:button-cursor',
                title: 'demos.access.buttonControl',
              },
            },
            {
              name: 'AccessMenuVisible403Demo',
              path: '/demos/access/menu-visible-403',
              component: '/demos/access/menu-visible-403',
              meta: {
                authority: ['no-body'],
                icon: 'mdi:button-cursor',
                menuVisibleWithForbidden: true,
                title: 'demos.access.menuVisible403',
              },
            },
            roleWithMenus[role],
          ],
        },
      ],
    },
  ];
};

// 移除重复的demos菜单，因为在mixed模式下会与静态路由重复
// 静态路由已经在 apps/web-ele/src/router/routes/modules/demos.ts 中定义了demos菜单
export const MOCK_MENUS = [
  {
    menus: [...dashboardMenus],
    username: 'vben',
  },
  {
    menus: [...dashboardMenus],
    username: 'admin',
  },
  {
    menus: [...dashboardMenus],
    username: 'jack',
  },
  {
    menus: [...dashboardMenus],
    username: 'FAQC',
  },
];

export const MOCK_MENU_LIST = [
  // 移除所有重复的菜单项，因为在mixed模式下会与静态路由重复
  // 静态路由已经在 apps/web-ele/src/router/routes/modules/ 目录下定义了完整的菜单结构
  // 包括：dashboard.ts, demos.ts, system.ts, vben.ts 等
  // 移除重复的Project和About菜单项，因为在mixed模式下会与静态路由重复
  // 静态路由已经在 apps/web-ele/src/router/routes/modules/vben.ts 中定义了这些菜单
];

export function getMenuIds(menus: any[]) {
  const ids: number[] = [];
  menus.forEach((item) => {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids.push(...getMenuIds(item.children));
    }
  });
  return ids;
}
