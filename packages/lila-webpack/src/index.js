import path from 'path';
import dev from './dev';
import start from './start';
import analyze from './analyze';
import task from './task';
import { getAllEntries } from './util';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default lila => {
  const {
    addCommand,
    makeArgv,
    registerTask,
    runTasks,
    getSettings,
    getCmdOptions,
  } = lila;
  const [root, srcDir] = getSettings(['root', 'src']);
  const srcPath = join(root, srcDir);

  // add dev command
  addCommand(commander => {
    const command = commander
      .command('dev [entry]')
      .description('start a local server to develop an entry')
      .allowUnknownOption();

    getCmdOptions('dev').forEach(value => {
      command.option(...value);
    });

    command.action((entry = defaultEntry, options) => {
      const argv = makeArgv(options);

      dev({ entry, argv, lila });
    });
  });

  // add serve command
  addCommand(commander => {
    const command = commander
      .command('serve [entry]')
      .description(
        'simulate a backend environment to start a local server to develop an entry'
      )
      .allowUnknownOption();

    getCmdOptions('serve').forEach(value => {
      command.option(...value);
    });

    command.action((entry = defaultEntry, options) => {
      // servePath should load here
      const [servePath] = getSettings(['servePath']);
      const argv = makeArgv(options);

      if (!servePath) throw new Error("setting [servePath] hasn't been set");

      dev({ entry, argv, lila, serve: !0, servePath });
    });
  });

  // add build command
  addCommand(commander => {
    const command = commander
      .command('build [entries...]')
      .description('pack source codes to production bundles')
      .allowUnknownOption();

    getCmdOptions('build').forEach(value => {
      command.option(...value);
    });

    command.action((entries, options) => {
      // getEntries should load here
      const [getEntries] = getSettings(['getEntries']);
      const realEntries = entries.length ? entries : [defaultEntry];

      runTasks({
        entries: getEntries
          ? getAllEntries({ entries: realEntries, getEntries, srcPath, root })
          : realEntries,
        argv: makeArgv(options),
        cmd: 'build',
      });
    });
  });

  // add sync command
  addCommand(commander => {
    const command = commander
      .command('sync [entries...]')
      .description('make production bundles, then sync to remote servers')
      .allowUnknownOption();

    getCmdOptions('sync').forEach(value => {
      command.option(...value);
    });

    command.action((entries, options) => {
      // getEntries should load here
      const [getEntries] = getSettings(['getEntries']);
      const realEntries = entries.length ? entries : [defaultEntry];

      runTasks({
        entries: getEntries
          ? getAllEntries({ entries: realEntries, getEntries, srcPath, root })
          : realEntries,
        argv: makeArgv(options),
        cmd: 'sync',
      });
    });
  });

  // add start command
  addCommand(commander => {
    const command = commander
      .command('start [entry]')
      .description(
        'make production bundles, then start a local server to preview'
      )
      .allowUnknownOption();

    getCmdOptions('start').forEach(value => {
      command.option(...value);
    });

    command.action((entry = defaultEntry, options) => {
      const argv = makeArgv(options);
      runTasks(
        {
          entries: [entry],
          argv,
          cmd: 'start',
        },
        () => {
          start({ entry, argv, lila });
        }
      );
    });
  });

  // add analyze command
  addCommand(commander => {
    const command = commander
      .command('analyze [entry]')
      .description('visualize size of webpack output files')
      .allowUnknownOption();

    getCmdOptions('analyze').forEach(value => {
      command.option(...value);
    });

    command.action((entry = defaultEntry, options) => {
      const argv = makeArgv(options);

      analyze({ entry, argv, lila });
    });
  });

  // register @lila/webpack task
  registerTask('@lila/webpack', task);
};
