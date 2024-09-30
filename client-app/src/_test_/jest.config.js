module.exports = {
    preset: 'react',
    moduleFileExtensions: ['js', 'jsx', 'json'],
    moduleNameMapper: {
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], 
  };