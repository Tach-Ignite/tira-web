import type { Config } from 'jest';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: [path.resolve('../../.env.secrets.local')],
});

dotenv.config({
  path: [path.resolve('../../.env.local')],
});

const jestConfig: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@prisma_/(.*)$': '<rootDir>/prisma/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@src/(.*)$': '<rootDir>/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  collectCoverage: true,
};
export default jestConfig;
