import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { SCHEDULE_LIST } from '../../../actions/schedule';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ schedule, loading }) => ({
  schedule,
  loading: loading.models.schedule,
}))
@Form.create()
class Schedule extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(SCHEDULE_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="查询名称">
            {getFieldDecorator('name')(<Input placeholder="查询名称" />)}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const code = 'schedule';

    const {
      form,
      loading,
      schedule: { data },
    } = this.props;

    const columns = [
      {
        title: '星期一',
        dataIndex: 'monday',
      },
      {
        title: '星期二',
        dataIndex: 'tuesday',
      },
      {
        title: '星期三',
        dataIndex: 'wednesday',
      },
      {
        title: '星期四',
        dataIndex: 'thursday',
      },
      {
        title: '星期五',
        dataIndex: 'friday',
      },
      {
        title: '星期六',
        dataIndex: 'saturday',
      },
      {
        title: '星期天',
        dataIndex: 'sunday',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Schedule;
