/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'Disallow any empty lines in function bodies.',
    },
    fixable: 'whitespace',
    schema: false,
  },
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        visitFunction(node, context)
      },
      FunctionDeclaration(node) {
        visitFunction(node, context)
      },
    }
  },
}

function visitFunction(node, context) {
  const source = context.getSourceCode()
  const lines = source.getText(node).split('\n')
  const start = node.loc.start.line
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed === '') {
      const num = start + index
      context.report({
        loc: { line: num, column: 0 },
        message: 'Empty lines are not allowed in function body.',
        fix(fixer) {
          const started = source.getIndexFromLoc({
            line: num,
            column: 0,
          })
          const ended = source.getIndexFromLoc({
            line: num + 1,
            column: 0,
          })
          return fixer.removeRange([started, ended])
        },
      })
    }
  })
}
