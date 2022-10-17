import useAxiosApi from '@/utils/useAxiosApi';

// 获取cos密钥 /agent/cos/getTempCredential
export function getTempCredential() {
  return useAxiosApi(`/dealer/eFinance/cos/getTempCredential`, {
    method: 'post',
  });
}
