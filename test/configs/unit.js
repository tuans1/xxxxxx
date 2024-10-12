/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./base');

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/test/unit']
};
