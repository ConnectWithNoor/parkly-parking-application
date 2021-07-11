import React, { useState } from 'react';
import { Row, Col, Form, Alert, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import FormInputField from '../components/FormInputField/FormInputField';

import LoginIllustration from '../assets/images/auth-illustration.jpg';

function Register() {
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
    <div className='h-100vh bg-gray-3'>
      <Row className='h-90vh'>
        <Col xs={24} sm={24} md={14} lg={12} xl={12}>
          <div className='d-flex flex-column justify-content-center p-4rem '>
            <div className='mt-2rem w-100'>
              <h1 className='t-center t-open-sans f-bold font-size-4'>
                Register
              </h1>
            </div>
            <Form size='large' onFinish={handleSubmit}>
              {/* email */}
              <FormInputField
                IconComponent={UserOutlined}
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

              {error && (
                <Alert
                  message={error}
                  type='error'
                  showIcon
                  closable
                  onClose={() => setError(null)}
                />
              )}
              <Button
                type='primary'
                htmlType='submit'
                className='mt-4rem w-100 bg-dark'
                style={{ height: '3rem' }}>
                Register
              </Button>
            </Form>
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
