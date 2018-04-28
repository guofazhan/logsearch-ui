import React, {createElement} from 'react';
import {Button} from 'antd';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import config from './typeConfig';
import './index.less'

export default class Exception extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string,
        img: PropTypes.string,
    }

    constructor(props) {
        super(props);
        let {type,className} = this.props;
        this.clsString = classnames("exception", className);
        this.info = config[type in config ? type  : '404'];
    }

    render() {
        let {title, desc, img} = this.props;
        return(
            <div className={this.clsString}>
                <div className="imgBlock">
                    <div className="imgEle"
                        style={{backgroundImage: `url(${img || this.info.img})`}}
                    />
                </div>
                <div className="content">
                    <h1>{title || this.info.title}</h1>
                    <div className="desc">{desc || this.info.desc}</div>
                </div>
            </div>
        );
    }
}