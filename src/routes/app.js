import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'dva/router';
import {Helmet} from 'react-helmet';
import {BackTop, Layout} from 'antd';
import config, {prefix} from '../utils/config';
import * as MyLayout from '../components/Layout/index';
import Loader from '../components/Loader/Loader';
import './app.less'
const {Content, Footer} = Layout;
const {Sider,Header,Bread} = MyLayout;

class App extends React.Component {
    static propTypes = {
        children: PropTypes.element,
        location: PropTypes.object,
        dispatch: PropTypes.func,
        app: PropTypes.object,
        loading: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    _getBreadProps(menus,location){
        return {
            menus,
            location,
        }
    };
    _getHeaderProps(collapsed,dispatch){
        return {
            collapsed,
            switchSider(){
                dispatch({type: 'app/switchSider'});
            }
        }
    };
    _getSiderProps(menus,location,dispatch,collapsed,navOpenKeys){
        return {
            menus,
            location,
            collapsed,
            navOpenKeys,
            changeOpenKeys(openKeys){
                window.localStorage.setItem(`${config.prefix}-navOpenKeys`, JSON.stringify(openKeys));
                dispatch({
                    type: 'app/handleNavOpenKeys',
                    payload: {navOpenKeys: openKeys}
                });
            }
        }
    }
    render() {
        const {location, app, loading, children,dispatch} = this.props;
        const {menus, collapsed,navOpenKeys} = app;
        const {logo} = config;
        const breadProps = this._getBreadProps(menus,location);
        const headerProps = this._getHeaderProps(collapsed,dispatch);
        const siderProps = this._getSiderProps(menus,location,dispatch,collapsed,navOpenKeys);
        return (
            <div>
                <Loader fullScreen spinning={loading.effects['app/init']}/>
                <Helmet>
                    <title>{config.Title}</title>
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1.0"/>
                    <link rel="icon" href={logo} type="image/x-icon"/>
                </Helmet>
                <Layout className="light">
                    <Layout.Sider trigger={null} collapsible
                                  collapsed={collapsed}>
                        {siderProps.menus.length === 0 ? null :
                            <Sider {...siderProps} />}
                    </Layout.Sider>
                    <Layout style={{height: '100vh', overflow: 'scroll'}} id="mainContainer">
                        <BackTop target={() => document.getElementById('mainContainer')}/>
                        <Header {...headerProps} />
                        <Content>
                            <Bread {...breadProps} />
                            {children}
                        </Content>
                        <Footer>
                            {config.footerText}
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default withRouter(connect(({app, loading}) => ({app, loading}))(App))