import React, { PureComponent } from 'react';
import {Form, Input, Card, Button, Comment, List} from 'antd';
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

    const { TextArea } = Input;

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
            <FormItem {...formItemLayout} label="会员姓名">
              {getFieldDecorator('name', {

                initialValue: detail.name,
              })(<Input placeholder="请输入会员姓名" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="会员电话">
              {getFieldDecorator('phone', {

                initialValue: detail.phone,
              })(<Input placeholder="请输入会员电话" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="出生日期">
              {getFieldDecorator('birth', {

                initialValue: detail.birth,
              })(<Input placeholder="请输入出生日期" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="家长姓名">
              {getFieldDecorator('parentName', {

                initialValue: detail.parentName,
              })(<Input placeholder="请输入家长姓名" disabled />)}
            </FormItem>

            <FormItem {...formItemLayout} label="评价">
              {getFieldDecorator('evaluation', {
                rules: [
                  {
                    required: true,
                    message: '评价',
                  },
                ],
                initialValue: detail.evaluation,
              })(<TextArea rows={4} />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default SignEdit;
