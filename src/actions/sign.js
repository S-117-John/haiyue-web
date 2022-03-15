export const SIGN_NAMESPACE = 'sign';

export function SIGN_LIST(payload) {
  return {
    type: `${SIGN_NAMESPACE}/fetchList`,
    payload,
  };
}

export function SIGN_DETAIL(id) {
  return {
    type: `${SIGN_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function SIGN_CLEAR_DETAIL() {
  return {
    type: `${SIGN_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function SIGN_SUBMIT(payload) {
  return {
    type: `${SIGN_NAMESPACE}/submit`,
    payload,
  };
}

export function SIGN_REMOVE(payload) {
  return {
    type: `${SIGN_NAMESPACE}/remove`,
    payload,
  };
}
