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

gulp.task('static', () =>
  gulp.src('src/static/**/*').pipe(gulp.dest(destination))
)

gulp.task('watch', () => {
  gulp.watch('src/js/**/*', gulp.series('js'))
  gulp.watch('src/static/**/*', gulp.series('static'))
})

gulp.task('build', gulp.series('js', 'static'))
