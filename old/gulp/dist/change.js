
const _ = require('lodash');
const distData = require('./data');
const findChangedFiles = require('../handle/find_changed_files');

module.exports = {
    findChangedBase: (gulp) => {
        return function findChangedBase(cb) {

            // do not record files' changes
            if (!distData.currentConfig.recordFileChanges) {
                return gulp.src(distData.currentConfig.buildPaths.dist.dir + '/**/*', {
                        base: distData.currentConfig.buildPaths.dist.dir
                    })
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));
            }
            // record files' changes
            else {
                // get changed files
                const changedFiles = findChangedFiles(distData.currentConfig.buildPaths.dist.dir, 'base');
                const completeChangedFiles = [];

                if (!_.isEmpty(changedFiles)) {

                    _.forEach(changedFiles, (value, key) => {
                        completeChangedFiles.push(distData.currentConfig.buildPaths.dist.dir + '/' + key);
                        logger.info('changed: ' + key);
                    });

                    return gulp.src(completeChangedFiles, {base: distData.currentConfig.buildPaths.dist.dir})
                        .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));

                } else {
                    logger.info('Base nothing changed!');
                    cb();
                }
            }

        }
    }
};