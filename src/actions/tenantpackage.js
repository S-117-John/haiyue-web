export const TENANTPACKAGE_NAMESPACE = 'tenantPackage';

export function TENANTPACKAGE_LIST(payload) {
  return {
    type: `${TENANTPACKAGE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function TENANTPACKAGE_INIT(payload) {
  return {
    type: `${TENANTPACKAGE_NAMESPACE}/fetchInit`,
    payload,
  };
}

export function TENANTPACKAGE_DETAIL(id) {
  return {
    type: `${TENANTPACKAGE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function TENANTPACKAGE_CLEAR_DETAIL() {
  return {
    type: `${TENANTPACKAGE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function TENANTPACKAGE_SUBMIT(payload) {
  return {
    type: `${TENANTPACKAGE_NAMESPACE}/submit`,
    payload,
  };
}

export function TENANTPACKAGE_REMOVE(payload) {
  return {
    type: `${TENANTPACKAGE_NAMESPACE}/remove`,
    payload,
  };
}
