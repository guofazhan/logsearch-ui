import * as menusService from '../services/menus';
import {prefix} from '../utils/config';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';

export default {
    namespace: 'app',
    state: {
        //菜单
        menus: [],
        //左导航折叠状态
        collapsed: window.localStorage.getItem(`${prefix}-collapsed`) === 'true',
        //左导航选中keys
        navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}-navOpenKeys`)) || [],
        locationPathname: '',
        locationQuery: {},
    },
    effects: {
        * init({payload}, {call, put, select}) {
            const {locationPathname} = yield select(_ => _.app);
            const {success, list} = yield call(menusService.query);
            if (success) {
                let menus = list;
                yield put({
                    type: 'updateState',
                    payload: {
                        locationPathname,
                        menus,
                    },
                });
                if (location.pathname === '/' || location.pathname === '') {
                    yield put(routerRedux.push({
                        pathname: '/dashboard',
                    }))
                }
            }
        }
    },
    reducers: {
        //更新状态
        updateState(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        },
        //导航折叠转换
        switchSider (state) {
            window.localStorage.setItem(`${prefix}-collapsed`, !state.collapsed);
            return {
                ...state,
                collapsed: !state.collapsed,
            }
        },
        //导航选中key
        handleNavOpenKeys (state, { payload: navOpenKeys }) {
            return {
                ...state,
                ...navOpenKeys,
            }
        },
    },
    subscriptions: {
        setupHistory ({ dispatch, history }) {
            history.listen((location) => {
                dispatch({
                    type: 'updateState',
                    payload: {
                        locationPathname: location.pathname,
                        locationQuery: queryString.parse(location.search),
                    },
                })
            })
        },
        //加载触发动作
        setup({dispatch}) {
            dispatch({type: 'init'});
        }
    }
};