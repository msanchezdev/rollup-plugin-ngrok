import path from 'node:path';
import pico from 'picocolors';
import ngrk, { Ngrok } from 'ngrok';
import { Plugin } from 'rollup';

interface NgrokPluginOptions extends Ngrok.Options {}

export default async function ngrok(
  options: NgrokPluginOptions = {},
): Promise<Plugin> {
  let url = '';
  try {
    url = await ngrk.connect({
      binPath: () => path.resolve('./node_modules/.bin'),
      addr: 10001,
      ...options,
      onStatusChange(status) {
        console.log(`${pico.bold(pico.green('Tunnel Status'))} -> ${status}`);
      },
      onTerminated() {
        console.log(
          `${pico.bold(pico.green('Tunnel Status'))} -> ${pico.red(
            'terminated',
          )}`,
        );
      },
    });
    console.log(`${pico.bold(pico.green('Public URL'))} -> ${url}`);
  } catch (err) {}

  function killNgrok() {
    ngrk.kill();
  }

  process.on('SIGINT', killNgrok);
  process.on('SIGTERM', killNgrok);
  process.on('exit', killNgrok);

  return {
    name: 'ngrok-plugin',
    generateBundle() {
      console.log(`${pico.bold(pico.green('Public URL'))} -> ${url}`);
    },
  };
}
