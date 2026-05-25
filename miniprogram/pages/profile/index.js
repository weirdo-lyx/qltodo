import { getMe } from '../../services/user';
import { clearLogin, setUserInfo } from '../../utils/token';

Page({
  data: {
    loading: true,
    userInfo: null,
  },

  onShow() {
    void this.loadUserInfo();
  },

  async loadUserInfo() {
    this.setData({ loading: true });
    try {
      const userInfo = await getMe();
      setUserInfo(userInfo);
      this.setData({ userInfo });
    } catch (error) {
      console.error('load profile error', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  goPartnerPage() {
    wx.navigateTo({ url: '/pages/partner/index' });
  },

  logout() {
    clearLogin();
    wx.reLaunch({ url: '/pages/login/index' });
  },
});
