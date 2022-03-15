import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { SIGN_DETAIL, SIGN_SUBMIT } from '../../../actions/sign';

const FormItem = Form.Item;

@connect(({ sign, loading }) => ({
  sign,
  submitting: loading.effects['sign/submit'],
}))
@Form.create()
class SignEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(SIGN_DETAIL(id));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      match: {
        params: { id },
      },
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          id,
          ...values,
        };
        console.log(params);
        dispatch(SIGN_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      sign: { detail },
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
      <Panel title="修改" back="/haiyue/sign" action={action}>
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
                initialValue: detail.code,
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
                initialValue: detail.name,
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
                initialValue: detail.phone,
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
                initialValue: detail.birth,
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
                initialValue: detail.parentName,
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
                initialValue: detail.signDate,
              })(<Input placeholder="请输入签到时间" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default SignEdit;
