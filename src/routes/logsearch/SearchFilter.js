import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment"
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd';
const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 16,
    },
}

const TwoColProps = {
    ...ColProps,
    xl: 96,
}


class SearchFilter extends React.Component{
    static propTypes = {
        form: PropTypes.object,
        filter: PropTypes.object,
        onFilterChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.getFieldsValue =  this.props.form.getFieldsValue;
        this.setFieldsValue =  this.props.form.setFieldsValue;
        this.getFieldDecorator =  this.props.form.getFieldDecorator;
        this.onFilterChange = this.props.onFilterChange;
        this.filter = this.props.filter;
    }

    handleFields = (fields) => {
        const { createTime } = fields
        if (createTime.length) {
            fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
        }
        return fields
    }

    handleSubmit = () => {
        let fields = this.getFieldsValue()
        fields = this.handleFields(fields)
        this.onFilterChange(fields)
    }

    handleReset = () => {
        const fields = this.getFieldsValue()
        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = []
                } else {
                    fields[item] = undefined
                }
            }
        }
        this.setFieldsValue(fields)
        this.handleSubmit()
    }

    /**
     *
     * @param key
     * @param values
     */
    handleChange = (key, values) => {
        let fields = this.getFieldsValue()
        fields[key] = values
        fields = this.handleFields(fields)
        this.onFilterChange(fields)
    }

    render() {
        console.log("filter=================："+ JSON.stringify(this.filter));
        let initialCreateTime = []
        if (this.filter.createTime && this.filter.createTime[0]) {
            initialCreateTime[0] = moment(filter.createTime[0])
        }
        if (this.filter.createTime && this.filter.createTime[1]) {
            initialCreateTime[1] = moment(filter.createTime[1])
        }


        return (
            <Row gutter={24}>
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                    {this.getFieldDecorator('name', { initialValue: this.filter.name })(<Search placeholder="Search Name" onSearch={this.handleSubmit} />)}
                </Col>
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
                    <FilterItem label="查询时间">
                        {this.getFieldDecorator('createTime', { initialValue: initialCreateTime })(<RangePicker style={{ width: '100%' }} onChange={this.handleChange.bind(null, 'createTime')} />)}
                    </FilterItem>
                </Col>
                <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div>
                            <Button type="primary" className="margin-right" onClick={this.handleSubmit}>查询</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default Form.create()(SearchFilter)