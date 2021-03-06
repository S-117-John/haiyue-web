import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

export async function list(params) {
  return request(`/api/blade-system/tenant/list?${stringify(params)}`);
}

export async function select(params) {
  return request(`/api/blade-system/tenant/select?${stringify(params)}`);
}

export async function submit(params) {
  return request('/api/blade-system/tenant/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-system/tenant/detail?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-system/tenant/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function setting(params) {
  return request('/api/blade-system/tenant/setting', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function datasource(params) {
  return request('/api/blade-system/tenant/datasource', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function packageSetting(params) {
  return request('/api/blade-system/tenant/package-setting', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function packageDetail(params) {
  return request(`/api/blade-system/tenant/package-detail?${stringify(params)}`);
}

export async function info(params) {
  return request(`/api/blade-system/tenant/info?${stringify(params)}`);
}
