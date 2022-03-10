import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { MEMBER_SUBMIT } from '../../../actions/member';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['member/submit'],
}))
@Form.create()
class MemberAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(MEMBER_SUBMIT(values));
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
      <Panel title="新增" back="/haiyue/member" action={action}>
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
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default MemberAdd;
