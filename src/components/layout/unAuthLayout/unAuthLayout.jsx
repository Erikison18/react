import React, {
    Component
} from 'react';

import {
    Link
} from 'react-router-dom';



import Menu from '@common/menu/menu.jsx';





class UnAuthLayout extends Component {
    componentWillMount() {
        this.props.history.push('/auth/marketingHistory/historyQuery');
    }
    render() {
        return (
            <div>
                <Menu/>
                <Link to="/auth/marketingHistory">营销匹配历史</Link>
            </div>
        );
    }
}

export default UnAuthLayout