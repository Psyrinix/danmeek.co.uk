/**
 * @package Thrall.runner
 * @author Universal Music Group < author dan.meek@umusic.com >
 */

// Environment types
const ENVIRONMENTS = {
	development: `development`,
	production: `production`
};
const BASE_DIRS = {
	input: `./src`,
	output: `./public`,
}
// Input Directories
const SRC_DIRS = {
	assets: `${BASE_DIRS.input}/static/assets`,
	images: `${BASE_DIRS.input}/static/assets/images`,
	js: `${BASE_DIRS.input}/js`,
	pug: `${BASE_DIRS.input}/pug`,
	sass: `${BASE_DIRS.input}/sass`,
	svgs: `${BASE_DIRS.input}/static/assets/svgs`,
	ts: `${BASE_DIRS.input}/ts`
}
// File types
const SRC_PATHS = {
	pug: `${SRC_DIRS.pug}/**/*.pug`,
	sass: `${SRC_DIRS.sass}/**/*.scss`,
	ts: `${SRC_DIRS.ts}/**/*.ts`
};
// Output Directories
const DEST_DIRS = {
	assets: [`${BASE_DIRS.output}/assets`],
	css: [`${BASE_DIRS.output}/assets/css`],
	images: [`${BASE_DIRS.output}/assets/images`],
	js: [`${BASE_DIRS.output}/assets/js`],
	maps: [`${BASE_DIRS.output}/assets/maps`],
	pug: [`${BASE_DIRS.output}/`],
	svgs: [`${BASE_DIRS.output}/assets/svgs`]
};
// Process Directories
const PROCESS_DIRS = {
	config: `./config`
};
// Sem Ver files array
const SEM_VER_FILES = [
	{
		filename: `settings.pug`,
		filepath: `${SRC_DIRS.pug}/global`
	}
];

module.exports = {
	destDirs: DEST_DIRS,
	environments: ENVIRONMENTS,
	processDirs: PROCESS_DIRS,
	srcDirs: SRC_DIRS,
	srcPaths: SRC_PATHS,
	semVerFiles: SEM_VER_FILES,
};