import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Divider, Form, Input, message, Modal, Row, TreeSelect } from 'antd';
import router from 'umi/router';
import Panel from '../../../components/Panel';
import { TENANTPACKAGE_LIST } from '../../../actions/tenantpackage';
import { MENU_INIT } from '../../../actions/menu';
import Grid from '../../../components/Sword/Grid';
import {
  detail as packageDetail,
  remove as packageRemove,
  submit as packageSubmit,
} from '@/services/tenantpackage';
import styles from '@/layouts/Sword.less';
import { validateNull } from '@/utils/utils';
import func from '@/utils/Func';

const FormItem = Form.Item;

@connect(({ menu, tenantPackage, loading }) => ({
  menu,
  tenantPackage,
  loading: loading.models.tenantPackage,
}))
@Form.create()
class TenantPackage extends PureComponent {
  state = {
    stateVisible: false,
    params: {},
    detail: {},
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(MENU_INIT());
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    this.setState({ params });
    dispatch(TENANTPACKAGE_LIST(params));
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

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    const {
      params,
      detail: { id },
    } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = Object.assign(values, { id });
        if (validateNull(formData.packageName)) {
          message.warn('请先输入产品包名!');
          return;
        }
        if (validateNull(formData.menuId)) {
          message.warn('请先选择产品菜单!');
          return;
        }
        formData.menuId = func.join(formData.menuId);
        packageSubmit(formData).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
          } else {
            message.error(resp.msg || '提交失败');
          }
          this.handleSearch(params);
          this.handleStateCancel();
          form.resetFields();
        });
      }
    });
  };

  handleStateCancel = () => {
    this.setState({
      stateVisible: false,
      detail: { id: '' },
    });
  };

  handleClick = (code, record) => {
    if (code === 'add') {
      this.setState({
        stateVisible: true,
        detail: {
          id: '',
        },
      });
    } else if (code === 'edit') {
      const { id } = record;
      packageDetail({ id }).then(resp => {
        if (resp.success) {
          this.setState({ stateVisible: true, detail: resp.data });
        }
      });
    } else if (code === 'delete') {
      const { params } = this.state;
      const { id } = record;
      const refreshSearch = this.handleSearch;
      Modal.confirm({
        title: '删除确认',
        content: '确定删除该条记录?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          packageRemove({ ids: id }).then(resp => {
            if (resp.success) {
              message.success(resp.msg);
              refreshSearch(params);
            } else {
              message.error(resp.msg || '删除失败');
            }
          });
        },
        onCancel() {},
      });
    }
  };

  renderLeftButton = () => (
    <Button icon="plus" type="primary" onClick={() => this.handleClick('add')}>
      新增
    </Button>
  );

  renderRightButton = () => (
    <Button
      type="default"
      style={{ color: '#189dff', border: '1px solid #189dff' }}
      onClick={this.back}
    >
      返回
    </Button>
  );

  back = () => {
    router.push('/system/tenant');
  };

  render() {
    const code = 'tenantPackage';

    const {
      form,
      loading,
      menu: {
        init: { tree },
      },
      tenantPackage: { data },
    } = this.props;

    const { stateVisible, detail } = this.state;

    const { getFieldDecorator } = form;

    const formAllItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    const columns = [
      {
        title: '产品包名',
        dataIndex: 'packageName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 260,
        render: (text, record) => (
          <Fragment>
            <div style={{ textAlign: 'center' }}>
              <Fragment key="edit">
                <a title="修改" onClick={() => this.handleClick('edit', record)}>
                  修改
                </a>
              </Fragment>
              <Divider type="vertical" />
              <Fragment key="delete">
                <a title="删除" onClick={() => this.handleClick('delete', record)}>
                  删除
                </a>
              </Fragment>
            </div>
          </Fragment>
        ),
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderLeftButton={this.renderLeftButton}
          renderRightButton={this.renderRightButton}
          loading={loading}
          data={data}
          columns={columns}
        />
        <Modal
          title="租户产品包配置"
          width={800}
          visible={stateVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleStateCancel}
        >
          <Form style={{ marginTop: 8 }}>
            <Card className={styles.card} bordered={false}>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="产品包名">
                    {getFieldDecorator('packageName', {
                      initialValue: detail.packageName,
                    })(<Input placeholder="请输入产品包名" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="产品菜单">
                    {getFieldDecorator('menuId', {
                      initialValue: detail.menuId ? detail.menuId.split(',') : null,
                    })(
                      <TreeSelect
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={tree}
                        allowClear
                        showSearch
                        treeNodeFilterProp="title"
                        multiple
                        placeholder="请选择产品菜单"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem {...formAllItemLayout} label="备注">
                    {getFieldDecorator('remark', {
                      initialValue: detail.remark,
                    })(<Input placeholder="请输入备注" />)}
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Form>
        </Modal>
      </Panel>
    );
  }
}
export default TenantPackage;
