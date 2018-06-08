
const cloneDeep = require('lodash/cloneDeep');
const defaults = require('lodash/defaults');

// Default value.
const defaultValue = {
    e: 'env', // Environment.
    l: 'local', // Local name
    o: 'out' // Whether use out resolve alias.
};

/**
 * Command argument alias.
 *
 * And this should only be defined in `lila.config.js`
 *
 * @param config
 */
module.exports = config => {

    config.cmdAlias = !config.cmdAlias ? cloneDeep(defaultValue) : defaults(config.cmdAlias, cloneDeep(defaultValue));
};