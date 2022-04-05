import React, { PureComponent } from 'react';
import {Form, Input, Card, Button, Select} from 'antd';
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

    const { Option } = Select;

    return (
      <Panel title="新增" back="/haiyue/schedule" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="时段">
              {getFieldDecorator('timePeriod', {

              })(
                <Select>
                  <Option value="11:30-12:00">11:30-12:00</Option>
                  <Option value="11:30-12:10">11:30-12:10</Option>
                  <Option value="12:10-12:50">12:10-12:50</Option>
                  <Option value="12:10-13:00">12:10-13:00</Option>
                  <Option value="15:20-16:00">15:20-16:00</Option>
                  <Option value="15:30-16:00">15:30-16:00</Option>
                  <Option value="16:00-16:40">16:00-16:40</Option>
                  <Option value="16:00-16:50">16:00-16:50</Option>
                  <Option value="17:00-17:30">17:00-17:30</Option>
                  <Option value="17:00-17:40">17:00-17:40</Option>
                  <Option value="18:00-18:40">18:00-18:40</Option>
                  <Option value="18:00-18:50">18:00-18:50</Option>
                  <Option value="19:00-19:50">19:00-19:50</Option>
                </Select>
              )}
            </FormItem>
            {/*<FormItem {...formItemLayout} label="阶段">*/}
            {/*  {getFieldDecorator('clazz', {*/}
            {/*  })(*/}
            {/*    <Select>*/}
            {/*      <Option value="B">B</Option>*/}
            {/*      <Option value="B1">B1</Option>*/}
            {/*      <Option value="B2">B2</Option>*/}
            {/*      <Option value="B3">B3</Option>*/}
            {/*      <Option value="Bm">Bm</Option>*/}
            {/*      <Option value="M">M</Option>*/}
            {/*    </Select>*/}
            {/*  )}*/}
            {/*</FormItem>*/}
            {/*<FormItem {...formItemLayout} label="教练">*/}
            {/*  {getFieldDecorator('teacher', {*/}

            {/*  })(*/}
            {/*    <Select>*/}
            {/*      <Option value="Eilna">Eilna</Option>*/}
            {/*      <Option value="Eva">Eva</Option>*/}
            {/*      <Option value="Hans">Hans</Option>*/}
            {/*      <Option value="Jaden">Jaden</Option>*/}
            {/*      <Option value="Jamie">Jamie</Option>*/}
            {/*      <Option value="Lily">Lily</Option>*/}
            {/*      <Option value="Panda">Panda</Option>*/}
            {/*    </Select>*/}
            {/*  )}*/}
            {/*</FormItem>*/}
            {/*<FormItem {...formItemLayout} label="星期">*/}
            {/*  {getFieldDecorator('week', {*/}
            {/*  })(*/}
            {/*    <Select>*/}
            {/*      <Option value="1">星期一</Option>*/}
            {/*      <Option value="2">星期二</Option>*/}
            {/*      <Option value="3">星期三</Option>*/}
            {/*      <Option value="4">星期四</Option>*/}
            {/*      <Option value="5">星期五</Option>*/}
            {/*      <Option value="6">星期六</Option>*/}
            {/*      <Option value="7">星期七</Option>*/}
            {/*    </Select>*/}
            {/*  )}*/}
            {/*</FormItem>*/}
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default ScheduleAdd;
