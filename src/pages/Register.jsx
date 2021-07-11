import React, { useState } from 'react';
import { Row, Col, Form, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import FormInputField from '../components/FormInputField/FormInputField';

import { registerUser } from '../firebase/firebaseAuth';
import LoginIllustration from '../assets/images/auth-illustration.jpg';
import {
  errorNotification,
  successNotification,
} from '../utils/notificationToasts';

function Register() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      if (user.password !== user.confirmPassword)
        return errorNotification({
          title: 'Error occured',
          description: 'Password Must Match',
        });

      const { errorMessage, success } = await registerUser(user);

      if (errorMessage)
        return errorNotification({
          title: 'Error occured',
          description: errorMessage,
        });

      if (success) {
        successNotification({
          title: 'Success',
          description:
            'User successfully Registered. Redirecting to Login Page',
        });

        setTimeout(() => {
          history.push('/login');
        }, 3000);
        return;
      }
    } catch (error) {
      console.error(error);
      return errorNotification({
        title: error?.errorCode,
        description: error?.errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-100vh bg-gray-3'>
      <Row className='h-90vh'>
        <Col xs={24} sm={24} md={14} lg={12} xl={12}>
          <div className='d-flex flex-column justify-content-center p-4rem '>
            <div className='mt-2rem w-100'>
              <h1 className='t-center t-open-sans f-bold font-size-4'>
                Register
              </h1>
            </div>
            <Spin spinning={loading}>
              <Form size='large' onFinish={handleSubmit}>
                {/* Name */}
                <FormInputField
                  IconComponent={UserOutlined}
                  itemName='name'
                  placeholder='Name'
                  type='text'
                  targetName='name'
                  targetValue={user.name}
                  handleChange={handleChange}
                />
                {/* email */}
                <FormInputField
                  IconComponent={MailOutlined}
                  itemName='email'
                  placeholder='Email'
                  type='email'
                  targetName='email'
                  targetValue={user.email}
                  handleChange={handleChange}
                />

                {/* password */}
                <FormInputField
                  IconComponent={LockOutlined}
                  itemName='password'
                  placeholder='Password'
                  type='password'
                  targetName='password'
                  targetValue={user.password}
                  handleChange={handleChange}
                />

                {/* confirmed password */}
                <FormInputField
                  IconComponent={LockOutlined}
                  itemName='confirmPassword'
                  placeholder='Retype Password'
                  type='password'
                  targetName='confirmPassword'
                  targetValue={user.confirmPassword}
                  handleChange={handleChange}
                />
                <Button
                  type='primary'
                  htmlType='submit'
                  className='mt-4rem w-100 bg-dark'
                  style={{ height: '3rem' }}>
                  Register
                </Button>
              </Form>
            </Spin>
            <div className='mt-1rem'>
              Already have an account?
              <Link to='/login'> Click Here To Login</Link>
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={8} lg={10} xl={12}>
          <div className='d-flex flex-column justify-content-center p-4rem'>
            <p className='t-center t-open-sans f-bold font-size-4'>Parkly</p>
            <img
              className='w-100 radius-2'
              style={{ height: '25rem' }}
              alt='Register'
              src={LoginIllustration}
            />
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Register;
