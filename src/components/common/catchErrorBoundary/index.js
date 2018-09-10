import React, {
    Component
} from 'react';

export default class CatchErrorBoundary extends Component {
    state={
        error:null,
        info:null
    }
    componentDidCatch(error, info) {
        this.setState({
            error,
            info
        })
    }
    render(){

        let {error,info}=this.state;

        if(error)
            return (
                <div>
                    <h1>
                        Error: {error.toString()}
                    </h1>
                    {info &&info.componentStack.split('\n').map(i => {
                        return (
                            <div key={i}>
                                {i}
                            </div>
                        );
                    })}
                </div>
            )

        return this.props.children

    }
}