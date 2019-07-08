const gulp = require('gulp')
var uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const browserify = require('gulp-browserify')

const destination = 'dist/at-lazy-loader'

gulp.task('js', () =>
  gulp
    .src('src/js/at-lazy-loader.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(destination))
)

gulp.task('php', function () {
  return gulp.src('src/php/**/*').pipe(gulp.dest(destination))
})

gulp.task('watch', function () {
  gulp.watch('src/js/**/*', gulp.series('js'))
  gulp.watch('src/php/**/*', gulp.series('php'))
})

gulp.task('build', gulp.series('js', 'php'))
