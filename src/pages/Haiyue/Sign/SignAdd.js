import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { SIGN_SUBMIT } from '../../../actions/sign';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['sign/submit'],
}))
@Form.create()
class SignAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(SIGN_SUBMIT(values));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
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
      <Panel title="新增" back="/haiyue/sign" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="会员编号">
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: '请输入会员编号',
                  },
                ],
              })(<Input placeholder="请输入会员编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="会员姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入会员姓名',
                  },
                ],
              })(<Input placeholder="请输入会员姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="会员电话">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入会员电话',
                  },
                ],
              })(<Input placeholder="请输入会员电话" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="出生日期">
              {getFieldDecorator('birth', {
                rules: [
                  {
                    required: true,
                    message: '请输入出生日期',
                  },
                ],
              })(<Input placeholder="请输入出生日期" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="家长姓名">
              {getFieldDecorator('parentName', {
                rules: [
                  {
                    required: true,
                    message: '请输入家长姓名',
                  },
                ],
              })(<Input placeholder="请输入家长姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="签到时间">
              {getFieldDecorator('signDate', {
                rules: [
                  {
                    required: true,
                    message: '请输入签到时间',
                  },
                ],
              })(<Input placeholder="请输入签到时间" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default SignAdd;
