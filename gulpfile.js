var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var rjs = require('gulp-requirejs-optimize');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');

var config = {
    src: './src',
    target: './target',
    bowerRoot: './bower_components',
    requirejs: {
        paths: {
            'jquery': '../../bower_components/jquery/dist/jquery',
            'jquery-ui': '../../bower_components/jquery-ui/jquery-ui',
            'gl-matrix': '../../bower_components/gl-matrix/dist/gl-matrix-min',
            'underscore': '../../bower_components/underscore/underscore',
            'backbone': '../../bower_components/backbone/backbone',
            'jquery.transform3d': '../../bower_components/jquery.transform.js/jquery.transform3d',
            'jquery.transform2d': '../../bower_components/jquery.transform.js/jquery.transform2d',
            'requestAnimationFrame': '../../bower_components/requestAnimationFrame/app/requestAnimationFrame',
            'two': '../../bower_components/two/build/two'
        },
        shim: {
            'two': {
                deps: ['underscore'],
                exports: 'Two'
            },
            'jquery-ui': {
                deps: ['jquery']
            }
        },
        wrapShim: true
    }
};

gulp.task('default', function () {
    return gutil.log('No task specified, performing no action');
});

gulp.task('watch', ['bundle', 'static', 'less'], function() {
    gulp.watch(config.src + '/js/**/*.js', ['bundle']);
    gulp.watch(config.src + '/**/*.html', ['static']);
    gulp.watch(config.src + '/lib/*', ['static']);
    gulp.watch(config.src + '/less/**/*.less', ['less']);
});

gulp.task('site', ['bundle', 'static', 'less']);

gulp.task('static', ['css', 'less'], function() {
    return gulp.src(
        [
            config.src + '/**/*.html',
            config.src + '/lib/*'
        ], {base: config.src})
        .pipe(changed(config.target))
        .pipe(gulp.dest(config.target));
});

gulp.task('css', function() {
    return gulp.src([
            './bower_components/bootstrap/dist/css/bootstrap.min.css*',
            './bower_components/bootstrap-material-design/dist/css/material-fullpalette.min.css*'
        ])
        .pipe(changed(config.target + '/css'))
        .pipe(gulp.dest(config.target + '/css'));
});

// Compile all of the Less stylesheets and copy them to the correct location in the
//  target directory.
gulp.task('less', function() {
    return gulp.src(config.src + '/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', function() {
            this.emit('end');
        })
        .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.target + '/css'));
});

// Take all of our custom application code and concatenate it in to
//   a single file
gulp.task('bundle', function () {
    return gulp.src(config.src + '/js/dots.js')
        .pipe(sourcemaps.init())
        .pipe(rjs(config.requirejs))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.target + '/js'));
});

// Host a local webserver, and inject updated resources when possible,
//   or refresh the page when necessary
gulp.task('browsersync', ['watch'], function() {
    var bsConfig = {
        server: {
            baseDir: config.target
        },
        files: [
            config.src + '/**',
            config.target + '/**'
        ]
    };
    browserSync(bsConfig);
});

gulp.task('docker', ['site'], shell.task([
    'docker build -t honours-project .'
]));
