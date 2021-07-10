import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Spin, Drawer, Button } from 'antd';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { DownOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { adminRoutes, userRoutes } from '../routes/sidebarRoutes';

import Footer from '../components/Footer/Footer';

import './AppLayout.css';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [isAuthenticated] = useState(true);
  const [loading] = useState(false);
  const [userRole] = useState('user');
  const [user] = useState({});
  let history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/signin');
    }
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }

  const handleLogout = () => {};

  return (
    <Layout className='h-100v overflow-x-none'>
      <Drawer
        title={<div className='c-black t-center h-100 f-bold'>Parkly</div>}
        placement='left'
        closable={true}
        onClose={() => setCollapsed(false)}
        visible={collapsed}>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode='inline'
          theme='light'
          selectedKeys={[location.pathname]}
          className='h-100'>
          {userRole === 'admin'
            ? adminRoutes.map((route) => {
                const { to, icon, text } = route;
                return (
                  <Menu.Item key={to} icon={icon}>
                    <Link to={to}>{text}</Link>
                  </Menu.Item>
                );
              })
            : userRoutes.map((route) => {
                const { to, icon, text } = route;
                return (
                  <Menu.Item key={to} icon={icon}>
                    <Link to={to}>{text}</Link>
                  </Menu.Item>
                );
              })}
        </Menu>
      </Drawer>
      <Layout className='site-layout'>
        <Header className='site-layout-background'>
          <div className='d-flex '>
            <div className='c-pointer f-icon'>
              <Button onClick={() => setCollapsed(true)}>
                <MenuFoldOutlined />
                Menu
              </Button>
            </div>

            <div className='d-flex align-items-center ml-auto'>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item onClick={handleLogout}>Logout User</Menu.Item>
                  </Menu>
                }
                trigger={['click']}>
                <div className='d-flex align-items-center c-pointer'>
                  <p className='m-auto ml-1rem mr-1rem'>
                    {user?.name} {user?.surname}
                  </p>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '1.5rem 1rem',
          }}>
          <Spin spinning={loading}>{children}</Spin>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
