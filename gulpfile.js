import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import csso from 'postcss-csso';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from "gulp-libsquoosh";
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';


// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('css/style.min.css'))
    .pipe(gulp.dest('build', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


//HTML
export const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
}

//Scripts
export const script = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))

}

//Images
export const images = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

//WebP
export const createWebp = () => {
  return gulp.src('source/img/**/*.{img,png}')
    .pipe(squoosh({webp: {}}))
    .pipe(gulp.dest('build/img'))
}

//SVG
export const svgopt = () => {
  return gulp.src(['source/img/*.svg'])
    .pipe(svgo())
    .pipe.dest('build/img')
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html, styles, server, watcher
);
