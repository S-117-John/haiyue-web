import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { SCHEDULE_DETAIL } from '../../../actions/schedule';

const FormItem = Form.Item;

@connect(({ schedule }) => ({
  schedule,
}))
@Form.create()
class ScheduleView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(SCHEDULE_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/haiyue/schedule/edit/${id}`);
  };

  render() {
    const {
      schedule: { detail },
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
      <Button type="primary" onClick={this.handleEdit}>
        修改
      </Button>
    );

    return (
      <Panel title="查看" back="/haiyue/schedule" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="星期一">
              <span>{detail.monday}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="星期二">
              <span>{detail.tuesday}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="星期三">
              <span>{detail.wednesday}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="星期四">
              <span>{detail.thursday}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="星期五">
              <span>{detail.friday}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="星期六">
              <span>{detail.saturday}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="星期天">
              <span>{detail.sunday}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default ScheduleView;
