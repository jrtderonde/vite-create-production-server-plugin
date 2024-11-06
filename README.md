# `vite-create-production-server-plugin`

A Vite plugin to create a production-ready static file server for your built assets. This plugin simplifies serving files directly from the `dist` folder without needing an additional server setup. You can configure the port, entry point, and build directory as needed.

## Installation

To install the plugin, run:

```bash
npm install vite-create-production-server-plugin serve-static --save-dev
```

## Usage

Add the plugin to your `vite.config.ts` (or `vite.config.js`) file:

```typescript
import { defineConfig } from "vite";
import { createProductionServerPlugin } from "vite-create-production-server-plugin";

export default defineConfig({
  plugins: [
    createProductionServerPlugin({
      port: 3000, // Optional, default is 8080
      entryPoint: "index.html", // Optional, default is "index.html"
      buildDirectory: "dist", // Optional, default is "dist"
    }),
  ],
});
```

## Options

The plugin accepts an options object to configure the server:

- `port` (number, optional): Port number on which the server will run. Default is `8080`.
- `entryPoint` (string, optional): The entry HTML file to serve. Default is `"index.html"`.
- `buildDirectory` (string, optional): Directory to serve static files from. Default is `"dist"`.

### Example

```typescript
createProductionServerPlugin({
  port: 5000,
  entryPoint: "main.html",
  buildDirectory: "output",
});
```

## Running the Server

Use the `--serve` or `-s` command-line argument to start the production server after building:

```bash
vite build -- --serve
```

or

```bash
vite build -- -s
```

The server will start on the configured port (`http://localhost:<port>`), and it will automatically clear the console for easier readability. This plugin is perfect for serving static files without the need for a separate server or complex configuration.
