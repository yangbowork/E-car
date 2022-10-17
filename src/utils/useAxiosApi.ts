import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/userStore';

// create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // url = base url + request url
  withCredentials: false,
  timeout: 60000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();

    // do something before request is sent
    const token = userStore.token;
    const userId = userStore.userId;
    if (token) {
      // let each request carry token
      (config as any).headers['X-TOKEN'] = token;
    }
    if (userId) {
      // let each request carry token
      (config as any).headers['X-USERID'] = userId;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code == '500') {
      ElMessage({
        message: res.msg,
        type: 'error',
      });
    }
    return res;
  },
  (error) => {
    ElMessage({
      message: error.msg,
      type: 'error',
    });
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default async function useAxiosApi(url: string, config: AxiosRequestConfig) {
  const { response } = await useAxios(url, config, instance);
  return response.value;
}
