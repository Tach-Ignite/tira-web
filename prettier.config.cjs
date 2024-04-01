module.exports = {
  plugins: ['prettier-plugin-packagejson'],
  printWidth: 120,
  // sort-imports
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^~/(.*)$',
    '^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
};
