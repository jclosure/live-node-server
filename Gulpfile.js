gulp = require('gulp');
lr = require('gulp-livereload');

gulp.task('watch', function() {
  lr.listen()
  dest = ["start.log","app/views/**","app/assets/**"];
  gulp.watch(dest).on('change', function(file) {
      lr.changed(file.path);
  });
});
  
gulp.task('default', ['watch']);
