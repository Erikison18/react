import React, { Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Button, Checkbox } from 'antd';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import './animation.less'

TweenOne.plugins.push(Children);

class TweenOneDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:0
        };
     }

    componentDidMount() {
        this.setAnimation(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        this.setAnimation(nextProps.value);
    }

    setAnimation(value){
        this.setState({
            animation: {
                Children: {
                    value: value,
                    floatLength: 2,
                    formatMoney:true,
                },
                onUpdate:({ index, target, ratio })=>{
                    this.setState({
                        value:this.parseFormat(ratio*value)
                    });
                },
                onComplete:()=>{
                    this.setState({
                        value:this.parseFormat(value)
                    });
                },
                duration: 1000,
            }
        })
    }

    parseFormat(value){
        return (value.toFixed(2).toString()).replace(/\B(?=(\d{3})+\b)/g, ',').split('').map(this.props.format)
    }

    render() {
        return (
            <div>
                <TweenOne
                    animation={this.state.animation}
                    style={{ fontSize: 56, marginBottom: 12,display:'none' }}
                >
                </TweenOne>
                {this.state.value}
            </div>
        );
    }
}

class BarrageDemo extends Component {
    constructor(props) {
        super(props);
        this.moment = null;
        this.animation = { left: '70%', duration: 2000 };
        this.state = {
            moment: null,
            paused: true,
            reverse: false,
        };
    }

    onPause = () => {
        this.setState({
            paused: true,
            moment: null,
        });
    }

    onReverse = () => {
        this.setState({
            paused: false,
            reverse: true,
            moment: null,
        });
    }

    onRestart = () => {
        this.setState({
            paused: false,
            reverse: false,
            moment: 0,
        }, () => {
            this.setState({
                moment: null,
            });
        });
    }

    onClick = () => {
        this.setState({
            paused: false,
            reverse: false,
            moment: null,
        });
    }


      render() {
        return (
          <div>
            <TweenOne
              animation={this.animation}
              paused={this.state.paused}
              reverse={this.state.reverse}
              moment={this.state.moment}
              className="code-box-shape"
              style={{ margin: '40px 20px' }}
            />
            <div className="demo-buttons"
              style={{
                position: 'absolute',
                width: 300,
                left: '50%',
                marginLeft: -150,
                bottom: 25
              }}
            >
              <Button type="primary" onClick={this.onClick}>play</Button>
              <Button type="primary" onClick={this.onPause}>pause</Button>
              <Button type="primary" onClick={this.onReverse}>reverse</Button>
              <Button type="primary" onClick={this.onRestart}>restart</Button>
            </div>
          </div>
        );
    }
}

class Demo extends Component {
    constructor(){
        super();
        this.state={
            value:10000
        };
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                value:100000
            })
        },2000)
    }
    render(){
        return(
            <Fragment>
                <TweenOneDemo value={this.state.value} format={(item,i)=><span key={i} style={{color:'red'}}>{item}</span>}/>
            </Fragment>
        )
    }
}

export default Demo
