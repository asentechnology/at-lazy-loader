import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import browserify from 'gulp-browserify'
import { phpMinify } from '@cedx/gulp-php-minify'

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

gulp.task('php', () =>
  gulp
    .src(['src/php/*.php'])
    .pipe(concat('at-lazy-loader.php'))
    // .pipe(phpMinify({ silent: true }))
    .pipe(gulp.dest(destination))
)

gulp.task('static', () =>
  gulp.src('src/static/**/*').pipe(gulp.dest(destination))
)

gulp.task('watch', () => {
  gulp.watch('src/js/**/*', gulp.series('js'))
  gulp.watch('src/php/**/*', gulp.series('php'))
  gulp.watch('src/static/**/*', gulp.series('static'))
})

gulp.task('build', gulp.series('js', 'php', 'static'))
