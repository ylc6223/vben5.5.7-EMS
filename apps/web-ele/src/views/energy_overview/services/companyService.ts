// 企业数据服务
interface Company {
  label: string
  value: string
  code?: string
  address?: string
  type?: string
  status?: string
  establishDate?: string
  scale?: string
  industry?: string
}

// 模拟企业数据
const mockCompanies: Company[] = [
  {
    label: "深圳市绿色能源科技有限公司",
    value: "company1",
    code: "91440300MA5XXXXXX1",
    address: "广东省深圳市南山区科技园南区高新南七道16号德维森大厦15楼",
    type: "新能源",
    status: "正常",
    establishDate: "2018-03-15",
    scale: "大型",
    industry: "新能源技术开发"
  },
  {
    label: "广州新能源发展有限公司",
    value: "company2",
    code: "91440100MA5XXXXXX2",
    address: "广东省广州市天河区珠江新城花城大道85号",
    type: "新能源",
    status: "正常",
    establishDate: "2019-07-22",
    scale: "中型",
    industry: "新能源项目投资"
  },
  {
    label: "东莞智慧能源管理公司",
    value: "company3",
    code: "91441900MA5XXXXXX3",
    address: "广东省东莞市南城区宏图路86号",
    type: "能源管理",
    status: "正常",
    establishDate: "2020-01-10",
    scale: "中型",
    industry: "能源管理服务"
  },
  {
    label: "佛山清洁能源技术公司",
    value: "company4",
    code: "91440600MA5XXXXXX4",
    address: "广东省佛山市禅城区季华五路57号",
    type: "清洁能源",
    status: "正常",
    establishDate: "2017-11-08",
    scale: "大型",
    industry: "清洁能源技术研发"
  },
  {
    label: "珠海可再生能源集团",
    value: "company5",
    code: "91440400MA5XXXXXX5",
    address: "广东省珠海市香洲区情侣中路8号",
    type: "可再生能源",
    status: "正常",
    establishDate: "2016-05-20",
    scale: "大型",
    industry: "可再生能源开发"
  },
  {
    label: "中山光伏科技有限公司",
    value: "company6",
    code: "91442000MA5XXXXXX6",
    address: "广东省中山市火炬开发区沙岗东路76号",
    type: "光伏",
    status: "正常",
    establishDate: "2019-09-12",
    scale: "中型",
    industry: "光伏设备制造"
  },
  {
    label: "惠州储能设备制造商",
    value: "company7",
    code: "91441300MA5XXXXXX7",
    address: "广东省惠州市惠城区江北文华一路2号",
    type: "储能",
    status: "正常",
    establishDate: "2020-04-18",
    scale: "中型",
    industry: "储能设备制造"
  },
  {
    label: "江门环保能源服务商",
    value: "company8",
    code: "91440700MA5XXXXXX8",
    address: "广东省江门市蓬江区建设二路99号",
    type: "环保能源",
    status: "正常",
    establishDate: "2018-12-03",
    scale: "小型",
    industry: "环保能源服务"
  },
  {
    label: "汕头海上风电开发公司",
    value: "company9",
    code: "91440500MA5XXXXXX9",
    address: "广东省汕头市龙湖区金砂东路86号",
    type: "风电",
    status: "正常",
    establishDate: "2017-06-25",
    scale: "大型",
    industry: "海上风电开发"
  },
  {
    label: "湛江生物质能源公司",
    value: "company10",
    code: "91440800MA5XXXXXX0",
    address: "广东省湛江市霞山区海滨大道南3号",
    type: "生物质能源",
    status: "正常",
    establishDate: "2019-02-14",
    scale: "中型",
    industry: "生物质能源利用"
  },
  {
    label: "韶关水电开发集团",
    value: "company11",
    code: "91440200MA5XXXXXX1",
    address: "广东省韶关市武江区芙蓉北路25号",
    type: "水电",
    status: "正常",
    establishDate: "2015-08-30",
    scale: "大型",
    industry: "水电站建设运营"
  },
  {
    label: "梅州绿色电力公司",
    value: "company12",
    code: "91441400MA5XXXXXX2",
    address: "广东省梅州市梅江区彬芳大道北76号",
    type: "绿色电力",
    status: "正常",
    establishDate: "2020-10-15",
    scale: "中型",
    industry: "绿色电力供应"
  },
  {
    label: "潮州智能电网科技公司",
    value: "company13",
    code: "91445100MA5XXXXXX3",
    address: "广东省潮州市湘桥区新洋路128号",
    type: "智能电网",
    status: "正常",
    establishDate: "2021-03-08",
    scale: "小型",
    industry: "智能电网技术"
  },
  {
    label: "揭阳分布式能源公司",
    value: "company14",
    code: "91445200MA5XXXXXX4",
    address: "广东省揭阳市榕城区东山路66号",
    type: "分布式能源",
    status: "正常",
    establishDate: "2020-07-20",
    scale: "中型",
    industry: "分布式能源系统"
  },
  {
    label: "云浮节能环保集团",
    value: "company15",
    code: "91445300MA5XXXXXX5",
    address: "广东省云浮市云城区城中路188号",
    type: "节能环保",
    status: "正常",
    establishDate: "2018-11-12",
    scale: "大型",
    industry: "节能环保技术"
  },
  {
    label: "阳江海洋能源开发公司",
    value: "company16",
    code: "91441700MA5XXXXXX6",
    address: "广东省阳江市江城区东风二路99号",
    type: "海洋能源",
    status: "正常",
    establishDate: "2019-05-28",
    scale: "中型",
    industry: "海洋能源开发"
  },
  {
    label: "清远绿色建筑能源公司",
    value: "company17",
    code: "91441800MA5XXXXXX7",
    address: "广东省清远市清城区建设二路77号",
    type: "绿色建筑",
    status: "正常",
    establishDate: "2020-12-05",
    scale: "小型",
    industry: "绿色建筑能源"
  },
  {
    label: "河源氢能科技有限公司",
    value: "company18",
    code: "91441600MA5XXXXXX8",
    address: "广东省河源市源城区大同路168号",
    type: "氢能",
    status: "正常",
    establishDate: "2021-01-18",
    scale: "中型",
    industry: "氢能技术开发"
  },
  {
    label: "汕尾海上风力发电公司",
    value: "company19",
    code: "91441500MA5XXXXXX9",
    address: "广东省汕尾市城区香洲街道滨海大道288号",
    type: "风电",
    status: "正常",
    establishDate: "2018-08-15",
    scale: "大型",
    industry: "海上风力发电"
  },
  {
    label: "茂名石化新能源公司",
    value: "company20",
    code: "91440900MA5XXXXXX0",
    address: "广东省茂名市茂南区站前路158号",
    type: "新能源",
    status: "正常",
    establishDate: "2017-04-22",
    scale: "大型",
    industry: "石化新能源转型"
  }
]

