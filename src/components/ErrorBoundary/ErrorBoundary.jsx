import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  render() {
    const { children } = this.props;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
