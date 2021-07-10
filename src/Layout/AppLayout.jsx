import React from 'react';
import { Layout } from 'antd';

function AppLayout({ children }) {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default AppLayout;
