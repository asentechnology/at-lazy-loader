import gulp from 'gulp'
import clean from 'gulp-clean'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import addsrc from 'gulp-add-src'
import browserify from 'gulp-browserify'
import svnUltimate from 'node-svn-ultimate'
import { phpMinify } from '@cedx/gulp-php-minify'
import removeEmptyLines from 'gulp-remove-empty-lines'

const pkg = require('./package.json')

const svn = 'dist/svn'
const jsSource = 'src/js'
const phpSource = 'src/php'
const trunk = 'dist/svn/trunk'
const staticSource = 'src/static'
const destination = 'dist/at-lazy-loader'
const tags = `dist/svn/tags/${pkg.version}`

gulp.task('clean', () => gulp.src('dist', { allowEmpty: true }).pipe(clean()))

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

gulp.task('svn-checkout', done => {
  svnUltimate.commands.checkout(
    'https://plugins.svn.wordpress.org/at-lazy-loader',
    '/Users/sean/Software-Projects/at-lazy-loader/dist/svn',
    error => {
      if (error) console.log(error)
      done()
    }
  )
})

gulp.task(
  'svn-update',
  gulp.series(
    () => gulp.src(trunk, { allowEmpty: true }).pipe(clean()),
    () => gulp.src(`${destination}/**/*`).pipe(gulp.dest(trunk)),
    () => gulp.src(`${destination}/**/*`).pipe(gulp.dest(tags)),
    done => {
      svnUltimate.commands.status(svn, (error, status) => {
        const items = [].concat(status.target.entry || [])

        const addItems = items
          .filter(item => item['wc-status'].$.item == 'unversioned')
          .map(item => item.$.path)

        const delItems = items
          .filter(item => item['wc-status'].$.item == 'missing')
          .map(item => item.$.path)

        Promise.all([
          new Promise((resolve, reject) => {
            if (addItems.length) {
              svnUltimate.commands.add(addItems, () => {
                resolve()
              })
            } else {
              resolve()
            }
          }),
          new Promise((resolve, reject) => {
            if (delItems.length) {
              svnUltimate.commands.del(delItems, () => {
                resolve()
              })
            } else {
              resolve()
            }
          })
        ]).then(() => {
          done()
        })
      })
    }
  )
)

gulp.task('svn-commit', done => {
  svnUltimate.commands.commit(
    'dist/svn',
    { username: 'asentechnology', params: [`-m "Version ${pkg.version}"`] },
    error => {
      if (error) console.log(error)
      done()
    }
  )
})

gulp.task('build', gulp.series('clean', 'js', 'php', 'static'))

gulp.task('watch', () => {
  gulp.watch(`${jsSource}/**/*`, gulp.series('js'))
  gulp.watch(`${phpSource}/**/*`, gulp.series('php'))
  gulp.watch(`${staticSource}/**/*`, gulp.series('static'))
})

gulp.task('default', gulp.series('build', 'watch'))

gulp.task(
  'publish',
  gulp.series('build', 'svn-checkout', 'svn-update', 'svn-commit')
)
