import path from "path";
import fs from "fs";
import { createServer } from "http";
import serveStatic from "serve-static";
import { Plugin } from "vite";

import { DEFAULT_OPTIONS } from "./config";
import { CreateProductionServerOptions, ServeArgument } from "./types";

const getDefiniteOptions = (
  options?: CreateProductionServerOptions
): Required<CreateProductionServerOptions> => {
  return {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };
};

const cleanClientConsole = () => process.stdout.write("\x1Bc");

const hasArgument = (): boolean => {
  const standardArgument: ServeArgument = "--serve";
  const shortArgument: ServeArgument = "-s";
  const includesArgument =
    process.argv.includes(standardArgument) ||
    process.argv.includes(shortArgument);

  process.argv = process.argv.filter(
    (value) => value !== standardArgument && value !== shortArgument
  );

  return includesArgument;
};

export function createProductionServerPlugin(
  options?: CreateProductionServerOptions
): Plugin {
  const { buildDirectory, entryPoint, port } = getDefiniteOptions(options);

  return {
    name: "vite-plugin-create-production-server",
    apply: "build" as const,
    closeBundle() {
      if (!hasArgument()) return;

      const server = createServer((req, res) => {
        const serve = serveStatic(buildDirectory, {
          index: [entryPoint],
        });

        serve(req, res, () => {
          const file = path.join(buildDirectory, entryPoint);

          if (fs.existsSync(file)) {
            fs.createReadStream(file).pipe(res);
          } else {
            res.statusCode = 404;
            res.end("Not Found");
          }
        });
      });

      server.listen(port, () => {
        cleanClientConsole();

        console.info(
          `Production server is running at http://localhost:${port}`
        );
      });
    },
  };
}

export default createProductionServerPlugin;
