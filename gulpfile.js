var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    sourcemaps = require("gulp-sourcemaps");


var paths = {
    styles: {
        src: "*.scss",
        dest: ""
    }
};

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
}

function watch() {
    gulp.watch(paths.styles.src, style);
}

exports.watch = watch;
exports.style = style;

var build = gulp.parallel(style, watch);

gulp.task('default', build);