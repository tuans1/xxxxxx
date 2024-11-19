const { baseConfig, createJestConfig } = require('./base');

const configs = {
    ...baseConfig,
    roots: ['<rootDir>/test/unit'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.(t|j)s',
        '!<rootDir>/src/**/index.ts'
    ]
};

module.exports = createJestConfig(configs);
