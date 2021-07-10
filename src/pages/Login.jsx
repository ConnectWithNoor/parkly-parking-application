import React, { useState } from 'react';
import { Row, Col, Form, Spin, Input, Alert, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer/Footer';

import LoginIllustration from '../assets/images/auth-illustration.jpg';

function Login() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('123');
  };

  return (
    <div className='h-100vh'>
      <Row className='h-90vh'>
        <Col xs={0} sm={0} md={8} lg={10} xl={12}>
          <div className='d-flex flex-column justify-content-center p-4rem'>
            <p className='f-bold t-center f-lato font-size-4'>Parkly</p>
            <img
              className='w-100 radius-2'
              style={{ height: '25rem' }}
              alt='Login'
              src={LoginIllustration}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={14} lg={12} xl={12}>
          <div className='d-flex flex-column justify-content-center p-4rem '>
            <div className='mt-2rem w-100'>
              <h1 className=' t-center t-open-sans font-size-4'>Login</h1>
            </div>
            <Form size='large' onFinish={handleSubmit}>
              <Form.Item name='username'>
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                  type='email'
                  name='email'
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
              <Form.Item name='password' className='mb-0'>
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
              {error && <Alert message={error} type='error' closable />}
              <Button
                type='primary'
                htmlType='submit'
                className='mt-4rem w-100 bg-blue-2'
                style={{ height: '3rem', backgroundColor: '#001529' }}>
                Sign In
              </Button>
            </Form>
            <div className='mt-1rem'>
              Don't have an account?
              <Link to='/register'> Click Here To Register</Link>
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Login;
