// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handle CSS imports (if you're not using CSS modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx,ts,tsx}', // Often just exports
    '!src/app/**', // Typically layouts, pages - tested via E2E
    '!src/context/**', // Context providers might need more specific integration tests
    '!src/utlils/firebaseConfig.js', // External services
    '!src/utlils/rootURL.js', // Constants
    // Add other exclusions as needed
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

// Create __mocks__/fileMock.js for handling static assets
// In __mocks__/fileMock.js:
// module.exports = 'test-file-stub';
