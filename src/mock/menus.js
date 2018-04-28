const config = require('../utils/config')

let database = [
    {
        id: '1',
        icon: 'dashboard',
        name: '仪表盘',
        route: '/dashboard',
    },
    {
        id: '2',
        bpid: '1',
        name: '日志搜索',
        icon: 'select',
        route: '/logsearch',
    },
    {
        id: '5',
        bpid: '1',
        name: '可视化样例',
        icon: 'code-o',
    },
    {
        id: '51',
        bpid: '5',
        mpid: '5',
        name: 'ECharts',
        icon: 'line-chart',
        route: '/chart/ECharts',
    },
    {
        id: '52',
        bpid: '5',
        mpid: '5',
        name: 'highCharts',
        icon: 'bar-chart',
        route: '/chart/highCharts',
    },
    {
        id: '53',
        bpid: '5',
        mpid: '5',
        name: 'Rechartst',
        icon: 'area-chart',
        route: '/chart/Recharts',
    },
]
module.exports = {
    [`GET ${config.apiPrefix}/menus`](req, res) {
        res.status(200).json(database);
    },
}