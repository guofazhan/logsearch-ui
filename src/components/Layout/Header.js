import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Layout} from 'antd'
import classnames from 'classnames'
import  './Header.less'
export default class Header extends React.Component {
    static propTypes = {
        switchSider: PropTypes.func,
        collapsed: PropTypes.bool
    }
    render() {
        let {switchSider, collapsed} = this.props;
        return (
            <Layout.Header className="header">
                <div className="button" onClick={switchSider}>
                    <Icon type={classnames({
                        'menu-unfold': collapsed,
                        'menu-fold': !collapsed
                    })}/>
                </div>
            </Layout.Header>
        );
    }
}
