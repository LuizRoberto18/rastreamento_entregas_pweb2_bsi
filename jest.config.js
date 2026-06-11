export default {
    transform: {}, // Necessário se não estiver usando Babel para ESM puro
    testEnvironment: "node",
    verbose: true,
    setupFiles: ["<rootDir>/tests/setup.env.js"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    coverageDirectory: "coverage",
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