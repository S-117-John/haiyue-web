import React, { PureComponent } from 'react';
import {Form, Input, Card, Button, DatePicker} from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { MEMBER_DETAIL, MEMBER_SUBMIT } from '../../../actions/member';

const FormItem = Form.Item;

@connect(({ member, loading }) => ({
  member,
  submitting: loading.effects['member/submit'],
}))
@Form.create()
class MemberEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(MEMBER_DETAIL(id));
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
        dispatch(MEMBER_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      member: { detail },
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
      <Panel title="修改" back="/haiyue/member" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="会员编号">
              {getFieldDecorator('code', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入会员编号',
                //   },
                // ],
                initialValue: detail.code,
              })(<Input placeholder="请输入会员编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="会员姓名">
              {getFieldDecorator('name', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入会员姓名',
                //   },
                // ],
                initialValue: detail.name,
              })(<Input placeholder="请输入会员姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="会员电话">
              {getFieldDecorator('phone', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入会员电话',
                //   },
                // ],
                initialValue: detail.phone,
              })(<Input placeholder="请输入会员电话" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="出生日期">
              {getFieldDecorator('birth', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入出生日期',
                //   },
                // ],
                initialValue: detail.birth,
              })(<DatePicker />)}
            </FormItem>
            <FormItem {...formItemLayout} label="家长姓名">
              {getFieldDecorator('parentName', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入家长姓名',
                //   },
                // ],
                initialValue: detail.parentName,
              })(<Input placeholder="请输入家长姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="宝宝小名">
              {getFieldDecorator('nickname', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入宝宝小名',
                //   },
                // ],
                initialValue: detail.nickname,
              })(<Input placeholder="请输入宝宝小名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="课程数">
              {getFieldDecorator('classNum', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入课程数',
                //   },
                // ],
                initialValue: detail.classNum,
              })(<Input placeholder="请输入课程数" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="赠课数">
              {getFieldDecorator('giveNum', {
                // rules: [
                //   {
                //     required: true,
                //     message: '请输入赠课数',
                //   },
                // ],
                initialValue: detail.giveNum,
              })(<Input placeholder="请输入赠课数" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default MemberEdit;
