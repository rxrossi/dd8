module.exports = {
  preset: "ts-jest",
  setupTestFrameworkScriptFile: "./node_modules/jest-enzyme/lib/index.js",
  setupFiles: ["<rootDir>/test-shim.js", "<rootDir>/test-setup.js"],
  moduleNameMapper: {
    "^entity/(.*)$": "<rootDir>/src/entity/$1",
    "^app/(.*)$": "<rootDir>/src/$1",
    "^testUtils/(.*)$": "<rootDir>/testUtils/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/__tests__/*.(ts|tsx|js)", "**/*.test.(ts|tsx|js)"]
}
