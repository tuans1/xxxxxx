const { baseConfig, createJestConfig } = require('./base');

const configs = {
    ...baseConfig,
    roots: ['<rootDir>/test/unit']
};

module.exports = createJestConfig(configs);
