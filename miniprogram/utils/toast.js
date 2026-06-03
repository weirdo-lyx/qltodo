export function showToast(title, icon = 'none', duration = 2000) {
  wx.showToast({ title, icon, duration, mask: true });
}

export function showLoading(title = '加载中') {
  wx.showLoading({ title, mask: true });
}

export function hideLoading() {
  wx.hideLoading();
}

export function showConfirm(content, title = '提示') {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success: (res) => resolve(res.confirm),
      fail: () => resolve(false),
    });
  });
}
