"use strict";

const del = require('del');
const gulp = require('gulp');
// 使用 vinyl-paths 模块来简单地获取 stream 中每个文件的路径，然后传给 del 方法
const vinylPaths = require('vinyl-paths');
const $ = require('gulp-load-plugins')();
// http代理插件
var proxy = require('http-proxy-middleware');
// 获取编译参数
const args = require('minimist')(process.argv.slice(2));
// 获取编译配置
const maps = require('./gulp-conf.json').maps;

/**
 * 查看删除文件
 */
const _showDelFiles = function(_files) {
    // 查看将被删除的文件
    del(_files, {dryRun: true})
        .then(function(paths) {
            console.log('Files and folders that would be deleted:\n', paths.join('\n'));
        })
        .pipe($.debug({title: 'show del files::'}));
};

/**
 * 将文件从源路径拷贝至目标路径
 */
const _moveFiles = function(_src, _target) {
    return gulp.src(_src)
       .pipe($.plumber())
       .pipe($.changed(_target))
       .pipe(gulp.dest(_target));
};

// 清空编译目标目录
gulp.task('clean', del.bind(null, ['build/*'], {dot: true}));

// 编译图片文件
gulp.task('images', function() {
    return gulp.src(maps.images.src)
        .pipe($.plumber())
        .pipe($.imagemin())
        .pipe($.changed(maps.images.target))
        .pipe(gulp.dest(maps.images.target))
        .pipe($.connect.reload());
});

// 编译页面文件
gulp.task('pages', function() {
    return gulp.src(maps.pages.src)
        .pipe($.plumber())
        .pipe($.htmlmin())
        .pipe($.changed(maps.pages.target))
        .pipe(gulp.dest(maps.pages.target))
        .pipe($.connect.reload());
});

// 编译样式文件
gulp.task('styles', function() {
    return gulp.src(maps.styles.src)
        .pipe($.plumber())
        //编译less文件
        .pipe($.less())
        //添加浏览器前缀
        .pipe($.autoprefixer())
        //压缩CSS
        .pipe($.minifyCss())
        .pipe($.changed(maps.styles.target))
        .pipe(gulp.dest(maps.styles.target))
        .pipe($.connect.reload());
});

// 编译脚本文件
gulp.task('scripts', function() {
    return gulp.src(maps.scripts.src)
        .pipe($.plumber())
        //js混淆压缩
        .pipe($.uglify())
        .pipe($.changed(maps.scripts.target))
        .pipe(gulp.dest(maps.scripts.target))
        .pipe($.connect.reload());
});

// 定义livereload任务
gulp.task('connect', function () {
    $.connect.server({
        port: 8081,
        root: ['build'],
        livereload: true,
        middleware: function() {
            var middlewares = [];
            var _ws_target = 'http://localhost:8080';
            
            middlewares.push(proxy('/index',  { target: _ws_target, changeOrigin:true }));
            
            return middlewares;
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(maps.pages.src, ['pages']);
    gulp.watch(maps.styles.src, ['styles']);
    gulp.watch(maps.scripts.src, ['scripts']);
    gulp.watch(maps.images.src, ['images']);
});

// 编译打包
gulp.task('build', ['clean'], function(cb) {
    $.sequence(['pages', 'styles', 'scripts', 'images'], cb);
});


gulp.task('default', function(cb) {
	$.sequence(['connect', 'watch'], cb);
});




