# lila-core

Lila core.

## install

```
npm install --save-dev lila-core
```

## use

```
// es6
import lila from 'lila-core';

// commonjs
const lila = require('lila-core');
```

## init file

Lila requires an init file called `lila.js` in project root directory.

```
import webpackPlugin from 'lila-webpack';
import webpackConfigPlugin from 'lila-webpack-config';

// should export a function
export default lila => {

  // do some initialize actions

  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  // return a config generator
  return ({ entry, argv, cmd }) => {

    // make a config according to `entry, argv, cmd`
    const config = { ... }

    return config;
  };
}
```

## config

```
{
  ...,
  tasks: [ ... ],            // tasks run by `lila.runTasks`
}
```

### tasks

```
['task1', ['task2'], ['task3', arg0, arg1, ...], ...]
```

## api

### `lila.setSetting`: set a setting

```
lila.setSetting(name, value);
```

- `@param/name`: `type: string` setting name
- `@param/value`: `type: *` setting value

### `lila.setSettings`: set multiple settings

```
lila.setSettings(value);
```

- `@param/value`: `type: {}` `key-value` map of settings

### `lila.getSetting`: get a setting value

```
const value = lila.getSetting(name);
```

- `@param/name`: `type: string` setting name
- `@return`: `type: *` setting value

### `lila.getSettings`: get multiple setting values

```
const values = lila.getSettings(names);
```

- `@param/names`: `type: string[]` setting names
- `@return`: `type: *[]` setting values

### `lila.getAllSettings`: get all settings

```
const settings = lila.getAllSettings();
```

- `@return`: `type: {}` `key-value` map of all settings

### `lila.registerTask`: register a task generator

```
lila.registerTask(name, generator);
```

- `@param/name`: `type: string` task name
- `@param/generator`: `type: function` task generator

#### `generator`: task generator

Generate a gulp task callback. See [gulptaskname-fn](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulptaskname-fn).

```
({ entry, args, argv, cmd, config, lila, gulp }) => gulp-task-callback;
```

