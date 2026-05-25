import { request } from './request';

export function mockLogin(data) {
  return request({
    url: '/auth/mock-login',
    method: 'POST',
    data,
  });
}

export function wxLogin(data) {
  return request({
    url: '/auth/wx-login',
    method: 'POST',
    data,
  });
}
