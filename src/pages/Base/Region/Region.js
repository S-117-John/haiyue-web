import React, { PureComponent } from 'react';
import {
  Upload,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Tree,
  Cascader,
  Radio,
  message,
  Modal,
  Icon,
  Switch,
} from 'antd';
import Panel from '../../../components/Panel';
import styles from '@/layouts/Sword.less';
import { getLazyTree, detail, submit, remove } from '../../../services/region';
import { getAccessToken, getButton, getToken, hasButton } from '../../../utils/authority';
import Func from '../../../utils/Func';

const FormItem = Form.Item;
const { TreeNode } = Tree;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
const { Dragger } = Upload;

@Form.create()
class Region extends PureComponent {
  state = {
    topCode: '00',
    treeData: [],
    treeCascader: [],
    excelVisible: false,
    debugVisible: false,
    confirmLoading: false,
    isCovered: 0,
  };

  // ============ 初始化数据 ===============
  componentWillMount() {
    this.initTree();
    this.initCascader('00');
  }

  initTree = () => {
    const { topCode } = this.state;
    getLazyTree({ parentCode: topCode }).then(resp => {
      if (resp.success) {
        this.setState({
          treeData: resp.data.map(item => {
            return { ...item, isLeaf: !item.hasChildren };
          }),
        });
      }
    });
  };

  initCascader = code => {
    getLazyTree({ parentCode: code }).then(resp => {
      if (resp.success) {
        this.setState({
          treeCascader: resp.data.map(item => {
            return {
              label: item.title,
              value: item.value,
              isLeaf: !item.hasChildren,
            };
          }),
        });
      }
    });
  };

