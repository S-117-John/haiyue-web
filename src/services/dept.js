import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

// =====================机构===========================

export async function list(params) {
  return request(`/api/blade-system/dept/list?${stringify(params)}`);
}

export async function tree(params) {
  return request(`/api/blade-system/dept/tree?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/dept/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-system/dept/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/dept/detail?${stringify(params)}`);
}

export async function select(params) {
  return request(`/api/blade-system/dept/select?${stringify(params)}`);
}
