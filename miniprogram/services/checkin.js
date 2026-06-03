import { request } from './request';

export function checkin(data) {
  return request({
    url: '/checkins',
    method: 'POST',
    data,
  });
}

export function deleteCheckin(checkinId) {
  return request({
    url: `/checkins/${checkinId}`,
    method: 'DELETE',
  });
}
