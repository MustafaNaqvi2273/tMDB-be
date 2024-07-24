module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
