import { PlainObject } from "@/typings/app";
import myAxios from "./http";

type ApiModule = {
  [K: string]: {
    [K: string]: {
      url: string;
      method: string;
    };
  };
};

function collectApis(): ApiModule {
  const apis: ApiModule = {};

  const requireComponent = require.context("./modules", false, /(.*)\.ts$/);
  requireComponent.keys().forEach((fileName: string) => {
    const matchModuleName: any[] = fileName.match(/^\.\/(.*)\.ts$/) || [];
    const moduleName = matchModuleName[1];
    if (!moduleName) return;

    const componentConfig = requireComponent(fileName);
    const defaultExport = componentConfig.default;
    if (!defaultExport) return;

    apis[moduleName] = defaultExport;
  });

  return apis;
}

type ApiFunc = {
  [k: string]: {
    [k: string]: () => Promise<unknown>;
  };
};
function parseApi(apiConfig: ApiModule): ApiFunc {
  if (!apiConfig) return {};

  const apis: ApiFunc = {};
  Object.keys(apiConfig).forEach((moduleName) => {
    apis[moduleName] = {};

    const module: PlainObject = (apiConfig as PlainObject)[moduleName] || {};
    Object.keys(module).forEach((funcName) => {
      const { url } = module[funcName];
      let { method } = module[funcName];

      method = method.toLowerCase();

      const httpMethod = (myAxios as PlainObject)[method];

      if (httpMethod) {
        apis[moduleName][funcName] = httpMethod.bind(null, url);
      }
    });
  });

  return apis;
}

const apis = parseApi(collectApis());

export default apis;
