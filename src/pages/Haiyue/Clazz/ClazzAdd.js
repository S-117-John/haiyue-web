import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CLAZZ_SUBMIT } from '../../../actions/clazz';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['clazz/submit'],
}))
@Form.create()
class ClazzAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(CLAZZ_SUBMIT(values));
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
      <Panel title="新增" back="/haiyue/clazz" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="班级编号">
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: '请输入班级编号',
                  },
                ],
              })(<Input placeholder="请输入班级编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="班级姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入班级姓名',
                  },
                ],
              })(<Input placeholder="请输入班级姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="管理员">
              {getFieldDecorator('manager', {
                rules: [
                  {
                    required: true,
                    message: '请输入管理员',
                  },
                ],
              })(<Input placeholder="请输入管理员" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="教师">
              {getFieldDecorator('teacher', {
                rules: [
                  {
                    required: true,
                    message: '请输入教师',
                  },
                ],
              })(<Input placeholder="请输入教师" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ClazzAdd;
