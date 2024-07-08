const { createConfig } = require('@alipay/bigfish-library/test');

module.exports = {
  ...createConfig({
    target: 'browser',
    jsTransformer: 'esbuild',
    // config opts for esbuild , it will pass to esbuild directly
    jsTransformerOpts: { jsx: 'automatic' },
  }),

  collectCoverageFrom: ['src/**/*.{ts,js,tsx,jsx}'],
  // if you require some es-module npm package, please uncomment below line and insert your package name
  // transformIgnorePatterns: ['node_modules/(?!.*(lodash-es|your-es-pkg-name)/)']
}
