let gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    templateCache = require('gulp-angular-templatecache'),
    cleanCSS = require('gulp-clean-css'),
    concatCSS = require('gulp-concat-css'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    pump = require('pump');

gulp.task('concat-css', () => {
    return gulp.src([
        // 'node_modules/bootstrap/dist/css/bootstrap.css',
        // 'node_modules/sweetalert/dist/sweetalert.css',
        // 'node_modules/tether/dist/tether.css',
        // 'node_modules/ionicons/dist/ionicons.css',
        // 'node_modules/animate.css/animate.css',
        // 'node_modules/toastr/build/toastr.css',
        // 'node_modules/switchery/standalone/switchery.css'
    ])
        .pipe(concatCSS('vendor.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src([
        './public/css/vendor.css'
    ])
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(details.name, ':', details.stats.originalSize);
            console.log(details.name, ':', details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./public/css/'));
});


gulp.task('concat-js', function() {
    return gulp.src([
        // 'node_modules/sweetalert/dist/sweetalert.min.js',
        // 'node_modules/angular-sweetalert/SweetAlert.min.js',
        // 'node_modules/tether/dist/js/tether.min.js',
        // 'node_modules/bootstrap/dist/js/bootstrap.min.js',
        // 'node_modules/toastr/build/toastr.min.js',
        // 'node_modules/switchery/standalone/switchery.js',
        // 'node_modules/ng-switchery/dist/ng-switchery.js',
        // 'node_modules/angular-canvas-painter/dist/angular-canvas-painter.js'
    ])
        .pipe(concat('libraries.js'))
        .pipe(gulp.dest('./public/js/'));
});

const vendors = ['jquery',
    'angular',
    'angular-ui-router',
];

gulp.task('build:vendor', () => {
    const b = browserify({
        debug: false
    });
    vendors.forEach(lib => {
        b.require(lib);

    });
    b.bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./public/js/'));
});

//let TEMPLATE_HEADER = 'function($templateCache) {';
// let TEMPLATE_BODY = '$templateCache.put("<%= url %>","<%= contents %>");';
// let TEMPLATE_FOOTER = '}]);';

gulp.task('app:views', function() {
    return gulp.src('source/views/**/*.html')
        .pipe(templateCache({
            module: 'Templates',
            standalone: true,
            moduleSystem: 'IIFE',
            //templateHeader: TEMPLATE_HEADER
        }))
        .pipe(gulp.dest('./build/views/'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('build:app', function() {
    return browserify({ entries: ['./build/app.js'] })
        .transform("babelify", { presets: ["es2015"] })
        .external(vendors)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(connect.reload());
});

gulp.task('compress:vendor', ['build:vendor'], (cb) => {
    pump([
        gulp.src('./public/js/vendor.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('./public/js/min/')
    ],
        cb
    );
});

gulp.task('compress:app', ['build:app'], (cb) => {
    pump([
        gulp.src('./public/js/app.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('./public/js/min/')
    ],
        cb
    )
        .pipe(connect.reload());
    console.log('finish app compression!');
});

gulp.task('connect', function() {

    connect.server({
        root: ['./public', './node_modules'],
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./public/app/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./public/app/*.html'], ['html']);
    gulp.watch(['./build/**/*.js'], ['build:app'])
    gulp.watch(['./source/views/**/*.html'], ['app:views'])
});

gulp.task('default', [
    'minify-css',
    'concat-js',
    'compress:vendor',
    'compress:app',
    'app:views',
    'connect',
    'watch'
]);