import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import routes from '@router';
import CatchErrorBoundary from '@common/catchErrorBoundary';

export default class WorkHome extends Component {

    render() {
        return (
            <div>
                <h1>work home</h1>
                <CatchErrorBoundary>
                    {renderRoutes(this.props.route.routes)}
                </CatchErrorBoundary>
            </div>
        );
    }
}




