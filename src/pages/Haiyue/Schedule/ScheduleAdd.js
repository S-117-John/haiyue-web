import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { SCHEDULE_SUBMIT } from '../../../actions/schedule';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['schedule/submit'],
}))
@Form.create()
class ScheduleAdd extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(SCHEDULE_SUBMIT(values));
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
      <Panel title="新增" back="/haiyue/schedule" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="星期一">
              {getFieldDecorator('monday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期一',
                  },
                ],
              })(<Input placeholder="请输入星期一" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="星期二">
              {getFieldDecorator('tuesday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期二',
                  },
                ],
              })(<Input placeholder="请输入星期二" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="星期三">
              {getFieldDecorator('wednesday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期三',
                  },
                ],
              })(<Input placeholder="请输入星期三" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="星期四">
              {getFieldDecorator('thursday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期四',
                  },
                ],
              })(<Input placeholder="请输入星期四" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="星期五">
              {getFieldDecorator('friday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期五',
                  },
                ],
              })(<Input placeholder="请输入星期五" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="星期六">
              {getFieldDecorator('saturday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期六',
                  },
                ],
              })(<Input placeholder="请输入星期六" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="星期天">
              {getFieldDecorator('sunday', {
                rules: [
                  {
                    required: true,
                    message: '请输入星期天',
                  },
                ],
              })(<Input placeholder="请输入星期天" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ScheduleAdd;
