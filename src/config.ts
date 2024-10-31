import { CreateProductionServerOptions } from "./types";

const DEFAULT_PORT = 8080;
const DEFAULT_ENTRYPOINT = "index.html";
const DEFAULT_BUILD_DIR = "dist";

export const DEFAULT_OPTIONS: Required<CreateProductionServerOptions> = {
  port: DEFAULT_PORT,
  entryPoint: DEFAULT_ENTRYPOINT,
  buildDirectory: DEFAULT_BUILD_DIR,
};
