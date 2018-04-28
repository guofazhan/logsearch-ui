import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames";
import './index.less'
export default class FilterItem  extends Component{
    static propTypes = {
        label: PropTypes.string,
        children: PropTypes.element.isRequired,
    }

    render() {
        const {label='', children} = this.props
        const labelArray = label.split('')
        return (
            <div className="filterItem">
                {labelArray.length > 0
                    ? <div className="labelWrap">
                        {labelArray.map((item, index) => <span className="labelText" key={index}>{item}</span>)}
                    </div>
                    : ''}
                <div className="item">
                    {children}
                </div>
            </div>
        )
    }
}
