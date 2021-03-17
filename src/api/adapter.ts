// ***************************
//  利用adapter实现mock测试
// ***************************

import { AxiosRequestConfig, AxiosResponse, AxiosAdapter } from "axios";

function settle(
  resolve: (value: any) => void,
  reject: (value: any) => void,
  response: AxiosResponse<any>
) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new Error("Request failed with status code " + response.status));
  }
}

// `adapter` 允许自定义处理请求，以使测试更轻松
// 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
const adapter: AxiosAdapter | undefined = (config: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    const request: XMLHttpRequest = new XMLHttpRequest();

    const response: AxiosResponse<any> = {
      data: { name: 90000000 },
      status: request.status,
      statusText: request.statusText,
      headers: {},
      config: config,
      request: request,
    };

    settle(resolve, reject, response);
  });
};

export default adapter;
