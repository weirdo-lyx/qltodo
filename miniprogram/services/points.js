import { request } from './request';

export function getPointsLogs(data) {
  return request({
    url: '/points/logs',
    data,
  });
}
