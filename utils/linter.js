const { ESLint } = require('eslint');

module.exports = {
  lintFiles: async (pattern) => {
    const linter = new ESLint({ fix: true });
    const results = await linter.lintFiles([pattern]);
    return ESLint.outputFixes(results);
  },
};
