import React, {ErrorInfo} from 'react'
import {Navigate} from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any) {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // alert('Something went wrong')
        console.log(error, errorInfo);
    }

    render() {
        // @ts-ignore
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '10vh',
                    backgroundColor: 'rgb(255,240,240)',
                    fontFamily: 'Cunia',
                }}>
                    <h1>Something went wrong</h1>
                    <h2>Get back home: </h2>
                    <a href={'/'} className='errorRocket'>🚀</a>
                </div>
            )
        }
        // @ts-ignore
        return this.props.children;
    }
}

export default ErrorBoundary