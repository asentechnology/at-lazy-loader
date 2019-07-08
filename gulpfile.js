const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require("gulp-browserify");

const destination = "dist/visual-composer-starter-child";

gulp.task("js", () =>
  gulp
    .src("app/js/main.js")
    .pipe(browserify())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest(destination + "/assets"))
);

gulp.task("watch", function() {
  gulp.watch("app/js/**/*", gulp.series("js"));
});

gulp.task("build", gulp.series("js"));
