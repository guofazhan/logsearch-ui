import request from '../utils/request';
const config = require('../utils/config');

/**
 * 查询菜单集合
 * @param params
 */
export function query(params) {
  return  request({
      url:`${config.apiPrefix}/menus`,
      method:"get",
      data: params,
  });
}