export const DEV_API_BASE_URL = 'http://101.43.165.59:8000/api'
export const PROD_API_BASE_URL = 'https://www.lyxcjl.xyz/api';

const accountInfo = typeof wx.getAccountInfoSync === 'function' ? wx.getAccountInfoSync() : null;
const envVersion = accountInfo?.miniProgram?.envVersion ?? 'develop';

// develop: 开发版, trial: 体验版, release: 正式版
// 开发版、体验版和正式版都使用生产环境 HTTPS 域名（确保与后端联调一致）
export const API_BASE_URL = PROD_API_BASE_URL;
