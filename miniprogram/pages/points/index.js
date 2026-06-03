import { getPointsLogs } from '../../services/points';
import { getToday } from '../../services/today';
import { getMe } from '../../services/user';

Page({
  data: {
    loading: true,
    loadingMore: false,
    userInfo: null,
    todayPoints: 0,
    logs: [],
    page: 1,
    pageSize: 20,
    total: 0,
  },

  onShow() {
    this.updateTabBar();
    void this.loadPageData();
  },

  updateTabBar() {
    if (typeof this.getTabBar !== 'function') {
      return;
    }

    const tabBar = this.getTabBar();
    if (tabBar) {
      tabBar.setData({ selected: 2 });
    }
  },

  async loadPageData() {
    this.setData({ loading: true, page: 1 });
    try {
      const [userInfo, today, logResult] = await Promise.all([
        getMe(),
        getToday(),
        getPointsLogs({ page: 1, pageSize: this.data.pageSize }),
      ]);
      this.setData({
        userInfo,
        todayPoints: today.todayPoints,
        logs: logResult.list,
        total: logResult.total,
        page: logResult.page,
      });
    } catch (error) {
      console.error('load points page error', error);
    } finally {
      this.setData({ loading: false, loadingMore: false });
    }
  },

  async handleLoadMore() {
    if (this.data.loadingMore || this.data.logs.length >= this.data.total) {
      return;
    }

    const nextPage = this.data.page + 1;
    this.setData({ loadingMore: true });
    try {
      const logResult = await getPointsLogs({ page: nextPage, pageSize: this.data.pageSize });
      this.setData({
        logs: [...this.data.logs, ...logResult.list],
        page: logResult.page,
        total: logResult.total,
      });
    } catch (error) {
      console.error('load more points logs error', error);
    } finally {
      this.setData({ loadingMore: false });
    }
  },
});
