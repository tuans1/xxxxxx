module.exports = {
    rootDir: '../../',
    testEnvironment: 'node',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1'
    }
};
