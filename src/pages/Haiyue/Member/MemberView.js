import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { MEMBER_DETAIL } from '../../../actions/member';

const FormItem = Form.Item;

@connect(({ member }) => ({
  member,
}))
@Form.create()
class MemberView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(MEMBER_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/haiyue/member/edit/${id}`);
  };

  render() {
    const {
      member: { detail },
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
      <Panel title="查看" back="/haiyue/member" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="会员编号">
              <span>{detail.code}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="会员姓名">
              <span>{detail.name}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="会员电话">
              <span>{detail.phone}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="出生日期">
              <span>{detail.birth}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default MemberView;
