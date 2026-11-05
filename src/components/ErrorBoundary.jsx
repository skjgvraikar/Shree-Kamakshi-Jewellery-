import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-deep">
          <div className="glass-gold-card p-8 rounded-2xl max-w-lg border border-gold/40 shadow-gold-glow">
            <span className="text-4xl mb-4 block">⚜️</span>
            <h2 className="font-cinzel text-2xl text-gold-light mb-3">Something Went Wrong</h2>
            <p className="font-cormorant text-cream/80 text-lg mb-6">
              We encountered an unexpected display issue. Please refresh the page or contact Shree Kamakshi Jewellery Works directly.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-deep font-cinzel font-semibold hover:brightness-110 transition shadow-gold-glow"
              >
                Refresh Page
              </button>
              <a
                href="tel:9448628575"
                className="px-6 py-2.5 rounded-full border border-gold/50 text-gold-light font-cinzel hover:bg-gold/10 transition"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

