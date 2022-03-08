// eslint-disable-next-line import/no-unresolved
import { SiderTheme } from 'antd/es/Layout/Sider';
import { ClickParam } from 'antd/es/menu';
import React from 'react';

// tslint:disable-next-line:interface-name
export interface GlobalHeaderRightProps {
  notices?: any[];
  dispatch?: (args: any) => void;
  currentUser?: {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    geographic?: any;
    tags?: any[];
    unreadCount: number;
  };
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onMenuClick?: (param: ClickParam) => void;
  onNoticeClear?: (tabName: string) => void;
  theme?: SiderTheme;
}

export default class GlobalHeaderRight extends React.Component<GlobalHeaderRightProps, any> {}
