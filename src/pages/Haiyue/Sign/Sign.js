import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row } from 'antd';
import Panel from '../../../components/Panel';
import { SIGN_LIST } from '../../../actions/sign';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ sign, loading }) => ({
  sign,
  loading: loading.models.sign,
}))
@Form.create()
class Sign extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(SIGN_LIST(params));
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
    const code = 'sign';

    const {
      form,
      loading,
      sign: { data },
    } = this.props;

    const columns = [
      {
        title: '会员编号',
        dataIndex: 'code',
      },
      {
        title: '会员姓名',
        dataIndex: 'name',
      },
      {
        title: '会员电话',
        dataIndex: 'phone',
      },
      {
        title: '出生日期',
        dataIndex: 'birth',
      },
      {
        title: '家长姓名',
        dataIndex: 'parentName',
      },
      {
        title: '签到时间',
        dataIndex: 'signDate',
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
export default Sign;
