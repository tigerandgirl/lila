
const basePaths = require('./base_paths');
const buildPaths = require('./build_paths');

const cmdAlias = require('./cmd_alias');
const envAlias = require('./env_alias');
const cmdValues = require('./cmd_values');

const localOptions = require('./local_options');
const customConfig = require('./custom_config');
const envOptions = require('./env_options');
const commandOptions = require('./command_options');

const fill = require('./fill');

const processing = require('./processing');
const moduleGroup = require('./module_group');
const module = require('./module');
const html = require('./html');
const directoriesToSync = require('./directories_to_sync');
const servers = require('./servers');
const webpack = require('./webpack');

/**
 * Format import config to a new one which lila needed.
 *
 * @param config
 */
module.exports = config => {
    // paths
    basePaths(config);
    buildPaths(config);

    // cmd
    cmdAlias(config);
    envAlias(config);
    // Here only pre load some required arguments.
    cmdValues(config, !0);

    // Options to override config root attribute.
    localOptions(config);
    customConfig(config);
    envOptions(config);
    commandOptions(config);
    cmdValues(config);

    // Fill default value to config.
    fill(config);

    // More handling.
    processing(config);
    moduleGroup(config);
    module(config);
    html(config);
    directoriesToSync(config);
    servers(config);
    webpack(config);

    return config;
};
