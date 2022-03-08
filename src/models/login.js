import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { stringify } from 'qs';
import { getFakeCaptcha } from '../services/api';
import { accountLogin, socialLogin } from '../services/user';
import { dynamicRoutes, dynamicButtons } from '../services/menu';
import { select as deptSelect } from '../services/dept';
import { select as roleSelect } from '../services/role';

import {
  setAuthority,
  setToken,
  setAccessToken,
  setCurrentUser,
  setRoutes,
  setButtons,
  getCurrentUser,
  removeAll,
  setRefreshToken,
} from '../utils/authority';
import { getPageQuery, formatRoutes, formatButtons } from '../utils/utils';
import { reloadAuthorized } from '../utils/Authorized';
import { getTopUrl } from '../utils/utils';
import { switchMode } from '../defaultSettings';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    deptId: '',
    roleId: '',
    deptList: [],
    roleList: [],
    userVisible: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.error_description) {
        notification.error({
          message: response.error_description,
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            type: 'login',
            data: { ...response },
          },
        });
        const user = getCurrentUser();
        const deptId = user.deptId || '';
        const roleId = user.roleId || '';
        if (switchMode && (deptId.includes(',') || roleId.includes(','))) {
          const deptList = yield call(deptSelect, { deptId });
          const roleList = yield call(roleSelect, { roleId });
          yield put({
            type: 'saveUserData',
            payload: {
              deptId,
              roleId,
              deptList: deptList.data,
              roleList: roleList.data,
              userVisible: true,
            },
          });
        } else {
          const responseRoutes = yield call(dynamicRoutes);
          const responseButtons = yield call(dynamicButtons);
          yield put({
            type: 'saveMenuData',
            payload: {
              routes: responseRoutes.data,
              buttons: responseButtons.data,
            },
          });
          reloadAuthorized();
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              redirect = null;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        }
      }
    },
    *socialLogin({ payload }, { call, put }) {
      const response = yield call(socialLogin, payload);
      if (response.error_description) {
        notification.error({
          message: response.error_description,
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            type: 'login',
            data: { ...response },
          },
        });
        reloadAuthorized();
        const topUrl = getTopUrl();
        const redirectUrl = '/oauth/redirect/';
        // eslint-disable-next-line prefer-destructuring
        window.location.href = topUrl.split(redirectUrl)[0];
        yield put(routerRedux.replace('/'));
      }
    },
    *visible({ payload }, { put }) {
      yield put({
        type: 'changeUserVisible',
        payload,
      });
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          type: 'logout',
          data: {
            authority: 'guest',
            logout: true,
          },
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { status, type } = payload;

      if (status) {
        const {
          data: {
            token_type,
            access_token,
            refresh_token,
            tenant_id,
            dept_id,
            role_id,
            role_name,
            account,
            user_id,
            oauth_id,
            user_name,
            avatar,
          },
        } = payload;
        const token = `${token_type} ${access_token}`;
        setToken(token);
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setAuthority(role_name);
        setCurrentUser({
          userId: user_id,
          oauthId: oauth_id,
          tenantId: tenant_id,
          deptId: dept_id,
          roleId: role_id,
          avatar,
          account,
          name: user_name,
          authority: role_name,
        });
      } else {
        removeAll();
      }

      return {
        ...state,
        status: type === 'login' ? (status ? 'ok' : 'error') : '',
        type: payload.type,
      };
    },
    changeUserVisible(state, { payload }) {
      const { userVisible } = payload;
      return {
        ...state,
        userVisible,
      };
    },
    saveUserData(state, { payload }) {
      const { deptId, roleId, deptList, roleList, userVisible } = payload;
      return {
        ...state,
        deptId,
        roleId,
        deptList,
        roleList,
        userVisible,
      };
    },
    saveMenuData(state, { payload }) {
      const { routes, buttons } = payload;
      setRoutes(formatRoutes(routes));
      setButtons(formatButtons(buttons));
      return {
        ...state,
      };
    },
  },
};
