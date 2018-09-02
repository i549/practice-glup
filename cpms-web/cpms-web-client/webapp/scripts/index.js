
/**
 * 配置require参数
 */
require.config({
    urlArgs: '_' + new Date().getTime(),
    baseUrl: '/js/',
    paths: {
        'jquery': 'core/jquery'
    },
    //map告诉RequireJS在任何模块之前，都先载入这个模块，这样别的模块依赖于css!..这样的模块都知道怎么处理了
    map: {
        '*': {
            'css': 'core/css'
        }
    },
    shim: {

    }
});

require(['jquery', 'css!/css/index.css'], function($) {
    $(function() {
        $('#main_view').html('欢迎来到gulp测试首页');
        $('#main_view').html('欢迎来到gulp测试首页');
        $('#main_view').html('欢迎来到gulp测试首页');
    });
});