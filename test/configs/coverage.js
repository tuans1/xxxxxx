/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./base');

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/test/unit'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.(t|j)s',
        '!<rootDir>/src/**/index.ts',
        '!<rootDir>/src/**/*.module.ts',
        '!<rootDir>/src/**/migrations/*.(t|j)s',
        '!<rootDir>/src/main.ts',
        '!<rootDir>/src/infras/proto/**/*.(t|j)s'
    ]
};
