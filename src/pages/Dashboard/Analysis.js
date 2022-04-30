import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import PageLoading from '@/components/PageLoading';
import {Card, Col, Row} from "antd";

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));


@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {

  }



  render() {


    return (

      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="会员总人数" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="今日签到人数" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="今日注册人数" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Analysis;
