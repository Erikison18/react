import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import {actiontor}  from '@models/reselector.js';
import { createSelector } from 'reselect';


function getMapComponents({reselector}){
    return reselector.map((item,i)=><li key={i}>{item}</li>)

}

function getParseData({reselector}){
    return reselector.reduce((prev,item)=>prev+item,0)
}

function toProps(mapComponents,parseData){
    return {mapComponents,parseData}
}

let mapStateToProps = createSelector([getMapComponents, getParseData],toProps);

@connect(
    mapStateToProps,
    (dispatch, ownProps) => bindActionCreators(actiontor, dispatch)
)
export default class Reselector extends Component {

    componentDidMount() {
        this.props.reselectData();
    }

    render() {
        return (
            <div>
                <ol>
                    {this.props.mapComponents}
                </ol>
                <div>求和：{this.props.parseData}</div>
            </div>
        );
    }
}

