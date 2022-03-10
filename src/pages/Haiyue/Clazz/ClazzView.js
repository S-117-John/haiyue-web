import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { CLAZZ_DETAIL } from '../../../actions/clazz';

const FormItem = Form.Item;

@connect(({ clazz }) => ({
  clazz,
}))
@Form.create()
class ClazzView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(CLAZZ_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/haiyue/clazz/edit/${id}`);
  };

  render() {
    const {
      clazz: { detail },
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
      <Button type="primary" onClick={this.handleEdit}>
        修改
      </Button>
    );

    return (
      <Panel title="查看" back="/haiyue/clazz" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="班级编号">
              <span>{detail.code}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="班级姓名">
              <span>{detail.name}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="管理员">
              <span>{detail.manager}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="教师">
              <span>{detail.teacher}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default ClazzView;
