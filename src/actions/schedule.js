export const SCHEDULE_NAMESPACE = 'schedule';

export function SCHEDULE_LIST(payload) {
  return {
    type: `${SCHEDULE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function SCHEDULE_DETAIL(id) {
  return {
    type: `${SCHEDULE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function SCHEDULE_CLEAR_DETAIL() {
  return {
    type: `${SCHEDULE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function SCHEDULE_SUBMIT(payload) {
  return {
    type: `${SCHEDULE_NAMESPACE}/submit`,
    payload,
  };
}

export function SCHEDULE_REMOVE(payload) {
  return {
    type: `${SCHEDULE_NAMESPACE}/remove`,
    payload,
  };
}
