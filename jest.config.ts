import type { Config } from "jest";

const config: Config = {
  bail: true, // para nos testes após o primeiro erro
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"], // garante que só a pasta src é monitorada
  testMatch: ["**/tests/**/*.test.ts"], // procura apenas dentro de src/tests
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/build/",
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/build/",
    "<rootDir>/coverage/",
    "<rootDir>/.cache/",
    "<rootDir>/tmp/",
    "<rootDir>/.eslintcache",
    "<rootDir>/.tsbuildinfo",
  ],
  // cacheDirectory: "<rootDir>/.cache/jest", // cache previsível
};

export default config;
