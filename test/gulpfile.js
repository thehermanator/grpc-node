const _gulp = require('gulp');
const help = require('gulp-help');
const mocha = require('gulp-mocha');
const exec = require('child_process').exec;
const path = require('path');

// gulp-help monkeypatches tasks to have an additional description parameter
const gulp = help(_gulp);

const testDir = __dirname;
const apiTestDir = path.resolve(testDir, 'api');

gulp.task('internal.test.link', 'Link local copies of grpc packages', (cb) => {
  return exec(`npm link ${testDir}/../packages/grpc-native-core`, cb);
});

gulp.task('internal.test.test', 'Run API-level tests', ['internal.test.link'], () => {
  return gulp.src(`${apiTestDir}/*.js`).pipe(mocha());
});