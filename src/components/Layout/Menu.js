import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { arrayToTree, queryArray } from '../../utils/utils'
import pathToRegexp from 'path-to-regexp'

export default  class Menus extends React.Component{
    static propTypes = {
        menus: PropTypes.array,
        collapsed: PropTypes.bool,
        navOpenKeys: PropTypes.array,
        changeOpenKeys: PropTypes.func,
        location: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.menus = props.menus;
        this.collapsed = props.collapsed;
        this.levelMap ={};
        this.menuItems = this._getMenus(arrayToTree(this.menus.filter(_ => _.mpid !== '-1'), 'id', 'mpid'),this.collapsed);
    }

    /**
     * 递归生成菜单
     * @param menuTree
     * @param collapsed
     * @private
     */
     _getMenus = (menuTree, collapsed) => {
        return menuTree.map((item) => {
            if (item.children) {
                if (item.mpid) {
                    this.levelMap[item.id] = item.mpid
                }
                return (
                    <Menu.SubMenu
                        key={item.id}
                        title={<span>
              {item.icon && <Icon type={item.icon} />}
                            {(!collapsed || !menuTree.includes(item)) && item.name}
            </span>}
                    >
                        {this._getMenus(item.children, collapsed)}
                    </Menu.SubMenu>
                )
            }
            return (
                <Menu.Item key={item.id}>
                    <Link to={item.route || '#'} style={collapsed ? { width: 10 } : {}}>
                        {item.icon && <Icon type={item.icon} />}
                        {item.name}
                    </Link>
                </Menu.Item>
            )
        })
    }

    /**
     * 保持选中
     * @param key
     * @returns {*|Array}
     */
    getAncestorKeys = (key) => {
        let map = {}
        const getParent = (index) => {
            const result = [String(this.levelMap[index])]
            if (this.levelMap[result[0]]) {
                result.unshift(getParent(result[0])[0])
            }
            return result
        }
        for (let index in this.levelMap) {
            if ({}.hasOwnProperty.call(this.levelMap, index)) {
                map[index] = getParent(index)
            }
        }
        return map[key] || []
    }

    /**
     *
     * @param array
     * @param current
     * @param pid
     * @param id
     * @returns {*[]}
     */
    getPathArray = (array, current, pid, id) => {
        let result = [String(current[id])]
        const getPath = (item) => {
            if (item && item[pid]) {
                result.unshift(String(item[pid]))
                getPath(queryArray(array, item[pid], id))
            }
        }
        getPath(current)
        return result;
    }

    /**
     * SubMenu 展开/关闭的回调
     * @param openKeys
     */
     handleOnOpenChange = (openKeys) => {
        let {navOpenKeys,changeOpenKeys} = this.props;
        const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
        const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        changeOpenKeys(nextOpenKeys)
    }

    render() {
        let {navOpenKeys,collapsed,menus} = this.props;
        let menuProps = !collapsed ? {
            onOpenChange:this.handleOnOpenChange,
            openKeys: navOpenKeys,
        } : {};
        // 寻找选中路由
        let currentMenu
        let defaultSelectedKeys
        for (let item of menus) {
            if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
                currentMenu = item
                break
            }
        }
        if (currentMenu) {
            defaultSelectedKeys = this.getPathArray(menus, currentMenu, 'mpid', 'id')
        }

        if (!defaultSelectedKeys) {
            defaultSelectedKeys = ['1']
        }

        return(
            <Menu
                {...menuProps}
                mode={this.collapsed ? 'vertical' : 'inline'}
                theme='dark'
                selectedKeys={defaultSelectedKeys}
            >
                {this.menuItems}
            </Menu>
        )
    }
}
