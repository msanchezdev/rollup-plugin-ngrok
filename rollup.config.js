import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default function ({ watch }) {
  /** @type {import('rollup').InputPluginOption} */
  const plugins = [resolve(), commonjs(), typescript()];

  /** @type {import('rollup').RollupOptions */
  const options = {
    input: 'src/index.ts',
    external: ['ngrok'],
    output: {
      file: 'lib/index.js',
      format: 'esm',
    },
    plugins,
  };

  return options;
}
