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
    format: 'system',
    sourcemap: true,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'single-spa-react': 'singleSpaReact',
      '@radix-ui/react-icons': 'RadixUIReactIcons',
      '@radix-ui/react-slot': 'RadixUIReactSlot'
    }
  },
  external: [
    'react',
    'react-dom',
    'single-spa-react',
    '@radix-ui/react-icons',
    '@radix-ui/react-slot',
    /^@radix-ui\/.*/,
    'date-fns',
    'papaparse',
    '@tanstack/react-table'
  ],
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