export default {
    transform: {}, 
    testEnvironment: "node",
    verbose: true,
    setupFiles: ["<rootDir>/tests/setup.env.js"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    coverageDirectory: "coverage",
    testMatch: [
        "**/tests/unit/**/*.test.js",
        "**/tests/integration/**/*.test.js"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/frontend/",
        "/src/frontend/"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/tests/e2e/",               
        "/tests/playwright.config.js"
    ],
    collectCoverageFrom: [
        "src/services/**/*.js",
        "src/middlewares/**/*.js",
        "src/utils/**/*.js"
    ],
    coverageThreshold: {
        global: {
            statements: 75,
            branches: 75,
            functions: 75,
            lines: 75
        },
        "./src/services/": {
            statements: 80
        },
        "./src/middlewares/": {
            statements: 85
        },
        "./src/utils/": {
            statements: 75
        }
    }

};