import React, {Fragment, PureComponent} from 'react';
import { connect } from 'dva';
import {Button, Col, Divider, Form, Input, Popconfirm, Row} from 'antd';
import Panel from '../../../components/Panel';
import { MEMBER_LIST } from '../../../actions/member';
import Grid from '../../../components/Sword/Grid';
import router from "umi/router";
import request from "@/utils/request";
import func from "@/utils/Func";

const FormItem = Form.Item;

@connect(({ member, loading }) => ({
  member,
  loading: loading.models.member,
}))
@Form.create()
class Member extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(MEMBER_LIST(params));
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

  handleClick = id => {
    // alert(JSON.stringify(rows))
    return request('/api/haiyue/sign/sign', {
      method: 'POST',
      body: func.toFormData({ids:id}),
    });
  };

  renderActionButton = (keys, rows) => (
    <Fragment>
      <Divider type="vertical" />
      <Popconfirm
        title="确认签到?"
        onConfirm={() => {
          this.handleClick(rows[0].id);
        }}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">签到</a>
      </Popconfirm>
      {/*<a*/}
      {/*  title="签到"*/}
      {/*  onClick={() => {*/}
      {/*    this.handleClick(rows);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  列表*/}
      {/*</a>*/}
    </Fragment>
  );

  render() {
    const code = 'member';

    const {
      form,
      loading,
      member: { data },
    } = this.props;

    const columns = [
      {
        title: '会员编号',
        dataIndex: 'code',
      },
      {
        title: '会员班级',
        dataIndex: 'clazz',
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
        title: '宝宝小名',
        dataIndex: 'nickname',
      },
      {
        title: '课程数',
        dataIndex: 'classNum',
      },
      {
        title: '赠课数',
        dataIndex: 'giveNum',
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
export default Member;
