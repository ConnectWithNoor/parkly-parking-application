import React, { useEffect, useState, useContext } from 'react';
import { Layout, Menu, Spin, Drawer, Button } from 'antd';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { MenuFoldOutlined } from '@ant-design/icons';

import { AppContext } from '../context/AppContext';

import { adminRoutes, userRoutes } from '../routes/sidebarRoutes';
import Footer from '../components/Footer/Footer';
import { successNotification } from '../utils/notificationToasts';

import { auth } from '../firebase/firebase';

import './AppLayout.css';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [isAuthenticated] = useState(true);
  const [loading] = useState(false);

  const { userDetails, setUserDetails } = useContext(AppContext);

  let history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/signin');
    }
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();

      successNotification({
        title: 'Success',
        description: 'Successfully logged out. Redirecting to login page',
      });

      setTimeout(() => {
        setUserDetails(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

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
          {userDetails.role === 'root'
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
              <Button onClick={() => setCollapsed(true)} className='bg-white'>
                <MenuFoldOutlined />
                Menu
              </Button>
            </div>

            <div className='d-flex align-items-center ml-auto'>
              <Button type='primary' className='bg-dark' onClick={handleLogout}>
                Log out {userDetails.name}
              </Button>
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
