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
    const { Option } = Select;
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
              label="时间段"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
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
            </Form.Item>
            <Form.Item
              label="班级"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                <Option value="B">B</Option>
                <Option value="B1">B1</Option>
                <Option value="B2">B2</Option>
                <Option value="B3">B3</Option>
                <Option value="Bm">Bm</Option>
                <Option value="M">M</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="教师"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                <Option value="Eilna">Eilna</Option>
                <Option value="Eva">Eva</Option>
                <Option value="Hans">Hans</Option>
                <Option value="Jaden">Jaden</Option>
                <Option value="Jamie">Jamie</Option>
                <Option value="Lily">Lily</Option>
                <Option value="Panda">Panda</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

      </Panel>
    );
  }
}
export default Schedule2;
