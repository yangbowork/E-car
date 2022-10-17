import { AnyObject } from '#/global';
import { useUserStore } from '@/store/modules/userStore';

const userStore = useUserStore();

export const typeCheck = (param: any) => {
  return Object.prototype.toString.call(param);
};

/**
 * 获取图片Url
 */
export const getImgUrl = (imgSrc) => {
  return new URL(`../assets/img/${imgSrc}`, import.meta.url).href;
};

/**
 * 批量修改stage
 */
export const mutateState = (state: AnyObject, payload: AnyObject) => {
  if (typeCheck(state) === '[object Object]' && typeCheck(payload) === '[object Object]') {
    for (const key in payload) {
      state[key] = payload[key];
    }
  } else {
    console.error('expected plain Object');
  }
};

/**
 * 拨打电话
 */
export const callPhone = (phoneNumber: String) => {
  if (userStore.isIOS) {
    window.location.href = `tel:${phoneNumber}`;
  } else {
    (window as any).call.callPhone(`${phoneNumber}`);
  }
};

/**
 * 判断是否为空
 */
export const isEmpty = (val: any) => {
  if (val === null || val === undefined || val === '') return true;
  return false;
};
