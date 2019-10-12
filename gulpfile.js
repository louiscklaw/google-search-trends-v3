// npm install gulp gulp-pug gulp-less gulp-csso gulp-concat gulp-javascript-obfuscator gulp-rename --save -D
const {
    src,
    dest,
    parallel,
    series
} = require( 'gulp' );
const path = require( 'path' );
const pug = require( 'gulp-pug' );
const less = require( 'gulp-less' );
const minifyCSS = require( 'gulp-csso' );
const concat = require( 'gulp-concat' );

const rename = require( 'gulp-rename' );
const javascriptObfuscator = require( 'gulp-javascript-obfuscator' );

const child_process = require( 'child_process' );

const PROJ_HOME = path.join( __dirname, '..', '..' );


function html() {
    return src( 'src/pug/index.pug' )
        .pipe( pug() )
        .pipe( dest( path.join(PROJ_HOME, 'docs') ) )
}

function css() {
    return child_process.execSync('sass src/sass/style.scss:'+path.join(PROJ_HOME, 'docs')+'/css/style.css')
}

function js() {
    return src( 'src/js/*.js', {
            sourcemaps: true
        } )
        .pipe( concat( 'app.min.js' ) )
        .pipe( dest( path.join(PROJ_HOME, 'docs/js'), {
            sourcemaps: true
        } ) )
}

function js_compress() {
    return src( './src/js/app.js' )
        .pipe( javascriptObfuscator( {
            compact: true
        } ) )
        .pipe( rename( 'app.min.js' ) )
        .pipe( sourcemaps.write() )
        .pipe( dest( 'src/js', ) )
}

exports.js = js;
exports.css = css;
exports.html = html;
// exports.default = series( css, js, js_compress, html );
exports.default = parallel( js, css, html );
