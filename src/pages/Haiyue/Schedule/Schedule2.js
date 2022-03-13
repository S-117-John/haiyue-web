import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Calendar, Form, Modal, Select,} from 'antd';
import Panel from '../../../components/Panel';
import { SCHEDULE_LIST } from '../../../actions/schedule';




@connect(({ schedule, loading }) => ({
  schedule,
  loading: loading.models.schedule,
}))
@Form.create()
class Schedule2 extends PureComponent {

  state = {
    isModalVisible: false
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(SCHEDULE_LIST(params));
  };

  onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  dateCellRender = (value) => {
    console.log(value.format('YYYY-MM-DD'));
  };

  onSelect = (value) => {
    console.log(value.format('YYYY-MM-DD'));
    this.setState({
      isModalVisible: true
    })
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  };


  render() {
    const { isModalVisible } = this.state;
    return (
      <Panel>
        <Calendar
          onPanelChange={this.onPanelChange}
          dateCellRender={this.dateCellRender}
          onSelect={this.onSelect}
        />

        <Modal title="选择班级" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="班级"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select placeholder="请选择班级">
                <Select.Option key={1} value='Jaden'>
                  Jaden
                </Select.Option>
                <Select.Option key={2} value='Hans'>
                  Hans
                </Select.Option>
                <Select.Option key={3} value='Panda'>
                  Panda
                </Select.Option>
                <Select.Option key={3} value='Eva'>
                  Eva
                </Select.Option>
                <Select.Option key={3} value='Lily'>
                  Lily
                </Select.Option>
                <Select.Option key={3} value='Jamie'>
                  Jamie
                </Select.Option>
                <Select.Option key={3} value='Eilna'>
                  Eilna
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

      </Panel>
    );
  }
}
export default Schedule2;
