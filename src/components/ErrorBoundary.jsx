import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Error while rendering component</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
