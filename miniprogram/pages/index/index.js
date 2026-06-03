import { checkin, deleteCheckin } from '../../services/checkin';
import { getToday } from '../../services/today';
import { formatShortDate } from '../../utils/date';
import { showConfirm, showToast } from '../../utils/toast';

Page({
  data: {
    loading: true,
    todayData: null,
    dateLabel: '',
    checkingTaskId: 0,
  },

  onShow() {
    this.updateTabBar();
    void this.loadToday();
  },

  updateTabBar() {
    if (typeof this.getTabBar !== 'function') {
      return;
    }

    const tabBar = this.getTabBar();
    if (tabBar) {
      tabBar.setData({ selected: 0 });
    }
  },

  async loadToday() {
    this.setData({ loading: true });
    try {
      const todayData = await getToday();
      this.setData({
        todayData,
        dateLabel: formatShortDate(todayData.date),
        checkingTaskId: 0,
      });
    } catch (error) {
      console.error('load today error', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  goCreatePlan() {
    wx.navigateTo({ url: '/pages/plan-create/index' });
  },

  async handleCheckin(event) {
    const { planId, taskId } = event.currentTarget.dataset || {};

    if (!planId || !taskId || this.data.checkingTaskId === Number(taskId)) {
      return;
    }

    this.setData({ checkingTaskId: Number(taskId) });
    try {
      const result = await checkin({ planId: Number(planId), taskId: Number(taskId) });
      showToast(`贴纸贴好 +${result.pointsAwarded}颗糖`, 'success');
      await this.loadToday();
    } catch (error) {
      console.error('checkin error', error);
      this.setData({ checkingTaskId: 0 });
    }
  },

  async handleUndoCheckin(event) {
    const { checkinId } = event.currentTarget.dataset || {};
    if (!checkinId) {
      return;
    }

    const confirmed = await showConfirm('确认撤销这张布布贴纸？撤销后会扣除对应糖果。');
    if (!confirmed) {
      return;
    }

    try {
      await deleteCheckin(checkinId);
      showToast('已拿下这张贴纸', 'success');
      await this.loadToday();
    } catch (error) {
      console.error('undo checkin error', error);
    }
  },
});
