import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Checkbox, Alert, Icon, Row, Col, Card, Modal, Button, Form, Select } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';
import { tenantMode, captchaMode, authUrl } from '../../defaultSettings';
import { getCurrentUser } from '@/utils/authority';

const { Tab, TenantId, UserName, Password, Captcha, Submit } = Login;

const FormItem = Form.Item;

@connect(({ login, tenant, loading }) => ({
  login,
  tenant,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class LoginPage extends Component {
  state = {
    deptId: '',
    roleId: '',
    type: 'account',
    autoLogin: true,
  };

  componentWillMount() {}

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type, deptId, roleId } = this.state;
    if (!err) {
      const {
        dispatch,
        tenant: { info },
      } = this.props;
      const { tenantId } = info;
      dispatch({
        type: 'login/login',
        payload: {
          tenantId,
          deptId,
          roleId,
          ...values,
          type,
        },
      });
    }
  };

  handleLogin = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        this.setState({
          deptId: values.deptId || '',
          roleId: values.roleId || '',
        });
        dispatch({
          type: 'login/visible',
          payload: {
            userVisible: false,
          },
        }).then(() => {
          this.loginForm.validateFields(this.handleSubmit);
        });
      }
    });
  };

  handleClick = source => {
    window.location.href = `${authUrl}/${source}`;
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const {
      login,
      submitting,
      tenant: { info },
      form: { getFieldDecorator },
    } = this.props;
    const { type, autoLogin } = this.state;
    const { tenantId } = info;
    const { deptList, roleList, userVisible } = login;
    const tenantVisible = tenantMode && tenantId === '000000';

    let deptVisible = false;
    let roleVisible = false;
    const user = getCurrentUser();
    const deptId = user.deptId || '';
    const roleId = user.roleId || '';
    if (deptId.includes(',')) {
      deptVisible = true;
    }
    if (roleId.includes(',')) {
      roleVisible = true;
    }

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

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            {tenantVisible ? (
              <TenantId
                defaultValue={`${tenantId}`}
                name="tenantId"
                placeholder={`${formatMessage({ id: 'app.login.tenantId' })}: 000000`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.tenantId.required' }),
                  },
                ]}
              />
            ) : null}
            <UserName
              defaultValue="admin"
              name="username"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}: admin`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              defaultValue="admin"
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}: admin`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
            {captchaMode ? <Captcha name="code" mode="image" /> : null}
          </Tab>
          <Tab key="social" tab={formatMessage({ id: 'app.login.tab-login-social' })}>
            <Card className={styles.card} bordered={false}>
              <Row gutter={24} className={styles.iconPreview}>
                <Col span={4} key="github">
                  <Icon
                    type="github"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('github');
                    }}
                  />
                </Col>
                <Col span={4} key="gitee">
                  <Icon
                    type="google-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('gitee');
                    }}
                  />
                </Col>
                <Col span={4} key="wechat">
                  <Icon
                    type="wechat"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('wechat_open');
                    }}
                  />
                </Col>
                <Col span={4} key="dingtalk">
                  <Icon
                    type="dingtalk-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('dingtalk');
                    }}
                  />
                </Col>
                <Col span={4} key="alipay">
                  <Icon
                    type="alipay-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('alipay');
                    }}
                  />
                </Col>
                <Col span={4} key="taobao">
                  <Icon
                    type="taobao-circle"
                    theme="filled"
                    onClick={() => {
                      this.handleClick('taobao');
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
        <Modal
          title="用户信息选择"
          width={500}
          visible={userVisible}
          closable={false}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleLogin}>
              登录
            </Button>,
          ]}
        >
          <Form style={{ marginTop: 8 }} hideRequiredMark>
            {deptVisible ? (
              <FormItem {...formItemLayout} label="用户部门">
                {getFieldDecorator('deptId', {
                  rules: [
                    {
                      required: true,
                      message: '请选择用户部门',
                    },
                  ],
                })(
                  <Select placeholder="请选择用户部门">
                    {deptList.map(d => (
                      <Select.Option key={d.id} value={d.id}>
                        {d.deptName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            ) : null}
            {roleVisible ? (
              <FormItem {...formItemLayout} label="用户角色">
                {getFieldDecorator('roleId', {
                  rules: [
                    {
                      required: true,
                      message: '请选择用户角色',
                    },
                  ],
                })(
                  <Select placeholder="请选择用户角色">
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
    );
  }
}

export default LoginPage;
