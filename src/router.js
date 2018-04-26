import React from 'react';
import { LocaleProvider} from 'antd';
import { routerRedux, Route, Switch,Redirect } from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './routes/app'
import dynamic from "dva/dynamic";
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
    const error = dynamic({
        app,
        component: () => import('./routes/dashboard'),
    })
    const routes = [
        {
            path: '/dashboard',
            models: () => [import('./models/dashboard')],
            component: () => import('./routes/dashboard'),
        }
    ]
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <App>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
                        {
                            routes.map(({ path, ...dynamics }, key) => (
                                <Route key={key}
                                       exact
                                       path={path}
                                       component={dynamic({
                                           app,
                                           ...dynamics,
                                       })}
                                />
                            ))
                        }
                        <Route component={error} />
                    </Switch>

                </App>
            </ConnectedRouter>
        </LocaleProvider>
    );
}
export default RouterConfig;
