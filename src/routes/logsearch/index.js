import React from 'react'
import {connect} from 'react-redux'
import {Page} from '../../components/index';
import Filter from './SearchFilter'
import PropTypes from "prop-types";
import queryString from 'query-string'


class Logsearch extends React.Component {
    static propTypes = {
        location: PropTypes.object,
        dispatch: PropTypes.func,
        logsearch: PropTypes.object,
        loading: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    _onFilterChange=(value) =>{
        this.props.dispatch(routerRedux.push({
            pathname:  this.props.location.pathname,
            search: queryString.stringify({
                ...value,
                page: 1,
                pageSize,
            }),
        }))
    }
    _onSearch=(value) =>{
        this.props.dispatch(routerRedux.push({
            pathname:  this.props.location.pathname,
            search: queryString.stringify({
                ...value,
                page: 1,
                pageSize,
            }),
        }))
    }

    render() {
        const {location,logsearch:{pagination},dispatch} = this.props;
        location.query = queryString.parse(location.search);
        console.log("location.query=================："+ JSON.stringify(location.query));
        const { query, pathname } = location;
        const { pageSize } = pagination;
        const filterProps = {
            filter: {
                ...query,
            },
            onFilterChange:this._onFilterChange,
            onSearch (fieldsValue) {
                fieldsValue.keyword.length ? dispatch(routerRedux.push({
                    pathname: '/user',
                    query: {
                        field: fieldsValue.field,
                        keyword: fieldsValue.keyword,
                    },
                })) : dispatch(routerRedux.push({
                    pathname: '/user',
                }))
            },
        }


        return (
            <Page inner>
                <Filter {...filterProps} />
                <div>
                    日志搜索界面
                </div>
            </Page>
        );
    }
}

export default connect(({logsearch, loading}) => ({
    logsearch,
    loading
}))(Logsearch)