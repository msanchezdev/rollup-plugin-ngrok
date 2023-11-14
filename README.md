# rollup-plugin-ngrok

This is a Rollup plugin that starts an ngrok tunnel. It allows you to expose your local development server to the internet.

## Installation

Install the plugin with npm:

```bash
npm install --save-dev rollup-plugin-ngrok
```

## Usage

Add the plugin to your rollup config:

```javascript
import ngrok from 'rollup-plugin-ngrok';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    ngrok({
      addr: 8080, // your local development server port
      // other ngrok options...
    }),
  ],
};
```

When you run your rollup build, it will start an ngrok tunnel and print the public URL to the console.

## API

The `ngrokPlugin` function takes an options object. The options are the same as the [ngrok connect options](https://www.npmjs.com/package/ngrok#options).

## License

MIT