- `@param/options.entry`: `type: string` handling entry
- `@param/options.args`: `type: *[]` arguments from config
- `@param/options.argv`: `type: {}` wrapped `process.argv`
- `@param/options.cmd`: `type: string` command name
- `@param/options.config`: `type: {}` config of current entry
- `@param/options.lila`: `type: {}` `lila-core` reference
- `@param/options.gulp`: `type: {}` [gulp#4](https://github.com/gulpjs/gulp/tree/4.0) reference

### `lila.unregisterTask`: unregister a task generator

```
lila.unregisterTask(name);
```

- `@param/name`: `type: string` task name

### `lila.getTask`: get a task generator

```
const generator = lila.getTask(name);
```

- `@param/name`: `type: string` task name
- `@return`: `type: function` task generator

### `lila.getTasks`: get multiple task generators

```
const generators = lila.getTasks(names);
```

- `@param/names`: `type: string[]` task names
- `@return`: `type: function[]` task generators

### `lila.getAllTasks`: get all task generators

```
const tasks = lila.getAllTasks();
```

- `@return`: `type: {}` `name-generator` map of all tasks

### `lila.addCommand`: add a command

```
lila.addCommand(initializer);
```

- `@param/initializer`: `type: function` command initializer

#### `initializer`: command initializer

```
commander => { ... }
```

- `@param/commander`: `type: {}` see [commander.js](https://github.com/tj/commander.js)

### `lila.getCommands`: get added command initializers

```
const initializers = lila.getCommands();
```

- `@return`: `type: function[]` added command initializers

### `lila.makeConfig`: make project config

```
const config = lila.makeConfig({ entry, argv, cmd });
```

- `@param/options.entry`: `type: string` handling entry
- `@param/options.argv`: `type: {}` wrapped `process.argv`
- `@param/options.cmd`: `type: string` command name

### `lila.runTasks`: run tasks

```
lila.runTasks({ entries, argv, cmd }, success, error);
```

- `@param/options.entry`: `type: string` handling entry
- `@param/options.argv`: `type: {}` wrapped `process.argv`
- `@param/options.cmd`: `type: string` command name
- `@param/success`: `type: function` success callback, `() => { ... }`
- `@param/error`: `type: function` error callback, `err => { ... }`

### `lila.addCmdOption`: add option for command

```
lila.addCmdOption(name, ...option);

// example
lila.addCmdOption('run', '-e, --env', 'specify server environment');
```

- `name`: command name
- `option`: see [commander.js#command-specific-options](https://github.com/tj/commander.js#command-specific-options)

### `lila.getCmdOptions`: get options for command

```
const options = lila.getCmdOptions(name);

// example
options.forEach(option => {
  command.option(...option);
});
```

- `name`: command name

### `lila.makeArgv`: make a wrapped `process.argv`

```
import commander from 'commander';
import lila from 'lila-core';

const = {makeArgv} = lila;

commander
  .command('build [entries...]')
  .description('pack source codes to production bundles')
  .option('-e, --env [env]', 'Specify server enviroment.')
  .action((entries, options) => {

    // make a wrapped `process.argv`
    const argv = makeArgv(options, keepUnknown);
  });
```

- `@param/keepUnknown`: `type: bool` `default: false` whether to keep unknown args which stored by the key `_`, see [minimist](https://github.com/substack/minimist)

### `lila.log`:

```
lila.log(...args)            =>   console.log(...args)
lila.log(color, ...args)     =>   console.log(...chalk.color(args))
lila.log(false, ...args)     =>   console.log(...args)
```

See [chalk](https://github.com/chalk/chalk).

### `lila.info`:

```
lila.info(...args)           =>   console.info(...chalk.blueBright(args))
lila.info(color, ...args)    =>   console.info(...chalk.color(args))
lila.info(false, ...args)    =>   console.info(...args)
```

See [chalk](https://github.com/chalk/chalk).

### `lila.warn`:

```
lila.warn(...args)           =>   console.warn(...chalk.yellowBright(args))
lila.warn(color, ...args)    =>   console.warn(...chalk.color(args))
lila.warn(false, ...args)    =>   console.warn(...args)
```

See [chalk](https://github.com/chalk/chalk).

### `lila.error`:

```
lila.error(...args)          =>   console.error(...chalk.redBright(args))
lila.error(color, ...args)   =>   console.error(...chalk.color(args))
lila.error(false, ...args)   =>   console.error(...args)
```

See [chalk](https://github.com/chalk/chalk).

### `lila.success`:

```
lila.success(...args)        =>   console.log(...chalk.greenBright(args))
lila.success(color, ...args) =>   console.log(...chalk.color(args))
lila.success(false, ...args) =>   console.log(...args)
```

See [chalk](https://github.com/chalk/chalk).

## built-in settings

- `src`: `type: string` `default: src` source directory name.
- `dev`: `type: string` `default: dev` development directory name.
- `build`: `type: string` `default: build` build directory name.
- `tmp`: `type: string` `default: .lila` tmp directory of project.
- `root`: `type: string` `default: process.cwd()` `read only` root directory, and you can customize it by `--root` through command line.

Extended settings:

#### `beforeTasks`: before run tasks

```
({entries, argv, cmd, lila, gulp}) => { ... }
```

- `entries`: `type: []` all entries
- `argv`: `type: {}` wrapped `process.argv`
- `cmd`: `type: string` command name
- `lila`: `type: {}` `lila-core` reference
- `gulp`: `type: {}` [gulp#4](https://github.com/gulpjs/gulp/tree/4.0) reference

#### `afterTasks`: after run tasks

```
({entries, argv, cmd, lila, gulp}) => { ... }
```

#### `errorTasks`: error occurred when run tasks

```
({entries, argv, cmd, lila, gulp, error}) => { ... }
```

- `error`: error object

## built-in commands

### `run`: run tasks

```
lila run entry1 entry2 entry3 ...
```

If `entry` is not provided, `@lila/index` will be used as default.

## extended command line options

- `--root`: custom root path
- `--init`: custom init file, default `lila.js`

## node packages

- [gulp](https://github.com/gulpjs/gulp): 4.x
