import { checkin, deleteCheckin } from '../../services/checkin';
import { deletePlan, getPlanDetail } from '../../services/plan';
import { showConfirm, showToast } from '../../utils/toast';

Page({
  data: {
    loading: true,
    planId: 0,
    detail: null,
    checkingTaskId: 0,
  },

  onLoad(options) {
    const planId = Number(options.id || 0);
    this.setData({ planId });
  },

  onShow() {
    if (this.data.planId) {
      void this.loadDetail();
    }
  },

  async loadDetail() {
    this.setData({ loading: true });
    try {
      const detail = await getPlanDetail(this.data.planId);
      this.setData({ detail, checkingTaskId: 0 });
    } catch (error) {
      console.error('load detail error', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  async handleCheckin(event) {
    const { taskId } = event.currentTarget.dataset || {};

    if (!taskId || this.data.checkingTaskId === Number(taskId)) {
      return;
    }

    this.setData({ checkingTaskId: Number(taskId) });
    try {
      const result = await checkin({ planId: this.data.planId, taskId: Number(taskId) });
      showToast(`打卡成功 +${result.pointsAwarded}分`, 'success');
      await this.loadDetail();
    } catch (error) {
      console.error('detail checkin error', error);
      this.setData({ checkingTaskId: 0 });
    }
  },

  async handleUndoCheckin(event) {
    const { checkinId } = event.currentTarget.dataset || {};
    if (!checkinId) {
      return;
    }

    const confirmed = await showConfirm('确认撤销本次打卡？撤销后将扣除对应积分。');
    if (!confirmed) {
      return;
    }

    try {
      await deleteCheckin(checkinId);
      showToast('已撤销打卡', 'success');
      await this.loadDetail();
    } catch (error) {
      console.error('undo checkin error', error);
    }
  },

  async handleDeletePlan() {
    const confirmed = await showConfirm('确认删除此计划？删除后不可恢复。');
    if (!confirmed) {
      return;
    }

    try {
      await deletePlan(this.data.planId);
      showToast('计划已删除', 'success');
      setTimeout(() => {
        wx.navigateBack();
      }, 300);
    } catch (error) {
      console.error('delete plan error', error);
    }
  },
});
