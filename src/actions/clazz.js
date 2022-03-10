export const CLAZZ_NAMESPACE = 'clazz';

export function CLAZZ_LIST(payload) {
  return {
    type: `${CLAZZ_NAMESPACE}/fetchList`,
    payload,
  };
}

export function CLAZZ_DETAIL(id) {
  return {
    type: `${CLAZZ_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function CLAZZ_CLEAR_DETAIL() {
  return {
    type: `${CLAZZ_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function CLAZZ_SUBMIT(payload) {
  return {
    type: `${CLAZZ_NAMESPACE}/submit`,
    payload,
  };
}

export function CLAZZ_REMOVE(payload) {
  return {
    type: `${CLAZZ_NAMESPACE}/remove`,
    payload,
  };
}
