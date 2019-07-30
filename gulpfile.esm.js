import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import addsrc from 'gulp-add-src'
import browserify from 'gulp-browserify'
import { phpMinify } from '@cedx/gulp-php-minify'
import removeEmptyLines from 'gulp-remove-empty-lines'

const jsSource = 'src/js'
const phpSource = 'src/php'
const staticSource = 'src/static'
const destination = 'dist/at-lazy-loader'

gulp.task('js', () =>
  gulp
    .src(`${jsSource}/at-lazy-loader.js`)
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
    .src([
      `${phpSource}/AT_Lazy_Loader.php`,
      `${phpSource}/AT_Lazy_Load_Images.php`
    ])
    .pipe(phpMinify())
    .pipe(addsrc(`${phpSource}/plugin-info.php`))
    .pipe(concat('at-lazy-loader.php'))
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(destination))
)

gulp.task('static', () =>
  gulp.src(`${staticSource}/**/*`).pipe(gulp.dest(destination))
)

gulp.task('build', gulp.series('js', 'php', 'static'))

gulp.task('watch', () => {
  gulp.watch(`${jsSource}/**/*`, gulp.series('js'))
  gulp.watch(`${phpSource}/**/*`, gulp.series('php'))
  gulp.watch(`${staticSource}/**/*`, gulp.series('static'))
})

gulp.task('default', gulp.series('build', 'watch'))
