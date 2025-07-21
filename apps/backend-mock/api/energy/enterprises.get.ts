import { useResponseSuccess } from '~/utils/response';

// 模拟企业数据
const mockEnterprises = [
  {
    id: 'enterprise_001',
    name: '北京新能源科技有限公司',
    code: 'BJXNY001',
    type: 'solar',
    status: 'active',
    description: '专注于太阳能发电技术研发与应用',
    createTime: '2020-01-15T08:00:00Z',
    updateTime: '2024-06-20T10:30:00Z',
  },
  {
    id: 'enterprise_002',
    name: '上海绿色电力集团',
    code: 'SHLSDL002',
    type: 'wind',
    status: 'active',
    description: '大型风力发电企业，覆盖华东地区',
    createTime: '2019-03-22T09:15:00Z',
    updateTime: '2024-07-10T14:20:00Z',
  },
  {
    id: 'enterprise_003',
    name: '深圳智慧能源股份公司',
    code: 'SZZHNY003',
    type: 'storage',
    status: 'active',
    description: '智能储能系统解决方案提供商',
    createTime: '2021-05-10T11:30:00Z',
    updateTime: '2024-07-15T16:45:00Z',
  },
  {
    id: 'enterprise_004',
    name: '广州清洁能源发展公司',
    code: 'GZQJNY004',
    type: 'comprehensive',
    status: 'active',
    description: '综合性清洁能源开发与运营企业',
    createTime: '2020-08-18T13:20:00Z',
    updateTime: '2024-07-12T09:10:00Z',
  },
  {
    id: 'enterprise_005',
    name: '杭州可再生能源企业',
    code: 'HZKZS005',
    type: 'solar',
    status: 'active',
    description: '可再生能源技术创新与产业化',
    createTime: '2022-02-28T15:45:00Z',
    updateTime: '2024-07-18T11:25:00Z',
  },
  {
    id: 'enterprise_006',
    name: '天津海上风电有限公司',
    code: 'TJHSFD006',
    type: 'wind',
    status: 'active',
    description: '专业海上风力发电项目开发运营',
    createTime: '2021-11-12T10:00:00Z',
    updateTime: '2024-07-08T13:30:00Z',
  },
  {
    id: 'enterprise_007',
    name: '成都分布式光伏集团',
    code: 'CDFBSGF007',
    type: 'solar',
    status: 'active',
    description: '分布式光伏发电系统集成商',
    createTime: '2020-12-05T14:15:00Z',
    updateTime: '2024-07-14T08:50:00Z',
  },
  {
    id: 'enterprise_008',
    name: '武汉储能技术研发中心',
    code: 'WHCNJS008',
    type: 'storage',
    status: 'active',
    description: '储能技术研发与产业化应用',
    createTime: '2021-07-20T16:30:00Z',
    updateTime: '2024-07-16T12:40:00Z',
  },
];

export default defineEventHandler(async (event) => {
  console.log('Enterprise list API called');

  // 获取查询参数
  const query = getQuery(event);
  const { keyword, type, status, page = 1, pageSize = 20 } = query;

  console.log('Query params:', { keyword, type, status, page, pageSize });

  let filteredData = [...mockEnterprises];

  // 根据关键词过滤（只有当关键词不为空且不是空字符串时才过滤）
  if (keyword && String(keyword).trim()) {
    const searchKeyword = String(keyword).toLowerCase().trim();
    console.log('Filtering enterprises with keyword:', searchKeyword);
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchKeyword) ||
        item.code.toLowerCase().includes(searchKeyword) ||
        (item.description && item.description.toLowerCase().includes(searchKeyword))
    );
  } else {
    console.log('No keyword provided, returning all enterprises');
  }

  // 根据类型过滤
  if (type) {
    filteredData = filteredData.filter((item) => item.type === type);
  }

  // 根据状态过滤
  if (status) {
    filteredData = filteredData.filter((item) => item.status === status);
  }

  // 分页处理
  const pageNum = Number(page);
  const pageSizeNum = Number(pageSize);
  const startIndex = (pageNum - 1) * pageSizeNum;
  const endIndex = startIndex + pageSizeNum;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  console.log('Filtered data length:', filteredData.length);
  console.log('Paginated data length:', paginatedData.length);

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  return useResponseSuccess({
    items: paginatedData,
    total: filteredData.length,
    page: pageNum,
    pageSize: pageSizeNum,
  });
});
