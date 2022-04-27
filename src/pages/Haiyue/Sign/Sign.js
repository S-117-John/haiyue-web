import React, {Fragment, PureComponent} from 'react';
import { connect } from 'dva';
import {Button, Col, Divider, Form, Input, Row} from 'antd';
import Panel from '../../../components/Panel';
import { SIGN_LIST } from '../../../actions/sign';
import Grid from '../../../components/Sword/Grid';
import router from "umi/router";

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

  renderActionButton = (keys, rows) => (
    <Fragment>
      <Divider type="vertical" />
      <a
        title="课后评价"
        onClick={() => {
          this.handleClick(rows[0].id);
        }}
      >
        课后评价
      </a>
    </Fragment>
  );

  handleClick = parentId => {
    router.push(`/haiyue/sign/edit/${parentId}`);
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
          renderActionButton={this.renderActionButton}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Sign;
