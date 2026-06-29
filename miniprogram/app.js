import { getUserInfo } from './utils/token';
import { initBackgroundMusic, pauseBackgroundMusic, playBackgroundMusic } from './utils/background-music';

App({
  globalData: {
    userInfo: null,
  },
  onLaunch() {
    const userInfo = getUserInfo();
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }

    initBackgroundMusic();
  },
  onShow() {
    playBackgroundMusic();
  },
  onHide() {
    pauseBackgroundMusic();
  },
});
