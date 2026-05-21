import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Button, Card } from './UI';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<Props>, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: React.PropsWithChildren<Props>) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'An unexpected error occurred.';
      try {
        const parsedError = JSON.parse(this.state.error?.message || '');
        if (parsedError.error) {
          errorMessage = `Firestore Error: ${parsedError.error}`;
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
          <Card className="flex max-w-md flex-col items-center gap-6 p-8 text-center border-red-200 bg-red-50/30 dark:border-red-900/30 dark:bg-red-950/10">
            <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
              <AlertCircle className="h-12 w-12 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
              <p className="mt-2 text-sm text-red-600/70">{errorMessage}</p>
            </div>
            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw className="h-4 w-4" />
                Retry
              </Button>
              <Button
                className="flex-1 gap-2 bg-red-600 hover:bg-red-700"
                onClick={() => (window.location.href = '/')}
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
