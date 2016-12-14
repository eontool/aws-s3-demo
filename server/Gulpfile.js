let gulp = require('gulp');
let nodemon = require('nodemon');

gulp.task('start', function () {
  nodemon({
    script: 'build/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['start']);