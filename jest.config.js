module.exports = {
	preset: 'jest-expo',
	moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	testMatch: ['**/*.test.ts?(x)'],
	setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.ts',
	roots: ['<rootDir>/src'],
	modulePathIgnorePatterns: ['<rootDir>/.jest'],
	collectCoverageFrom: ['src/**/*.{ts|tsx}', 'src/setupTests.ts'],
	cacheDirectory: '<rootDir>/.jest',
	testEnvironment: 'node',
}
