export const USER_NAMESPACE = 'user';

export function USER_LIST(payload) {
  return {
    type: `${USER_NAMESPACE}/fetchList`,
    payload,
  };
}

export function USER_INIT() {
  return {
    type: `${USER_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function USER_TENANT_INIT() {
  return {
    type: `${USER_NAMESPACE}/fetchTenantInit`,
    payload: {},
  };
}

export function USER_CHANGE_INIT(payload) {
  return {
    type: `${USER_NAMESPACE}/fetchChangeInit`,
    payload,
  };
}

export function USER_DETAIL(id) {
  return {
    type: `${USER_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function USER_PLATFORM_DETAIL(id) {
  return {
    type: `${USER_NAMESPACE}/fetchPlatformDetail`,
    payload: { id },
  };
}

export function USER_ROLE_GRANT(payload, callback) {
  return {
    type: `${USER_NAMESPACE}/grant`,
    payload,
    callback,
  };
}

export function USER_SUBMIT(payload) {
  return {
    type: `${USER_NAMESPACE}/submit`,
    payload,
  };
}

export function USER_UPDATE(payload) {
  return {
    type: `${USER_NAMESPACE}/update`,
    payload,
  };
}

export function USER_PLATFORM_UPDATE(payload) {
  return {
    type: `${USER_NAMESPACE}/updatePlatform`,
    payload,
  };
}

export function USER_REMOVE(payload) {
  return {
    type: `${USER_NAMESPACE}/remove`,
    payload,
  };
}
