import React from 'react';

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('getDerivedStateFromError triggered:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('componentDidCatch triggered:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

const BuggyComponent = () => {
  throw new Error('Test error in render phase!');
  return <div>This will not render.</div>;
};

const TestPage = () => (
  <ErrorBoundary>
    <BuggyComponent />
  </ErrorBoundary>
);

export default TestPage;
