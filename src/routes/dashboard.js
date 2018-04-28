import React from 'react'
import {connect} from 'react-redux'
import {Page} from '../components/index';
class Dashboard extends React.Component {
    render() {
        return (
            <Page inner>
                <div>
                    測試<br/>
                    測試<br/>   測試<br/>
                    測試<br/>
                    測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>   測試<br/>
                </div>
            </Page>
        );
    }
}

export default connect(({dashboard, loading}) => ({
    dashboard,
    loading
}))(Dashboard)