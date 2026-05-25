import { request } from './request';

export function getMe() {
  return request({
    url: '/users/me',
  });
}
