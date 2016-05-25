
var gulp = require('gulp'),
    del = require('del'),
    compass = require('gulp-compass'),
    csso = require('gulp-csso'),
    jade = require('gulp-jade'),
    amdOptimize = require('amd-optimize'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    path = require('path'),
    fs = require('fs'),
    extend = require('extend'),
    cache = require('gulp-cached'),
    browserSync = require('browser-sync').create();

var srcPaths = {
        js: ['src/js/**/*.js'],
        sass: ['src/scss/**/*.scss'],
        view: ['src/views/**/*.jade', '!src/views/**/*-layout.jade'],
        json: ['src/views/**/*.json'],
        font: ['src/fonts/**/*.{eot,svg,ttf,woff,woff2}'],
        image: ['src/images/**/*.{jpg,jpeg,png,gif}'],
        template: ['src/templates/**/*.rac']
    },

    distPaths = {
        js: 'dist/js/',
        css: 'dist/css/',
        view: 'dist/html/',
        font: 'dist/fonts/',
        image: 'dist/images/',
        template: 'dist/templates/'
    };

var jsonRoot = './src/views/';
var backstage = require(jsonRoot + 'backstage.json'),
    operation = require(jsonRoot + 'operation.json'),
    distributor = require(jsonRoot + 'dist.json'),
    supply = require(jsonRoot + 'supply.json');



gulp.task('browserSync', ['js', 'compass', 'view', 'font', 'image', 'template'], function() {
    browserSync.init({
        server: {
            baseDir: './dist',
            directory: true
        }
    });

    gulp.watch(srcPaths.js, ['js-watch']).on('change', log);
    gulp.watch(srcPaths.sass, ['compass']).on('change', log);
    gulp.watch(srcPaths.view, ['view']).on('change', log);
    gulp.watch(srcPaths.json, ['view']).on('change', log);
    gulp.watch(srcPaths.image, ['image']).on('change', log);
    gulp.watch(srcPaths.font, ['font']).on('change', log);
    gulp.watch(srcPaths.template, ['template']).on('change', log);

    // reload
    gulp.watch(['dist/html/**/*.html', 'dist/images/**/*.{jpg,jpeg,png,gif}']).on('change', browserSync.reload);

    // delete dist file
    gulp.watch('src/**/*.*').on('change', function (evet) {
        if (evet.type === 'deleted') {
            var delFilePath = evet.path.replace('src', 'dist');
            delFilePath = delFilePath.replace('/scss', '/css');
            delFilePath = delFilePath.replace('.scss', '.css');
            delFilePath = delFilePath.replace('/views', '/html');
            delFilePath = delFilePath.replace('.jade', '.html');

            if (fs.existsSync(delFilePath)) {
                del(delFilePath);
                console.log('Delete: ' + delFilePath);
            }
        }
    });

    function log(evet) {
        console.log('File ' + evet.path + ' was ' + evet.type + ', running tasks....');
    }
});

gulp.task('js', function () {
    return gulp.src(srcPaths.js)
        .pipe(cache('js-cache'))
        .pipe(gulp.dest(distPaths.js))
        .pipe(amdOptimize('base', {
            baseUrl: 'src/js',
            configFile: 'src/js/base.js'
        }).on('error', function (e) {
            gutil.log(e);
            this.emit('end');
        }))
        .pipe(concat('base.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distPaths.js));
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('compass', function () {
    return gulp.src(srcPaths.sass)
        .pipe(cache('css-cache'))
        .pipe(compass({
            config_file: './config.rb',
            css: 'dist/css',
            sass: 'src/scss'
        }))
        .on('error', function (e) {
            console.log(e);
            this.emit('end');
        })
        .pipe(gulp.dest('src/css/'))
        //.pipe(csso())
        .pipe(gulp.dest(distPaths.css))
        .pipe(browserSync.stream());
});

gulp.task('view', function () {
    return gulp.src(srcPaths.view)
        .pipe(data(function (file) { // 加载json数据
            // 获取相对路径
            var relativePath = file.path.replace(file.base, '');
            var depth = (relativePath.match(new RegExp('\\' + path.sep, 'g')) || []).length;
            var relativeModulePath = new Array(depth).join('../');
            var rootPath = relativeModulePath + '../../';
            var result = { relativeRoot: rootPath };
            // 获取同jade文件同名的json
            var data = {};
            var dataPath = file.path.replace('.jade', '.json');
            if (fs.existsSync(dataPath)) {
                data = require(dataPath);
            }
            // 合并数据并返回
            extend(result, data, backstage, operation, supply, distributor);
            return result;
        }))
        .pipe(jade({
            pretty: true
        }).on('error', function (e) {
            gutil.log(e);
            this.emit('end');
        }))
        .pipe(cache('view-cache'))
        .pipe(gulp.dest(distPaths.view));
});

gulp.task('image', function () {
    return gulp.src(srcPaths.image)
        .pipe(cache('image-cache'))
        .pipe(gulp.dest(distPaths.image));
});

// 变动较少，不需要缓存
gulp.task('font', function () {
    return gulp.src(srcPaths.font)
        .pipe(gulp.dest(distPaths.font));
});

gulp.task('template', function () {
    return gulp.src(srcPaths.template)
        .pipe(cache('template-cache'))
        .pipe(gulp.dest(distPaths.template));
});

/*gulp.task('serve', function () {
    app.use(livereload({port: liveReloadPort}));
    app.use(express.static(path.resolve('./dist')));
    app.listen(serverPort);
    refresh.listen({port: liveReloadPort, quiet: true});
    gutil.log('listening on port: ' + serverPort);
});*/

/*gulp.task('watch', function () {

    refresh.listen({ port: 1234, basePath: 'dist/!**' });

    gulp.watch(srcPaths.js, ['js']);

    gulp.watch(srcPaths.sass, ['compass']);

    gulp.watch(srcPaths.view, ['view']);

    gulp.watch(srcPaths.image, ['image']);

    gulp.watch(srcPaths.font, ['font']);

    gulp.watch(srcPaths.template, ['template']);

    // 监听所有位在 dist/  目录下的档案，一旦有更动，便进行重载
    /!*gulp.watch(['dist/!**']).on('change', function(evet) {
        console.log(evet);
    });*!/

});*/

// default task
//gulp.task('default', ['js', 'compass', 'view', 'font', 'image', 'template', 'serve', 'watch']);