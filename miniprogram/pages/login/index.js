import { mockLogin, wxLogin } from '../../services/auth';
import { isLoggedIn, setToken, setUserInfo } from '../../utils/token';
import { showToast } from '../../utils/toast';

Page({
  data: {
    loading: false,
  },

  onLoad() {
    if (isLoggedIn()) {
      wx.switchTab({ url: '/pages/index/index' });
    }
  },

  async handleMockLoginA() {
    await this.loginWithMock({
      mockOpenid: 'user_a',
      nickname: '用户A',
      avatarUrl: '',
    });
  },

  async handleMockLoginB() {
    await this.loginWithMock({
      mockOpenid: 'user_b',
      nickname: '用户B',
      avatarUrl: '',
    });
  },

  async loginWithMock(payload) {
    if (this.data.loading) {
      return;
    }

    this.setData({ loading: true });
    try {
      const result = await mockLogin(payload);
      this.handleLoginSuccess(result);
    } catch (error) {
      console.error('mock login error', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  handleWxLogin() {
    if (this.data.loading) {
      return;
    }

    this.setData({ loading: true });
    wx.login({
      success: async (res) => {
        if (!res.code) {
          showToast('微信登录失败');
          this.setData({ loading: false });
          return;
        }

        try {
          // 调用微信登录接口，传入 code 和默认用户信息
          const result = await wxLogin({
            code: res.code,
            nickname: '微信用户',
            avatarUrl: '',
          });
          this.handleLoginSuccess(result);
        } catch (error) {
          console.error('wx login error', error);
          showToast('登录失败，请重试');
        } finally {
          this.setData({ loading: false });
        }
      },
      fail: () => {
        showToast('微信登录失败');
        this.setData({ loading: false });
      },
    });
  },

  handleLoginSuccess(result) {
    const userInfo = {
      ...result.user,
      hasPartner: Boolean(result.user.hasPartner),
    };

    setToken(result.token);
    setUserInfo(userInfo);
    showToast('登录成功', 'success');
    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' });
    }, 300);
  },
});
