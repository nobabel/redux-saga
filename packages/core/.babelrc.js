const { NODE_ENV, BABEL_ENV, NOBABEL } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'
const prod = NODE_ENV === 'production'
const nobabel = NOBABEL === 'true'

module.exports = {
  presets: [
    '@babel/react',
    ...nobabel ? [] : [
      [
        '@babel/env',
        {
          loose: true,
          modules: false,
          exclude: ['transform-typeof-symbol'],
          forceAllTransforms: true,
        },
      ],
      '@babel/stage-2',
    ],
  ],
  plugins: [
    cjs && '@babel/transform-modules-commonjs',
    nobabel && '@babel/plugin-syntax-object-rest-spread',
    'annotate-pure-calls'
  ].filter(Boolean),
}
