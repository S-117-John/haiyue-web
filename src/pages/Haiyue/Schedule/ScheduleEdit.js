import React, { PureComponent } from 'react';
import { Form, Input, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { SCHEDULE_DETAIL, SCHEDULE_SUBMIT } from '../../../actions/schedule';

const FormItem = Form.Item;

@connect(({ schedule, loading }) => ({
  schedule,
  submitting: loading.effects['schedule/submit'],
}))
@Form.create()
class ScheduleEdit extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(SCHEDULE_DETAIL(id));
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
        dispatch(SCHEDULE_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      schedule: { detail },
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
      <Panel title="修改" back="/haiyue/schedule" action={action}>
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
                initialValue: detail.monday,
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
                initialValue: detail.tuesday,
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
                initialValue: detail.wednesday,
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
                initialValue: detail.thursday,
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
                initialValue: detail.friday,
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
                initialValue: detail.saturday,
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
                initialValue: detail.sunday,
              })(<Input placeholder="请输入星期天" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ScheduleEdit;
