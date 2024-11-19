module.exports = {
    rootDir: '../../',
    testEnvironment: 'node',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/_app/$1',
        '@base/(.*)': '<rootDir>/src/_base/$1',
        '@shared/(.*)': '<rootDir>/src/_shared/$1',
        '@modules/(.*)': '<rootDir>/src/_modules/$1',
        '@src/(.*)': '<rootDir>/src/$1'
    }
};
