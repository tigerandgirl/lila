import gulp from 'gulp';
import { log, error } from './logger';

// format error thrown by gulp
const formatError = e => {
  if (!e.error) return e.message;

  // PluginError
  if (typeof e.error.showStack === 'boolean') return e.error.toString();

  // Normal error
  if (e.error.stack) return e.error.stack;

  // Unknown (string, number, etc.)
  return new Error(String(e.error)).stack;
};

// task start
gulp.on('start', e => {
  const { name } = e;
  log(`starting task ${name} ...`);
});

// task finish
gulp.on('stop', e => {
  const { name } = e;
  log(`finished task ${name}`);
});

// task error
gulp.on('error', e => {
  const { name } = e;
  error(`error task ${name}`);
  error(formatError(e));
  process.exitCode = 1;
});

export default (tasks, successCB, errorCB) => {
  try {
    gulp.series(...(Array.isArray(tasks) ? tasks : [tasks]))(err => {
      if (err) {
        if (errorCB) errorCB(err);
      } else if (successCB) successCB();
    });
  } catch (err) {
    error(err);
    if (errorCB) errorCB(err);
  }
};