module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)",
    ],
    testEnvironment: "node",

    "moduleDirectories": [
        "node_modules"
      ],
      moduleNameMapper: {
        '^@api/(.*)$': '<rootDir>/src/api/$1',
        '^@cache/(.*)$': '<rootDir>/src/cache/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@database/(.*)$': '<rootDir>/src/database/$1',
        '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
        '^@service/(.*)$': '<rootDir>/src/service/$1',
        '^@type/(.*)$': '<rootDir>/src/type/$1',
        '^@util/(.*)$': '<rootDir>/src/util/$1',
		"^firebase-admin/app$":
		"<rootDir>/node_modules/firebase-admin/lib/app/index.js",
		"^firebase-admin/auth$":
		"<rootDir>/node_modules/firebase-admin/lib/auth/index.js",
		"^firebase-admin/firestore$":
		"<rootDir>/node_modules/firebase-admin/lib/firestore/index.js"
      }
};