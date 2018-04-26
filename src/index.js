import dva from 'dva';
import {message} from 'antd';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import {createLogger} from 'redux-logger';

/**
 * 配置启动参数
 * @type {{history, onAction: *, onError: function(*)}}
 */
let opt = {
    ...createLoading({
        effects: true,
    }),
    history: createHistory(),
    onAction: createLogger(),
    onError: (error) => {
        message.error(error.message);
    }
}

/**
 * 构建全局的app实例
 */
const app = new dva(opt);
app.model(require('./models/app').default);
app.router(require('./router').default);
app.start("#root");