module.exports = {
    resetMocks: true,
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/file-mock.ts',
      '\\.scss$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
  };
  