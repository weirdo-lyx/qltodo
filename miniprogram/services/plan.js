import { request } from './request';

export function createPlan(data) {
  return request({
    url: '/plans',
    method: 'POST',
    data,
  });
}

export function getPlans() {
  return request({
    url: '/plans',
  });
}

export function getPlanDetail(planId) {
  return request({
    url: `/plans/${planId}`,
  });
}

export function deletePlan(planId) {
  return request({
    url: `/plans/${planId}/delete`,
    method: 'POST',
  });
}
