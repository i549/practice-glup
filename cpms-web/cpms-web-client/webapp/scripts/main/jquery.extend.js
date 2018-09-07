"use strict";

/**
 * 扩展jquery方法
 */
define(['jquery'], function() {
    /**
     * 扩展jQuery函数
     */
    +(function($) {
        $.extend({

        });
    }(jQuery));


    /**
     * 扩展jQuery实例函数
     */
    +(function($) {
        $.fn.extend({
            /**
             * 加载页面
             * @param {object} opts 加载对象配置参数
             *    {string}  url 需加载页面地址
             *    {array|string}  preload   预加载资源
             *    {array|string}  styles    依赖样式资源
             *
             * @param {object} params  页面传递参数
             * @param {function} cb    加载完成回调
             */
            loadPage: function(opts, params, cb) {
                //TODO 根据参数加载页面并执行入口函数
            }
        });
    }(jQuery));
});