  onSelect = checkedTreeKeys => {
    const code = checkedTreeKeys[0];
    if (Func.isEmpty(code)) {
      return;
    }
    detail({ code }).then(resp => {
      if (resp.success) {
        const { form } = this.props;
        const { data } = resp;
        form.setFieldsValue({
          parentCode: data.parentCode,
          parentName: data.parentName,
          code: data.code,
          name: data.name,
          regionLevel: data.regionLevel,
          sort: data.sort,
          remark: data.remark,
        });
      }
    });
  };

  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      getLazyTree({ parentCode: treeNode.props.id }).then(resp => {
        if (resp.success) {
          const { treeData } = this.state;
          // eslint-disable-next-line no-param-reassign
          treeNode.props.dataRef.children = resp.data.map(item => {
            return { ...item, isLeaf: !item.hasChildren };
          });
          this.setState({
            treeData: [...treeData],
          });
        }
        resolve();
      });
    });

  onCascaderChange = (value, selectedOptions) => {
    window.console.log(value, selectedOptions);
  };

  onLoadCascaderData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    getLazyTree({ parentCode: targetOption.value }).then(resp => {
      if (resp.success) {
        targetOption.loading = false;
        targetOption.children = resp.data.map(item => {
          return {
            label: item.title,
            value: item.value,
            isLeaf: !item.hasChildren,
          };
        });
        const { treeCascader } = this.state;
        this.setState({
          treeCascader: [...treeCascader],
        });
      }
    });
  };

  handleAdd = () => {
    const { form } = this.props;
    const region = form.getFieldsValue();
    if (!region.code || !region.name) {
      message.warn('请先选择一项区划!');
      return;
    }
    form.setFieldsValue({
      parentCode: region.code,
      parentName: region.name,
      code: region.code,
      name: '',
      regionLevel: region.regionLevel < 5 ? region.regionLevel + 1 : region.regionLevel,
      remark: region.remark,
    });
  };

  handleDelete = () => {
    const { form } = this.props;
    const code = form.getFieldValue('code');
    Modal.confirm({
      title: '删除确认',
      content: '确定删除该条记录?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        remove({ id: code }).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
            form.resetFields();
          } else {
            message.error(resp.msg || '删除失败');
          }
        });
      },
      onCancel() {},
    });
  };

  handleImport = () => {
    this.setState({ excelVisible: true });
  };

  handleExcelImport = () =>
    this.setState({
      excelVisible: false,
    });

  handleExcelCancel = () =>
    this.setState({
      excelVisible: false,
    });

  handleExport = () => {
    Modal.confirm({
      title: '行政区划导出确认',
      content: '是否导出行政区划数据?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        window.open(`/api/blade-system/region/export-region?Blade-Auth=${getAccessToken()}`);
      },
      onCancel() {},
    });
  };

  handleTemplate = () => {
    window.open(`/api/blade-system/region/export-template?Blade-Auth=${getAccessToken()}`);
  };

  onSwitchChange = checked => {
    this.setState({
      isCovered: checked ? 1 : 0,
    });
  };

  handleDebug = () => {
    this.setState({ debugVisible: true });
  };

  handleDebugCancel = () => {
    this.setState({ debugVisible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    const { topCode } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      const parentCode = form.getFieldValue('parentCode');
      const code = form.getFieldValue('code');
      if (parentCode === code) {
        message.warn('请输入正确的区划子编号!');
        return;
      }
      const params = {
        ...values,
        parentCode: parentCode === topCode ? '' : parentCode,
      };
      submit(params).then(resp => {
        if (resp.success) {
          message.success(resp.msg);
          form.resetFields();
        } else {
          message.error(resp.msg || '提交失败');
        }
      });
    });
  };

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={item.title} key={item.key} dataRef={item} />;
    });

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const buttons = getButton('region');

    const {
      treeData,
      treeCascader,
      excelVisible,
      debugVisible,
      confirmLoading,
      isCovered,
    } = this.state;

    const uploadProps = {
      name: 'file',
      headers: {
        'Blade-Auth': getToken(),
      },
      action: `/api/blade-system/region/import-region?isCovered=${isCovered}`,
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };

    return (
      <Panel>
        <Row gutter={24}>
          <Col span={8}>
            <Card className={styles.card} bordered={false} style={{ marginRight: '10px' }}>
              <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
                {this.renderTreeNodes(treeData)}
              </Tree>
            </Card>
          </Col>
          <Col span={16}>
            <Row gutter={24}>
              <Card className={styles.card} bordered={false}>
                <Col span={18}>
                  <ButtonGroup>
                    {hasButton(buttons, 'region_add') ? (
                      <Button type="primary" icon="plus" onClick={this.handleAdd}>
                        新增下级
                      </Button>
                    ) : null}
                    {hasButton(buttons, 'region_delete') ? (
                      <Button type="danger" icon="delete" onClick={this.handleDelete}>
                        删除
                      </Button>
                    ) : null}
                    {hasButton(buttons, 'region_import') ? (
                      <Button icon="upload" onClick={this.handleImport}>
                        导入
                      </Button>
                    ) : null}
                    {hasButton(buttons, 'region_export') ? (
                      <Button icon="download" onClick={this.handleExport}>
                        导出
                      </Button>
                    ) : null}
                    {hasButton(buttons, 'region_debug') ? (
                      <Button icon="right-circle" onClick={this.handleDebug}>
                        调试
                      </Button>
                    ) : null}
                  </ButtonGroup>
                </Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  <ButtonGroup>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                      提 交
                    </Button>
                    <Button onClick={this.handleReset}>重 置</Button>
                  </ButtonGroup>
                </Col>
              </Card>
            </Row>
            <Row gutter={24}>
              <Card className={styles.card} bordered={false}>
                <Form>
                  <FormItem {...formItemLayout} label="父区划编号">
                    {getFieldDecorator('parentCode', {
                      rules: [
                        {
                          required: true,
                          message: '请输入父区划编号',
                        },
                      ],
                    })(<Input disabled placeholder="请输入父区划编号" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="父区划名称">
                    {getFieldDecorator('parentName', {
                      rules: [
                        {
                          required: true,
                          message: '请输入父区划名称',
                        },
                      ],
                    })(<Input disabled placeholder="请输入父区划名称" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="区划编号">
                    {getFieldDecorator('code', {
                      rules: [
                        {
                          required: true,
                          message: '请输入区划编号',
                        },
                      ],
                    })(<Input placeholder="请输入区划编号" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="区划名称">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          required: true,
                          message: '请输入区划名称',
                        },
                      ],
                    })(<Input placeholder="请输入区划名称" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="区划等级">
                    {getFieldDecorator('regionLevel', {
                      rules: [
                        {
                          required: true,
                          message: '请输入区划等级',
                        },
                      ],
                    })(
                      <Radio.Group>
                        <Radio value={0}>国家</Radio>
                        <Radio value={1}>省份/直辖市</Radio>
                        <Radio value={2}>地市</Radio>
                        <Radio value={3}>区县</Radio>
                        <Radio value={4}>乡镇</Radio>
                        <Radio value={5}>村委</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} className={styles.inputItem} label="区划排序">
                    {getFieldDecorator('sort', {
                      rules: [
                        {
                          required: true,
                          message: '请输入区划排序',
                        },
                      ],
                    })(<InputNumber placeholder="请输入区划排序" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="区划备注">
                    {getFieldDecorator('remark', {})(<TextArea placeholder="请输入区划备注" />)}
                  </FormItem>
                </Form>
              </Card>
            </Row>
          </Col>
        </Row>
        <Modal
          title="行政区划数据导入"
          width={500}
          visible={excelVisible}
          confirmLoading={confirmLoading}
          onOk={this.handleExcelImport}
          onCancel={this.handleExcelCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form style={{ marginTop: 8 }} hideRequiredMark>
            <FormItem {...formItemLayout} label="模板上传">
              <Dragger {...uploadProps} onChange={this.onUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p className="ant-upload-hint">请上传 .xls,.xlsx 格式的文件</p>
              </Dragger>
            </FormItem>
            <FormItem {...formItemLayout} label="数据覆盖">
              <Switch checkedChildren="是" unCheckedChildren="否" onChange={this.onSwitchChange} />
            </FormItem>
            <FormItem {...formItemLayout} label="模板下载">
              <Button type="primary" icon="download" size="small" onClick={this.handleTemplate}>
                点击下载
              </Button>
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="行政区划数据调试"
          width={500}
          visible={debugVisible}
          onOk={this.handleDebugCancel}
          onCancel={this.handleDebugCancel}
          footer={null}
        >
          <Cascader
            style={{ width: '100%' }}
            options={treeCascader}
            loadData={this.onLoadCascaderData}
            onChange={this.onCascaderChange}
            changeOnSelect
          />
        </Modal>
      </Panel>
    );
  }
}
export default Region;
