const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],

  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
