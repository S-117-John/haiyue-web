import React, {Fragment, PureComponent} from 'react';
import { connect } from 'dva';
import {Button, Col, Divider, Form, Input, Row} from 'antd';
import Panel from '../../../components/Panel';
import { COMMENTS_LIST_DETAIL} from '../../../actions/comments';
import Grid from '../../../components/Sword/Grid';
import router from "umi/router";

const FormItem = Form.Item;

@connect(({ comments, loading }) => ({
  comments,
  loading: loading.models.comments,
}))
@Form.create()
class Comments extends PureComponent {

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(COMMENTS_LIST_DETAIL({"id":id}));
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    const value = { ...params, id };
    dispatch(COMMENTS_LIST_DETAIL(value));
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
          router.push(`/haiyue/comments/edit/${rows[0].id}`);
        }}
      >
        课后评价
      </a>
    </Fragment>
  );

  render() {
    const code = 'comments';

    const {
      form,
      loading,
      comments: { data },
    } = this.props;

    const columns = [
      {
        title: '会员姓名',
        dataIndex: 'name',
      },
      {
        title: '评论时间',
        dataIndex: 'commentsDate',
      },
      {
        title: '评论人',
        dataIndex: 'type',
      },
      {
        title: '评论内容',
        dataIndex: 'comments',
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
export default Comments;
