import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'
import config from '../../utils/config'
import './Layout.less'
import Menus from './Menu'

export default class Sider extends React.Component {
    static propTypes = {
        menus: PropTypes.array,
        collapsed: PropTypes.bool,
        location: PropTypes.object,
        navOpenKeys: PropTypes.array,
        changeOpenKeys: PropTypes.func,
    }

    render() {
        const {menus, collapsed, location, navOpenKeys, changeOpenKeys} = this.props;
        const menusProps = {
            menus,
            collapsed,
            location,
            navOpenKeys,
            changeOpenKeys,
        }
        return (
            <div>
                <div className="logo">
                    {collapsed ?  '' : <span>{config.Title}</span>}
                </div>
                <Menus {...menusProps} />
                <div className="switchTheme">
                    <span><Icon type="bulb"/>Switch Theme</span></div>
            </div>
        );
    }
}

