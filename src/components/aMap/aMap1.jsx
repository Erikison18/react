import React, { Component } from 'react';
import {AMapAsync} from '@js/AsyncCDN.js';
import './aMap.less';
import data from './data.json';// 市县位置数据

export default class AMapDemo extends Component {

    async renderAMap(){

        this.AMap = await AMapAsync();
        this.map = new this.AMap.Map('aMapDemoContainer', {
            viewMode:'3D',
            pitch: 50,
            zoom: 10,
            mapStyle: 'amap://styles/whitesmoke'
        });

    }

    componentDidMount() {
        this.renderAMap();
    }

    render() {
        return (
            <div>
                <div id="aMapDemoContainer" className="aMapDemoContainer"></div>
            </div>
        );
    }
}




