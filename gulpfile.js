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
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML
const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
}

//Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))

}

//Images
const optimizeImg = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

//WebP
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh({webp: {}}))
    .pipe(gulp.dest('build/img'))
}

//SVG
const optimizeSvg = () => {
  return gulp.src(['source/img/*.svg', '!source/img/icon/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'))
}

//Sprite
const createSprite = () => {
  return gulp.src('source/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img/icon'))
}

//Copy
const copy = (done) => {
  return gulp.src(['source/fonts/*.{woff,woff2}',
    'source/*.ico', 'source/sprite.svg'], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

//Del
const clean = () => {
  return del('build');
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

//Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html, reload))
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
}

//Build
export const build = gulp.series (
  clean,
  copy,
  optimizeImg,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    createSprite,
    createWebp
  ),
)

//Start
const start = gulp.series (
  clean,
  copy,
  optimizeImg,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    createSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher)
)

export default gulp.series(

);
