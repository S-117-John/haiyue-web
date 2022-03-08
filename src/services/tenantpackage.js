import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

export async function list(params) {
  return request(`/api/blade-system/tenant-package/list?${stringify(params)}`);
}

export async function submit(params) {
  return request('/api/blade-system/tenant-package/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/tenant-package/detail?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/tenant-package/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function select(params) {
  return request(`/api/blade-system/tenant-package/select?${stringify(params)}`);
}
