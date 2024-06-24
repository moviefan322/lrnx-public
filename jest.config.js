module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "@gradio/client": "<rootDir>/__mocks__/@gradio.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    useAppDispatch: "<rootDir>/__mocks__/reduxHooks.js",
    "\\.(wav)$": "raw-loader",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
