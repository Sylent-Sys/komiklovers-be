import type { JestConfigWithTsJest } from 'ts-jest'
import path from 'path'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '.ts': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: path.join(process.cwd(), 'tsconfig.json'),
      },
    ],
  },
}

export default jestConfig