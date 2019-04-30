import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import CatchErrorBoundary from '@common/catchErrorBoundary';


const style = {float:'right'};

export default class WorkHome extends Component {

    constructor(){
        super();
        this.drawChannel = this.drawChannel.bind(this);
        this.mapZoomTo = this.mapZoomTo.bind(this);
    }


    drawChannel(type){
        /*do some*/
    }

    mapZoomTo(){
        /*do some*/
    }

    render() {
        return (
            <div className="block-two">
                <a onClick={this.drawChannel.bind(this,'clear')} className="underline-words week">清除地图</a>
                <div onClick={this.mapZoomTo} className="zoom-btn"></div>
            </div>
        );
    }
}




