gulp = require('gulp');
lr = require('gulp-livereload');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

//ref: https://gist.github.com/danharper/3ca2273125f500429945

function compile(watch) {
  var bundler = watchify(browserify('./lib/index.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }
  
  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}


gulp.task('build', function() { return compile(); });

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  lr.listen();
  dest = ["start.log","app/views/**","app/assets/**"];
  gulp.watch(dest).on('change', function(file) {
    compile(true);
    lr.changed(file.path);
  });
});
  
gulp.task('default', ['watch','build']);
