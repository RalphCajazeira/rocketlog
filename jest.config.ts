import type { Config } from "jest";

const config: Config = {
  bail: true,
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  roots: ["<rootDir>/src"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
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
};

export default config;
