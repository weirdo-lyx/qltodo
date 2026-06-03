import { bindPartner, createInvite, getPartnerSummary, unbindPartner } from '../../services/partner';
import { showConfirm, showToast } from '../../utils/toast';

Page({
  data: {
    loading: true,
    actionLoading: false,
    summary: null,
    inviteCode: '',
    expiresAt: '',
    bindCode: '',
  },

  onShow() {
    void this.loadSummary();
  },

  async loadSummary() {
    this.setData({ loading: true });
    try {
      const summary = await getPartnerSummary();
      this.setData({ summary });
    } catch (error) {
      console.error('load partner summary error', error);
      this.setData({ summary: null });
    } finally {
      this.setData({ loading: false, actionLoading: false });
    }
  },

  handleCodeInput(event) {
    this.setData({ bindCode: event.detail.value });
  },

  async handleCreateInvite() {
    if (this.data.actionLoading) {
      return;
    }

    this.setData({ actionLoading: true });
    try {
      const result = await createInvite();
      this.setData({ inviteCode: result.code, expiresAt: result.expiresAt });
      showToast('布布绑定码已生成', 'success');
    } catch (error) {
      console.error('create invite error', error);
    } finally {
      this.setData({ actionLoading: false });
    }
  },

  async handleBind() {
    const code = this.data.bindCode.trim();
    if (!code) {
      showToast('请输入绑定码');
      return;
    }

    if (this.data.actionLoading) {
      return;
    }

    this.setData({ actionLoading: true });
    try {
      await bindPartner(code);
      showToast('小熊绑定成功', 'success');
      this.setData({ bindCode: '', inviteCode: '', expiresAt: '' });
      await this.loadSummary();
    } catch (error) {
      console.error('bind partner error', error);
      this.setData({ actionLoading: false });
    }
  },

  async handleUnbind() {
    const confirmed = await showConfirm('确认解绑这只小熊吗？解绑后需要重新绑定。');
    if (!confirmed || this.data.actionLoading) {
      return;
    }

    this.setData({ actionLoading: true });
    try {
      await unbindPartner();
      showToast('小熊已解绑', 'success');
      this.setData({ inviteCode: '', expiresAt: '' });
      await this.loadSummary();
    } catch (error) {
      console.error('unbind partner error', error);
      this.setData({ actionLoading: false });
    }
  },
});
