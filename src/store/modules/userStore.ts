import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { AnyObject } from '#/global';

const { VITE_TOKEN_KEY, VITE_USERID } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);
// const userId = useCookies().get(VITE_USERID as string);

interface StoreUser {
  token: string;
  userId: string;
  isIOS: boolean;
  info: AnyObject;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token,
    // token: 'c718ada33924feaa9eb0dcfe36da63e6',
    // userId: userId,
    userId: '99',
    // isIOS: true,
    isIOS: false,
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    setToken(token: string) {
      this.token = token;
      useCookies().set(VITE_TOKEN_KEY as string, token);
    },
    setPhoneType(isIOS: boolean) {
      this.isIOS = isIOS;
    },
    setUserId(userId: string) {
      this.userId = userId;
      useCookies().set(VITE_USERID as string, userId);
    },
  },
});
