import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button, Spin } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { loginUser } from '../firebase/firebaseAuth';

import Footer from '../components/Footer/Footer';
import FormInputField from '../components/FormInputField/FormInputField';

import { AppContext } from '../context/AppContext';

import {
  errorNotification,
  successNotification,
} from '../utils/notificationToasts';

import LoginIllustration from '../assets/images/auth-illustration.jpg';

function Login() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUserDetails } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { errorMessage, success, userInfo } = await loginUser(user);
      if (errorMessage)
        return errorNotification({
          title: 'Error occured',
          description: errorMessage,
        });

      if (success) {
        successNotification({
          title: 'Success',
          description: 'User successfully Logged. Redirecting to Dashboard',
        });

        setTimeout(() => {
          // store user data in global context.
          // redirect will happen automatically
          setUserDetails(userInfo);
        }, 3000);
        return;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-100vh bg-gray-3'>
      <Row className='h-90vh'>
        <Col xs={0} sm={0} md={8} lg={10} xl={12}>
          <div className='d-flex flex-column justify-content-center p-4rem'>
            <p className='t-center t-open-sans f-bold font-size-4'>Parkly</p>
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
              <h1 className=' t-center t-open-sans f-bold font-size-4'>
                Login
              </h1>
            </div>
            <Spin spinning={loading}>
              <Form size='large' onFinish={handleSubmit}>
                {/* username */}
                <FormInputField
                  itemName='username'
                  IconComponent={MailOutlined}
                  placeholder='Email'
                  type='email'
                  targetName='email'
                  targetValue={user.username}
                  handleChange={handleChange}
                />

                {/* password */}

                <FormInputField
                  itemName='password'
                  IconComponent={LockOutlined}
                  placeholder='Password'
                  type='Password'
                  targetName='password'
                  targetValue={user.password}
                  handleChange={handleChange}
                />
                <Button
                  type='primary'
                  htmlType='submit'
                  className='mt-4rem w-100 bg-dark'
                  style={{ height: '3rem' }}>
                  Sign In
                </Button>
              </Form>
            </Spin>
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
