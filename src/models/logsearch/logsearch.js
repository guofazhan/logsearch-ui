import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { pageModel } from '../common'

export default modelExtend(pageModel, {
    namespace: 'logsearch',
    state: {
    },
    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/logsearch') {
                    const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
                    dispatch({
                        type: 'query',
                        payload,
                    })
                }
            })
        },
    },
    effects: {}
})
