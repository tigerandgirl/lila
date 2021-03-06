# lila-rollup-config

Config generator for lila rollup plugin.

## install

```
npm install --save-dev lila-rollup-config
```

## use

In `lila.js`:

```
import rollupConfigPlugin from 'lila-rollup-config';

export default lila => {
  rollupConfigPlugin(lila);

  ...
};
```

## extended settings

### `rollupConfigGenerator`: see [rollupConfigGenerator](./src/index.js#L8)

### `getEntries`: see [makeGetEntries](./src/settings.js#L8)

`all, *` means all entries under `src`(`packages` if is packages mode) directory.

### `packages`: whether use packages mode

`type: bool/string` `default: false`

If you want packages mode(see [lerna](https://github.com/lerna/lerna)), you can configure `lila.setSetting('packages', true)`.

If so, building structure will be as follows:

```
|-- / root
    |-- packages/ packages directory
        |-- pkg1/ package 1
            |-- src/
            |-- build/
        |-- pkg2/ package 2
            |-- src/
            |-- build/
```

If you want to customize packages' directory, , you can configure `lila.setSetting('packages', 'yourCustomDirectory')`.

## extended configs

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

`type: []/{}` `default: []`

`example:`

```
{ "libraryName": "antd" }
=>
["import", { "libraryName": "antd" }]


[[{ "libraryName": "antd"}, "ant"]]
=>
["import", { "libraryName": "antd"}, "ant"],


[{ "libraryName": "antd"}, { "libraryName": "antd-mobile"}]
=>
["import", { "libraryName": "antd"}]
["import", { "libraryName": "antd-mobile"}]


[
  [{ "libraryName": "antd"}, "ant"],
  [{ "libraryName": "antd-mobile"}, "antd-mobile"]
]
=>
["import", { "libraryName": "antd"}, "ant"]
["import", { "libraryName": "antd-mobile"}, "antd-mobile"]
```

### `babelComponent`: [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component) config

`type: []/{}` `default: []`

`example:`

```
{ "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }
=>
["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]


[[{ "libraryName": "element-ui" }, "element-ui"]]
=>
["component", { "libraryName": "element-ui"}, "element-ui"],


[{ "libraryName": "element-ui"}, { "libraryName": "test-module"}]
=>
["component", { "libraryName": "element-ui"}]
["component", { "libraryName": "test-module"}]


[
  [{ "libraryName": "element-ui"}, "element-ui"],
  [{ "libraryName": "test-module"}, "test-module"]
]
=>
["component", { "libraryName": "element-ui"}, "element-ui"]
["component", { "libraryName": "test-module"}, "test-module"]
```

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude

`type: []` `default: [/node_modules/]`

### `babelPresets`: extra babel presets

`type: []` `default: []`

### `babelPlugins`: extra babel plugins

`type: []` `default: []`

### `banner`: [rollup](https://rollupjs.org/guide/en) output banner

`type: string` `default: empty string`

### `alias`: [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias) config

`type: {}` `default: {}`

### `inject`: [rollup-plugin-inject](https://github.com/rollup/rollup-plugin-inject) config

`type: {}`

`default:`

```
{
  include: ['**/*.js', '**/*.jsx'],
  exclude: 'node_modules/**',
}
```

### `flow`: whether to use [flow](https://github.com/facebook/flow)

`type: bool` `default: false`

### `flowRuntime`: whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

`type: bool` `default: false`

### `minJs`: whether minify js

`type: bool` `default: true`

### `minCss`: whether minify css

`type: bool` `default: true`

### `filename`: library file name

`type: string` `default: empty string`

### `name`: [rollup](https://rollupjs.org/guide/en) output name

`type: string` `default: Index`

### `exterbal`: rollup `external` config

`type: *`

### `globals`: rollup `globals` config

`type: {}`

### `plugins`: extra rollup plugins

`type: []` `default: []`

## files of an entry

A entry has a standalone directory, also called workspace.

### for `build` command

For `build` command, an entry has at least a `index.js` file.

If `entry` is not provided, `@lila/index` will be used as default.

If entry is `@lila/index`, its workspace is `src`:

```
|-- src/
    |-- index.js

    |-- other files and directories
```

Others(entry is `main`), its workspace is `src/main`:

```
|-- src/
    |-- main/
        |-- index.js

        |-- other files and directories
```

### for `start` command

For `start` command, an entry has at least a `index.html` file and a `index.js` file.

If entry is `example`, its workspace is `example`:

```
|-- src/
|-- example/
    |-- index.html
    |-- index.js

    |-- other files and directories
```
