export const MEMBER_NAMESPACE = 'member';

export function MEMBER_LIST(payload) {
  return {
    type: `${MEMBER_NAMESPACE}/fetchList`,
    payload,
  };
}

export function MEMBER_DETAIL(id) {
  return {
    type: `${MEMBER_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function MEMBER_CLEAR_DETAIL() {
  return {
    type: `${MEMBER_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function MEMBER_SUBMIT(payload) {
  return {
    type: `${MEMBER_NAMESPACE}/submit`,
    payload,
  };
}

export function MEMBER_REMOVE(payload) {
  return {
    type: `${MEMBER_NAMESPACE}/remove`,
    payload,
  };
}
