import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { PlainObject } from "@/typings/app";

import adapter from "./adapter";

/**
 * 创建axios的实例
 *
 * @returns
 */
function createInstance() {
  const config: AxiosRequestConfig = {
    baseURL: "",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    responseType: "json",
  };

  const USE_MOCK = process.env.VUE_APP_USE_MOCK;
  if (USE_MOCK) {
    config.adapter = adapter;
  }

  return axios.create(config);
}

let instance: AxiosInstance | null = null;

export function getInstance() {
  if (instance !== null) {
    return instance;
  }

  instance = createInstance();
  return instance;
}

function errorHandle(error: Error) {
  return Promise.reject(error);
}

/**
 * 预处理AxiosRequestConfig
 * 处理rest API，将API中的参数替换为实际值
 *
 * @param config
 * @returns
 */
function preHandleConfig(config: AxiosRequestConfig) {
  const { url = "", params = {}, data = {}, method } = config;

  const tmpParams = { ...params, ...data };

  config.url = url.replace(/:([^/]+)/g, (sub, $0) => {
    const v = tmpParams[$0] || "";
    Reflect.deleteProperty(tmpParams, $0);
    return v;
  });

  if (method === "get") {
    config.params = { ...tmpParams };
    config.data = {};
  } else {
    config.params = {};
    config.data = { ...tmpParams };
  }

  return config;
}
getInstance().interceptors.request.use(preHandleConfig, errorHandle);

/**
 * 预处理AxiosResponse
 *
 * @param response
 * @returns
 */
function preHandleResponse(response: AxiosResponse) {
  const {
    config: { responseType },
  } = response;

  if (responseType === "json") return response.data;

  return response;
}
getInstance().interceptors.response.use(preHandleResponse, errorHandle);

export function post(
  url: string,
  data?: PlainObject,
  config?: AxiosRequestConfig
) {
  return getInstance().post(url, data, config);
}

export function del(
  url: string,
  data?: PlainObject,
  config?: AxiosRequestConfig
) {
  return getInstance().delete(url, { data, ...config });
}

export function put(
  url: string,
  data?: PlainObject,
  config?: AxiosRequestConfig
) {
  return getInstance().put(url, data, config);
}

export function get(
  url: string,
  params?: PlainObject,
  config?: AxiosRequestConfig
) {
  return getInstance().get(url, { params, ...config });
}

export function blob(
  url: string,
  params?: PlainObject,
  config?: AxiosRequestConfig
) {
  return getInstance().get(url, { params, ...config, responseType: "blob" });
}

export default {
  getInstance,
  post,
  put,
  delete: del,
  get,
  blob,
};
