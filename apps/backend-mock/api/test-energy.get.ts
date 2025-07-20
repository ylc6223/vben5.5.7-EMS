import { MOCK_ENTERPRISE_ENERGY_REPORT_DATA } from '~/utils/mock-data';

export default defineEventHandler(async (event) => {
  // 简单测试，不需要验证token
  console.log('Test API called');
  console.log('Mock data length:', MOCK_ENTERPRISE_ENERGY_REPORT_DATA.length);
  console.log('First item:', MOCK_ENTERPRISE_ENERGY_REPORT_DATA[0]);

  return useResponseSuccess({
    message: 'Test API works',
    dataLength: MOCK_ENTERPRISE_ENERGY_REPORT_DATA.length,
    firstItem: MOCK_ENTERPRISE_ENERGY_REPORT_DATA[0],
  });
});
