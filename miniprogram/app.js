import { getUserInfo } from './utils/token';

App({
  globalData: {
    userInfo: null,
  },
  onLaunch() {
    const userInfo = getUserInfo();
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
});
