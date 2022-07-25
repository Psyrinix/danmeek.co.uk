/**
 * @package Dan Meek > Website
 * @author Dan Meek < author me@danmeek.co.uk >
 */

// Gulp
const {
    dest,
    parallel,
    series,
    src,
    watch
} = require("gulp");
// Config
const config = require("./gulpfile.config.js");

// Plugins
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const browserSyncConfig = require(`${config.processDirs.config}/browser-sync.config.js`);
const del = require("del");
const deploy = require('gulp-gh-pages');
const notify = require('gulp-notify');
const packageJSON = require('./package.json');
const pug = require("gulp-pug");
const pugConfig = require(`${config.processDirs.config}/pug.config.js`);
const replace = require('gulp-replace');
const run = require('gulp-run');
const sass = require("gulp-sass");
const sassConfig = require(`${config.processDirs.config}/sass.config.js`);
const sassLint = require('gulp-sass-lint');
const sourceMaps = require("gulp-sourcemaps");
const tslint = require("gulp-tslint");
const webpack = require("webpack-stream");


const webpackConfig = require(`${config.processDirs.config}/webpack.config.js`);

function clean() {
    return del([config.destDirs.css[0], config.destDirs.js[0], config.destDirs.maps[0], config.destDirs.assets[0]]);
}

function changelog() {
    return run('node ./tools/changelog.js').exec();
}

function deployToGh() {
    src(`${config.destDirs.pug}/**/*`)
        .pipe(dest(`./docs/`))
}

function version() {
    for (const file of config.semVerFiles) {
        console.log(`bumping version in '${file.filepath}/${file.filename}' to ${packageJSON.version}`)
        return src(`${file.filepath}/${file.filename}`)
            .pipe(replace(/(\d+).(\d+).(\d+)/, packageJSON.version))
            .pipe(dest(`${file.filepath}`));
    }
}

// Server Task
function server() {
    browserSync.init(browserSyncConfig);
}
// Scripts Development Task
function scriptsDevelopment() {
    let scripts = src(`${config.srcPaths.ts}`)
        .pipe(webpack(webpackConfig(config.environments.development)))
        .on("error", notify.onError({
            title: 'Scripts Error',
            message: '<%= error.message %>',
            onLast: true
        })).on("error", function (error) {
            this.emit('end');
        });
    for (let scriptDestination of config.destDirs.js) {
        scripts = scripts.pipe(dest(scriptDestination));
    }
    return scripts;
}
// Scripts Production Task
function scriptsProduction() {
    let scripts = src(`${config.srcPaths.ts}`)
        .pipe(webpack(webpackConfig(config.environments.production)));
    for (let scriptDestination of config.destDirs.js) {
        scripts = scripts.pipe(dest(scriptDestination));
    }
    return scripts;
}
// Scripts Linting Task
function scriptsLint() {
    return src(config.srcPaths.ts)
        .pipe(tslint({
            formatter: "verbose"
        }));
}
// Scripts Watch Task
function scriptsWatch() {
    watch(config.srcPaths.ts, scriptsDevelopment).on("change", browserSync.reload);
}
// Styles Development Task
function stylesDevelopment() {
    let styles = src(config.srcPaths.sass)
        .pipe(sourceMaps.init())
        .pipe(sass(sassConfig(config.environments.development)))
        .on('error', notify.onError({
            title: 'Styles Error',
            message: '<%= error.message %>',
            onLast: true
        }))
        .pipe(autoprefixer())
        .pipe(sourceMaps.write(config.destDirs.maps))
        .pipe(dest(config.destDirs.css))
        .pipe(browserSync.stream());

    for (let stylesDestination of config.destDirs.css) {
        styles = styles.pipe(dest(stylesDestination));
    }
    return styles;
}
// Styles Production Task
function stylesProduction() {
    let styles = src(config.srcPaths.sass)
        .pipe(sass(sassConfig(config.environments.production)))
        .pipe(autoprefixer())
        .pipe(dest(config.destDirs.css));
    for (let stylesDestination of config.destDirs.css) {
        styles = styles.pipe(dest(stylesDestination));
    }
    return styles;
}
// Styles Linting Task
function stylesLint() {
    return src(SRC_PATHS.sass)
        .pipe(sassLint({
            configFile: '.sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}
// Styles Watch Task
function stylesWatch() {
    watch(config.srcPaths.sass, stylesDevelopment);
}

// Markup Development Task
function markupDevelopment() {
    return src(`${config.srcDirs.pug}/public/*.pug`)
        .pipe(pug(pugConfig(config.environments.development)))
        .on('error', notify.onError({
            title: 'Markup Error',
            message: '<%= error.message %>',
            onLast: true
        }))
        .pipe(dest(config.destDirs.pug));
}
// Markup Production Task
function markupProduction() {
    return src(`${config.srcDirs.pug}/public/*.pug`)
        .pipe(pug(pugConfig(config.environments.production)))
        .pipe(dest(config.destDirs.pug));
}
// Markup Watch Task
function markupWatch() {
    watch(config.srcPaths.pug, markupDevelopment).on("change", browserSync.reload);
}
// Move assets task
function assets() {
    return src(`${config.srcDirs.assets}/**/*`)
        .pipe(dest(config.destDirs.assets));
}

// Individual Tasks
exports.assets = assets;
exports.scriptsDevelopment = scriptsDevelopment;
exports.scriptsProduction = series(scriptsLint, scriptsProduction);
exports.stylesDevelopment = stylesDevelopment;
exports.stylesProduction = stylesProduction;
exports.markupDevelopment = markupDevelopment;
exports.markupProduction = markupProduction;
// Grouped Tasks
const build = parallel(assets, scriptsDevelopment, stylesDevelopment, markupDevelopment);
const release = series(clean, assets, parallel(scriptsProduction, stylesProduction, markupProduction), deployToGh);
// Export Tasks
exports.version = version;
exports.changelog = changelog;
exports.build = build;
exports.release = release;
exports.deployToGh = deployToGh;
exports.watch = series(build, parallel(stylesWatch, markupWatch, scriptsWatch, server));
exports.default = build;
