import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Loader.less'

/**
 * 全局的加载組件
 */
export default class Loader extends React.Component {
    static propTypes = {
        spinning: PropTypes.bool,
        fullScreen: PropTypes.bool,
    }
    render() {
        let {spinning, fullScreen} = this.props;
        return(
            <div className={classNames("loader", {
                "hidden": !spinning,
                "fullScreen": fullScreen,
            })}>
                <div className="warpper">
                    <div className="inner"/>
                    <div className="text">正在加载</div>
                </div>
            </div>
        );
    }
}
