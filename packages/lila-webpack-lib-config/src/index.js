import start from './start';
import build from './build';
import { makeGetEntries } from './settings';

export default lila => {
  const { setSetting, getSettings } = lila;
  const [packages = !1] = getSettings(['packages']);

  setSetting('webpackConfigGenerator', webpack => ({ entry, cmd, config }) => {
    let webpackConfig = {};

    if (cmd === 'start')
      webpackConfig = start(lila, webpack, { entry, cmd, config });
    if (cmd === 'build')
      webpackConfig = build(lila, webpack, { entry, cmd, config });

    const { rules = [], plugins = [] } = config;

    if (rules.length && webpackConfig.module && webpackConfig.module.rules)
      webpackConfig.module.rules.push(...rules);
    if (plugins.length && webpackConfig.plugins)
      webpackConfig.plugins.push(...plugins);

    return webpackConfig;
  });

  setSetting('getEntries', makeGetEntries(packages));
};
