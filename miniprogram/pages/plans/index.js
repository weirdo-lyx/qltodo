import { deletePlan, getPlans } from '../../services/plan';
import { showConfirm, showToast } from '../../utils/toast';

const statusMap = {
  active: '进行中',
  completed: '已完成',
  paused: '已暂停',
};

Page({
  data: {
    loading: true,
    plans: [],
  },

  onShow() {
    void this.loadPlans();
  },

  async loadPlans() {
    this.setData({ loading: true });
    try {
      const plans = await getPlans();
      const planCards = plans.map((plan) => ({
        ...plan,
        statusText: statusMap[plan.status] || plan.status || '未知',
      }));
      this.setData({ plans: planCards });
    } catch (error) {
      console.error('load plans error', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  goCreatePlan() {
    wx.navigateTo({ url: '/pages/plan-create/index' });
  },

  goDetail(event) {
    const { id } = event.currentTarget.dataset || {};
    wx.navigateTo({ url: `/pages/plan-detail/index?id=${id}` });
  },

  async handleDeletePlan(event) {
    const { id } = event.currentTarget.dataset || {};
    if (!id) {
      return;
    }

    const confirmed = await showConfirm('确认删除此计划？删除后不可恢复。');
    if (!confirmed) {
      return;
    }

    try {
      await deletePlan(id);
      showToast('计划已删除', 'success');
      await this.loadPlans();
    } catch (error) {
      console.error('delete plan error', error);
    }
  },
});
