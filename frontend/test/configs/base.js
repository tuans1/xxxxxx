const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './'
});

const baseConfig = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    rootDir: '../../',
    testRegex: '.spec.tsx?$',
    transform: {
        '^.+\\.(t|j)x?s$': 'ts-jest'
    },
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'jsx'],
    moduleNameMapper: {
        '@shared/(.*)': '<rootDir>/src/_shared/$1',
        '@modules/(.*)': '<rootDir>/src/modules/$1',
        '@src/(.*)': '<rootDir>/src/$1'
    }
};

module.exports = {
    baseConfig,
    createJestConfig
};
