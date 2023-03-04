import path from "path";
import type * as webpack from "webpack";
import { defineEnv } from "./webpack/config";
import {
  getWebConfig,
} from "./webpack/web.config";

const AppEnv = defineEnv((t) => ({
  NODE_ENV: t.string,
  PUBLIC_URL: t.string,
  DEBUG: t.string,
}));

const webConfig: webpack.Configuration = getWebConfig({
  cwd: __dirname,
  env: AppEnv,
  envFileDir: __dirname, 
  devServer: true,
  hot: false,
  target: "web",
  entry: {
    app: path.resolve(__dirname, "src/index.tsx"),
  },
  publicDir: path.resolve(__dirname, './public'),
  tsConfigFile:
    process.env.NODE_ENV === "production"
      ? "tsconfig.build.json"
      : "tsconfig.json",
});

export default webConfig;
