import { request } from './request';

export function getToday() {
  return request({
    url: '/today',
  });
}