/**
 * 搜索企业数据
 * @param keyword 搜索关键词
 * @returns Promise<Company[]>
 */
export const searchCompanies = async (keyword?: string): Promise<Company[]> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200))

  if (!keyword || keyword.trim() === '') {
    // 返回所有数据
    return mockCompanies
  }

  // 根据关键词过滤
  const lowerKeyword = keyword.toLowerCase()
  return mockCompanies.filter(company =>
    company.label.toLowerCase().includes(lowerKeyword) ||
    company.type?.toLowerCase().includes(lowerKeyword) ||
    company.address?.toLowerCase().includes(lowerKeyword)
  )
}

/**
 * 根据企业ID获取企业详情
 * @param companyId 企业ID
 * @returns Promise<Company | null>
 */
export const getCompanyById = async (companyId: string): Promise<Company | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))

  return mockCompanies.find(company => company.value === companyId) || null
}

/**
 * 获取企业类型列表
 * @returns Promise<string[]>
 */
export const getCompanyTypes = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))

  const types = [...new Set(mockCompanies.map(company => company.type).filter(Boolean))]
  return types as string[]
}

/**
 * 根据类型搜索企业
 * @param type 企业类型
 * @returns Promise<Company[]>
 */
export const searchCompaniesByType = async (type: string): Promise<Company[]> => {
  await new Promise(resolve => setTimeout(resolve, 200))

  return mockCompanies.filter(company => company.type === type)
}

// 导出类型
export type { Company }
