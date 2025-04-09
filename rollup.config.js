import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default [{
  input: 'src/beyond-submission.tsx',
  output: {
    file: 'dist/beyond-submission.js',
    inlineDynamicImports: true,
    format: 'system',
    sourcemap: true,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',

    }
  },
  external: [
    'react',
    'react-dom',
    '@beyond/layout',
    'stream',
    'util',
  ],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      browser: true, // Ensure browser-compatible versions are used
      preferBuiltins: false // Prefer browser-compatible versions over Node built-ins
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
      'use client': '',
      global: 'globalThis',
      'process.browser': true,
      'Buffer.isBuffer': 'false'
    }),
    commonjs({
      // Ensure proper handling of CommonJS modules
      transformMixedEsModules: true,
      // Add browser-compatible versions of Node.js built-ins
      include: /node_modules/
    }),
    typescript({
      tsconfig: './tsconfig.app.json',
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist']
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    postcss({
      config: {
        path: './postcss.config.js'
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top'
      }
    })
  ]
},
  {
    input: 'src/beyond-submission-menus.ts',
    output: {
      file: 'dist/beyond-submission-menus.js',
      format: 'system'
    },
    plugins: [
      nodeResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
        'use client': ''
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.app.json',
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist']
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
    ],
    external: [
      '@beyond/storage'
    ]
  },
];