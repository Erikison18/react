import React, { Component } from 'react';
import AMap from 'AMap';
import './aMap.less';

export default class AMapDemo extends Component {

    componentDidMount() {
        var map = new AMap.Map('aMapDemoContainer', {
            viewMode:'3D',
            pitch: 50,
            zoom: 10
        });
    }

    render() {
        return (
            <div id="aMapDemoContainer" className="aMapDemoContainer"></div>
        );
    }
}




