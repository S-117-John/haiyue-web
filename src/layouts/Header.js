import React from 'react';
import { formatMessage } from 'umi/locale';
import { Button, Form, Layout, message, Modal, Select } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import router from 'umi/router';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';
import { clearCache } from '@/services/user';
import { select as deptSelect } from '../services/dept';
import { select as roleSelect } from '../services/role';
import { refreshToken } from '../services/user';
import {
  getCurrentUser,
  getRefreshToken,
  setAccessToken,
  setAuthority,
  setCurrentUser,
  setRefreshToken,
  setToken,
} from '@/utils/authority';

const { Header } = Layout;
const FormItem = Form.Item;

@Form.create()
class HeaderView extends React.Component {
  state = {
    visible: true,
    deptList: [],
    roleList: [],
    userVisible: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`,
      })}`
    );
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleSwitch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = Object.assign(values, {
          refresh_token: getRefreshToken(),
          tenantId: getCurrentUser().tenantId,
        });
        refreshToken(params)
          .then(resp => {
            const {
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
            } = resp;
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
          })
          .then(() => {
            message.success('????????????');
            this.handleClose();
          });
      }
    });
  };

  handleClose = () => {
    this.setState({ userVisible: false });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      message.success('????????????');
      // router.push('/account/center');
      return;
    }
    if (key === 'userinfo') {
      router.push('/account/settings/base');
      return;
    }
    if (key === 'password') {
      router.push('/account/settings/password');
      return;
    }
    if (key === 'deptSwitch') {
      const user = getCurrentUser();
      deptSelect({ userId: user.userId }).then(resp => {
        if (resp.success) {
          this.setState({ deptList: resp.data });
        }
      });
      roleSelect({ userId: user.userId }).then(resp => {
        if (resp.success) {
          this.setState({ roleList: resp.data });
        }
      });
      this.setState({ userVisible: true });
      return;
    }
    if (key === 'clearCache') {
      clearCache().then(() => {
        message.success('????????????');
      });
      return;
    }
    if (key === 'triggerError') {
      router.push('/exception/trigger');
      return;
    }
    if (key === 'logout') {
      Modal.confirm({
        title: '????????????',
        content: '???????????????????????????',
        okText: '??????',
        okType: 'danger',
        cancelText: '??????',
        onOk() {
          dispatch({
            type: 'login/logout',
          });
        },
        onCancel() {},
      });
    }
  };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    const {
      isMobile,
      handleMenuCollapse,
      setting,
      form: { getFieldDecorator },
    } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible, userVisible, deptList, roleList } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const roleVisible = false;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };
    const HeaderDom = visible ? (
      <div>
        <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
          {isTop && !isMobile ? (
            <TopNavHeader
              theme={navTheme}
              mode="horizontal"
              onCollapse={handleMenuCollapse}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              {...this.props}
            />
          ) : (
            <GlobalHeader
              onCollapse={handleMenuCollapse}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              {...this.props}
            />
          )}
        </Header>
        <Modal
          title="??????????????????"
          width={500}
          visible={userVisible}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleSwitch}>
              ??????
            </Button>,
            <Button key="close" onClick={this.handleClose}>
              ??????
            </Button>,
          ]}
        >
          <Form style={{ marginTop: 8 }} hideRequiredMark>
            <FormItem {...formItemLayout} label="????????????">
              {getFieldDecorator('deptId', {
                rules: [
                  {
                    required: true,
                    message: '?????????????????????',
                  },
                ],
              })(
                <Select placeholder="?????????????????????">
                  {deptList.map(d => (
                    <Select.Option key={d.id} value={d.id}>
                      {d.deptName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            {roleVisible ? (
              <FormItem {...formItemLayout} label="????????????">
                {getFieldDecorator('roleId', {
                  rules: [
                    {
                      required: true,
                      message: '?????????????????????',
                    },
                  ],
                })(
                  <Select placeholder="?????????????????????">
                    {roleList.map(d => (
                      <Select.Option key={d.id} value={d.id}>
                        {d.roleName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            ) : null}
          </Form>
        </Modal>
      </div>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ user, global, setting, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  setting,
}))(HeaderView);
