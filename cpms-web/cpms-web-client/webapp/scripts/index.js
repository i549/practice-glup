
/**
 * 配置require参数
 */
require.config({
    urlArgs: '_' + new Date().getTime(),
    baseUrl: '/js/',
    paths: {
        'jquery': 'core/jquery',
        'jquery.extend': 'main/jquery.extend',
        'App': 'util/App',
        'bootstrap': '../module/bootstrap/bootstrap.min'
    },
    //map告诉RequireJS在任何模块之前，都先载入这个模块，这样别的模块依赖于css!..这样的模块都知道怎么处理了
    map: {
        '*': {
            'css': 'core/css'
        }
    },
    shim: {
        'jquery.extend': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: [ 'jquery', 'css!/module/bootstrap/bootstrap.min.css' ]
        }
    }
});

require([
    'jquery',
    'bootstrap',
    'css!/module/bootstrap/bootstrap.min.css'
], function($) {
    $(function() {
        require([
            'App', 'jquery.extend',
            'css!/css/index.css',
            'css!/css/theme/default.css'
        ], function(App) {
            window.App = App || {};
            $('#main_view').html('欢迎来到gulp测试首页');
        });
    });
});