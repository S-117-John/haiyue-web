import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CLAZZ_DETAIL, CLAZZ_SUBMIT } from '../../../actions/clazz';

const FormItem = Form.Item;

@connect(({ clazz, loading }) => ({
  clazz,
  submitting: loading.effects['clazz/submit'],
}))
@Form.create()
class ClazzEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(CLAZZ_DETAIL(id));
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
        dispatch(CLAZZ_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      clazz: { detail },
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
      <Panel title="修改" back="/haiyue/clazz" action={action}>
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
                initialValue: detail.code,
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
                initialValue: detail.name,
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
                initialValue: detail.manager,
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
                initialValue: detail.teacher,
              })(<Input placeholder="请输入教师" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ClazzEdit;
