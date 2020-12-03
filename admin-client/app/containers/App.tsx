import React, { ReactNode, useState } from 'react';
import { Image, Layout, Menu, Row } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  ContainerOutlined,
  ReadOutlined,
  CarryOutOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="app-container">
      <Title />
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Row justify="center" style={{ padding: '15px 0' }}>
          <Image width={40} height={40} src="./assets/images/logo.png" />
        </Row>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 70px)',
          }}
        >
          <div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<TeamOutlined />}>
                <Link to="/tai-khoan">Tài khoản</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ContainerOutlined />}>
                <Link to="/lop-hoc">Lớp học</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<ReadOutlined />}>
                <Link to="/hoc-phan">Học phần</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<CarryOutOutlined />}>
                <Link to="/thi">Thi</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div style={{ flex: '1 1 auto' }} />
          <div style={{ alignSelf: 'flex-end' }}>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1" icon={<PoweroffOutlined />}>
                <Link to="/dang-nhap">Đăng xuất</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
