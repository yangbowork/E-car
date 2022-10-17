import { useUserStore } from '@/store/modules/userStore';
export const getAppToken = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  const userStore = useUserStore();
  // 获取设定手机类型
  userStore.setPhoneType(isIOS);

  (window as any).getUserId = (userId) => {
    if (userId) {
      userStore.setUserId(userId);
    }
  };
  (window as any).getUserToken = (userToken) => {
    if (userToken) {
      userStore.setToken(userToken);
    }
  };

  (window as any).IOSCallbackGetUserInfo = (userId) => {
    if (userId) {
      userStore.setUserId(userId);
    }
  };
  (window as any).IOSCallbackGetUserToken = (userToken) => {
    if (userToken) {
      userStore.setToken(userToken);
    }
  };

  if (isAndroid) {
    console.log('当前安卓环境');
    let userId = null;
    let userToken = null;

    try {
      // userId = (window as any).call.getUserId();
      userId = (window as any).call.getUserInfo();
      userToken = (window as any).call.getUserToken();
      console.log('当前安卓环境', userId, userToken);
    } catch (err) {
      console.log('安卓报错', err);
    }

    if (userId) {
      userStore.setUserId(userId);
    }
    if (userToken) {
      userStore.setToken(userToken);
    }
  } else if (isIOS) {
    try {
      console.log('当前IOS环境');
      (window as any).webkit.messageHandlers.getUserInfo.postMessage(null);
      (window as any).webkit.messageHandlers.getUserToken.postMessage(null);
    } catch (err) {
      console.log('IOS报错', err);
    }
  }
};
