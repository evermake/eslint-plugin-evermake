import { version } from '../package.json'
import noEmptyLinesInFunction from './rules/no-empty-lines-in-function.js'

export * from './jsonc-sort.js'

/** @type {import('eslint').ESLint.Plugin} */
export default {
  meta: {
    name: 'evermake',
    version,
  },
  rules: {
    'no-empty-lines-in-function': noEmptyLinesInFunction,
  },
}
