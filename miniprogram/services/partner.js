import { request } from './request';

export function createInvite() {
  return request({
    url: '/partner/invite',
    method: 'POST',
  });
}

export function bindPartner(code) {
  return request({
    url: '/partner/bind',
    method: 'POST',
    data: { code },
  });
}

export function getPartnerSummary() {
  return request({
    url: '/partner/summary',
  });
}

export function unbindPartner() {
  return request({
    url: '/partner/unbind',
    method: 'POST',
  });
}
