import React, { Component } from 'react';
import { Image, Row, Col, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import Footer from '../Footer/Footer';
import NotFound from '../../assets/images/not-found.png';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.log('e', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState((prev) => ({
      ...prev,
      error,
      errorInfo,
    }));
  }

  render() {
    const { children } = this.props;
    if (this.state.hasError) {
      return (
        <div className='bg-gray-3 w-100vw h-100vw t-center'>
          <div className='p-2rem m-2rem t-center'>
            <h1 className='font-size-3 mb-2rem'>
              Don't Worry, It's a small bug. Dev can fix it in real quick. Let
              them know.
            </h1>
            <Button
              type='primary'
              className='bg-dark'
              onClick={() => window.location.reload()}>
              Go to Homepage
            </Button>
          </div>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Image
                src={NotFound}
                alt='not-found'
                className='w-100 h-70 radius-1 mt-1rem'
                preview={false}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <h2 className='font-size-2'>Error Stack</h2>
              <div className='mt-2rem'>{this.state?.error?.toString()}</div>
              <div className='mt-2rem'>
                {this.state?.errorInfo?.componentStack}
              </div>
            </Col>
          </Row>
          <Footer />
        </div>
      );
    }

    return children;
  }
}

export default withRouter(ErrorBoundary);
