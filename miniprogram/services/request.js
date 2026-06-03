import { API_BASE_URL } from '../config';
import { clearLogin, getToken } from '../utils/token';
import { showToast } from '../utils/toast';

let redirecting = false;

function redirectToLogin() {
  if (redirecting) {
    return;
  }

  redirecting = true;
  clearLogin();
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];

  if (currentPage?.route === 'pages/login/index') {
    redirecting = false;
    return;
  }

  wx.reLaunch({
    url: '/pages/login/index',
    complete: () => {
      setTimeout(() => {
        redirecting = false;
      }, 300);
    },
  });
}

export function request(options) {
  const token = getToken();
  const requestUrl = options.url.startsWith('/') ? options.url : `/${options.url}`;

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${requestUrl}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      success: (res) => {
        const body = res.data;

        if (!body) {
          if (options.showError !== false) {
            showToast('服务异常');
          }
          reject(new Error('Empty response body'));
          return;
        }

        if (body.code === 0) {
          resolve(body.data);
          return;
        }

        if (options.showError !== false) {
          const errorMessages = {
            40001: '今日已打卡',
            40100: '登录已过期，请重新登录',
            40101: '登录已失效，请重新登录',
          };
          showToast(errorMessages[body.code] || body.message || '请求失败');
        }

        if (body.code === 40100 || body.code === 40101) {
          redirectToLogin();
        }

        reject(new Error(body.message || 'Request failed'));
      },
      fail: (error) => {
        if (options.showError !== false) {
          showToast('网络错误');
        }
        reject(error);
      },
    });
  });
}
