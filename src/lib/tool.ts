import { FreeObject } from "@/types/app";
import {
  camelize,
  capitalize,
  extend,
  hasOwn,
  isArray,
  isObject,
  isString,
  looseEqual,
} from "@vue/shared";

export {
  hasOwn,
  isObject,
  isArray,
  isString,
  capitalize,
  camelize,
  looseEqual,
  extend,
};

export function dateFormat(
  date: Date | number | string,
  fmt = "yyyy-MM-dd hh:mm:ss"
): string {
  if (!date) return "";

  // 将ISO Date格式修改为GMT的时间格式
  // 2021-02-26T04:02:57:677Z
  // 2021-02-26T04:02:57.677Z
  if (typeof date === "string") {
    date = date.replace(/:(.{3}z)$/gi, (str, $1) => {
      return `.${$1}`;
    });
  }

  date = new Date(date);

  const o: FreeObject = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
