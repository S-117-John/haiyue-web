import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { USER_PLATFORM_DETAIL, USER_PLATFORM_UPDATE } from '../../../actions/user';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/submit'],
}))
@Form.create()
class UserPlatform extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(USER_PLATFORM_DETAIL(id));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      match: {
        params: { id },
      },
      user: { detail },
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          userId: id,
          userType: detail.userType,
          userExt: values.userExt,
        };
        dispatch(USER_PLATFORM_UPDATE(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      user: { detail },
      submitting,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const action = (
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="用户平台拓展信息" back="/system/user" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="拓展信息">
              {getFieldDecorator('userExt', {
                rules: [
                  {
                    required: true,
                    message: '请输入拓展信息',
                  },
                ],
                initialValue: detail.userExt,
              })(<TextArea placeholder="请输入拓展信息" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default UserPlatform;
