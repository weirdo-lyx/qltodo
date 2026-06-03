import { createPlan } from '../../services/plan';
import { showToast } from '../../utils/toast';

Page({
  data: {
    loading: false,
    title: '',
    totalDays: '',
    points: 5,
    pointOptions: [
      { value: 5, label: '5 分' },
      { value: 10, label: '10 分' },
    ],
  },

  handleTitleChange(event) {
    this.setData({ title: event.detail.value });
  },

  handleDaysChange(event) {
    this.setData({ totalDays: event.detail.value });
  },

  handlePointsChange(event) {
    this.setData({ points: event.detail.value });
  },

  handlePointsSelect(event) {
    const { value } = event.currentTarget.dataset || {};
    this.setData({ points: Number(value) });
  },

  async handleSubmit() {
    if (this.data.loading) {
      return;
    }

    const title = this.data.title.trim();
    const totalDays = Number(this.data.totalDays);
    const points = Number(this.data.points);

    if (!title) {
      showToast('约定名不能为空');
      return;
    }

    if (!totalDays || totalDays <= 0) {
      showToast('约定天数需大于 0');
      return;
    }

    if (Number.isNaN(points) || points < 0) {
      showToast('请输入有效糖果数');
      return;
    }

    this.setData({ loading: true });
    try {
      await createPlan({ title, totalDays, points });
      showToast('布布约定创建成功', 'success');
      setTimeout(() => {
        wx.switchTab({ url: '/pages/plans/index' });
      }, 300);
    } catch (error) {
      console.error('create plan error', error);
    } finally {
      this.setData({ loading: false });
    }
  },
});
