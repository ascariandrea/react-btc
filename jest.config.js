/** @type import('jest').Config */
module.exports = {
  displayName: "react-btc",
  rootDir: "./",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: __dirname + "/tsconfig.json",
        isolatesModules: true,
      },
    ],
  },
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules"],
  testMatch: [
    "**/__tests__/**/?(*.)+(spec|test|e2e).[tj]s?(x)",
    "**/?(*.)+(spec|test|e2e).[tj]s?(x)",
  ],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts?(x)"],
  coveragePathIgnorePatterns: ["<rootDir>/src/theme"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};
