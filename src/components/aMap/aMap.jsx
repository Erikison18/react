import React, { Component } from 'react';
import {AMapAsync,LocaAsync} from '@js/AMap.js';
import './aMap.less';
import data from './data.json';// 市县位置数据

export default class AMapDemo extends Component {

    async renderLoca(){

        let Loca = await LocaAsync();

        let loca = Loca.create('locaDemoContainer', {
            mapStyle: 'amap://styles/grey',
            zoom: 5,
            center: [107.4976, 32.1697],
            features: ['bg', 'road'],
            pitch: 50,
        });

        let layer = Loca.visualLayer({
            container: loca,
            type: 'point',
            shape: 'circle'
        });

        layer.setData(data, {
            lnglat: 'lnglat'
        });

        layer.setOptions({
            style: {
                // 支持动态回调，为每一个点设置半径
                radius: function (obj) {
                    // 城市类型，0：省会直辖市，1：地级市，2：区县
                    var style = obj.value.style;
                    var r;
                    if (style === 0) {
                        r = 6;
                    } else if (style === 1) {
                        r = 3;
                    } else {
                        r = 1.5;
                    }

                    return r;
                },
                color: '#47aff7',
                borderColor: '#c3faff',
                borderWidth: 1,
                opacity: 0.8
            }
        });

        layer.render();

    }

    async renderAMap(){

        let AMap = await AMapAsync();

        this.map = new AMap.Map('aMapDemoContainer', {
            viewMode:'3D',
            pitch: 50,
            zoom: 10
        });

    }

    componentDidMount() {
        this.renderAMap();
        this.renderLoca();
    }

    render() {
        return (
            <div>
                <div id="aMapDemoContainer" className="aMapDemoContainer"></div>
                <div id="locaDemoContainer" className="locaDemoContainer"></div>
            </div>
        );
    }
}




