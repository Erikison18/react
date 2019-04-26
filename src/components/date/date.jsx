import React, { Component } from 'react';
import { DatePicker, Radio } from 'antd';
import moment from 'moment';
import {monthLastDate,dayLastDate} from '@js/utils'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class PickerSizesDemo extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <DatePicker size={size}  onPanelChange={(...a)=>{console.log(a)}}/>
        <br />
        <MonthPicker size={size} placeholder="Select Month"  onChange={(moment,value)=>{
          console.log(monthLastDate(value));
        }}/>
        <br />
        <RangePicker size={size} onCalendarChange={(...a)=>{console.log(a)}} onChange={(...a)=>{console.log(a)}}/>
        <br />
        <WeekPicker size={size} placeholder="Select Week" onChange={(moment,value)=>{
          console.log(dayLastDate(value));
        }}/>
      </div>
    );
  }
}

