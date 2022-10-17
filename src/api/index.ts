import useAxiosApi from '@/utils/useAxiosApi';

/**
 * 获取订单状态
 * @returns UseAxiosReturn
 */
export function applyStatus() {
  return useAxiosApi(`/dealer/eFinance/applyStatus`, {
    method: 'POST',
  });
}
