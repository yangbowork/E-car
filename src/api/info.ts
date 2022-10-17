import useAxiosApi from '@/utils/useAxiosApi';

// 用户申请数据
export function applyData() {
  return useAxiosApi(`/dealer/eFinance/applyData`, {
    method: 'POST',
  });
}

// 提交数据
export function commitApply(data) {
  return useAxiosApi(`/dealer/eFinance/commitApply`, {
    method: 'POST',
    data,
  });
}
