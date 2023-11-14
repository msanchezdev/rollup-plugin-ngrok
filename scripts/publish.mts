import { $, fs } from 'zx';
import packageJson from '../package.json';

console.log(`Publishing ${packageJson.name} v${packageJson.version}...`);
await $`npm run build; cp README.md lib/`;

const packageJsonDist = structuredClone(packageJson) as Partial<
  typeof packageJson
>;
delete packageJsonDist.devDependencies;
delete packageJsonDist.scripts;
packageJsonDist.main = 'index.js';
packageJsonDist.types = 'index.d.ts';

fs.writeFileSync('lib/package.json', JSON.stringify(packageJsonDist, null, 2));

await $`cd lib/; npm publish`;
