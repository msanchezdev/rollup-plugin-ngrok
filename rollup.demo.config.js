import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import ngrok from './lib/index';

export default function ({ watch }) {
  /** @type {import('rollup').InputPluginOption} */
  const plugins = [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.demo.json',
    }),
  ];

  if (watch) {
    plugins.push(serve('demo'));
    plugins.push(ngrok());
    plugins.push(livereload());
  }

  /** @type {import('rollup').RollupOptions} */
  const options = {
    input: 'demo/index.ts',
    output: {
      file: 'demo/index.js',
      format: 'iife',
    },
    plugins,
  };

  return options;
}
