// *******************************
// 拷贝的element-plugin/package/utils/dom.ts
// *******************************

import { PlainObject } from "@/typings/app";
import { camelize, isObject } from "./tool";

const isServer = false;

const trim = function (s: string) {
  return (s || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

export const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

export const off = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

export const once = function (
  el: HTMLElement,
  event: string,
  fn: EventListener
): void {
  const listener = function (...args: unknown[]) {
    if (fn) {
      fn.apply(this, args);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

export const stop = (e: Event) => e.stopPropagation();

export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

// Here I want to use the type CSSStyleDeclaration, but the definition for CSSStyleDeclaration
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = function (
  element: HTMLElement,
  styleName: string
): string | null {
  if (isServer) return null;
  styleName = camelize(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  try {
    const style = (element.style as PlainObject)[styleName];
    if (style) return style;

    if (!document || !document.defaultView) return "";

    const computed = document.defaultView.getComputedStyle(element, "");
    return computed ? (computed as PlainObject)[styleName] : "";
  } catch (e) {
    return (element.style as PlainObject)[styleName];
  }
};

export function setStyle(
  element: HTMLElement,
  styleName: CSSStyleDeclaration | string,
  value?: string
): void {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((prop) => {
      setStyle(element, prop, (styleName as PlainObject)[prop]);
    });
  } else {
    styleName = camelize(styleName);
    (element.style as PlainObject)[styleName] = value;
  }
}

export function removeStyle(
  element: HTMLElement,
  style: CSSStyleDeclaration | string
) {
  if (!element || !style) return;

  if (isObject(style)) {
    Object.keys(style).forEach((prop) => {
      setStyle(element, prop, "");
    });
  } else {
    setStyle(element, style, "");
  }
}

export const isScroll = (
  el: HTMLElement,
  isVertical?: boolean
): RegExpMatchArray | null => {
  if (isServer) return null;
  const determinedDirection = isVertical === null || isVertical === undefined;
  const overflow = determinedDirection
    ? getStyle(el, "overflow")
    : isVertical
    ? getStyle(el, "overflow-y")
    : getStyle(el, "overflow-x");

  return !overflow ? null : overflow.match(/(scroll|auto)/);
};

export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): Window | HTMLElement => {
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, isVertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
};

export const isInContainer = (
  el: HTMLElement,
  container: HTMLElement
): boolean => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect: PlainObject;

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};

export const getOffsetTop = (el: HTMLElement) => {
  let offset = 0;
  let parent = el;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }

  return offset;
};

export const getOffsetTopDistance = (
  el: HTMLElement,
  containerEl: HTMLElement
) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};

/**
 * 在执行元素上触发指定的事件，且可传递自定义事件
 *
 * @param el
 * @param eventType
 * @param detail
 *
 * eg：triggerEvent(document.getElementById('id'), 'click', {name: '123'})
 */
export function triggerEvent(
  el: HTMLElement,
  eventType: string,
  detail: PlainObject
) {
  el.dispatchEvent(new CustomEvent(eventType, { detail }));
}

/**
 * 查找指定具备ClassName的父节点
 */
export function lookupParentNodeByClassName(
  pClassName: string,
  currentTarget: HTMLElement,
  rootNode: HTMLElement
) {
  if (currentTarget === rootNode) {
    return null;
  }

  if (rootNode && !rootNode.contains(currentTarget)) {
    return null;
  }

  let tmp: HTMLElement | null = currentTarget;
  while (tmp !== null && tmp !== rootNode) {
    const classList = tmp.classList;
    if (classList.contains(pClassName)) {
      return tmp;
    }

    tmp = tmp.parentElement;
  }

  return null;
}

export function clickProxy(
  pEl: HTMLElement,
  cb: (target: HTMLElement) => void
) {
  on(pEl, "click", (event) => {
    const target = lookupParentNodeByClassName(
      "item",
      event.target as HTMLElement,
      pEl
    );
    if (!target) return;

    cb(target);
  });
}

/**
 * 是否滚动到底部
 *
 * @param target
 * @returns
 */
export function isScrollBottom(target: HTMLElement) {
  const clientHeight = target.clientHeight;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;

  if (scrollHeight - scrollTop === clientHeight) {
    return true;
  }

  return false;
}

/**
 * 获取浏览器窗口的大小
 */
export function getViewport() {
  if (document.compatMode === "BackCompat") {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }
}

/**
 * 相对于根节点的所有滚动总和
 * @param{domNode} element 起始节点
 */
export function getTotalScrollOffsetRoot(element: any) {
  let width = 0,
    height = 0;

  let pNode = element.parentNode;
  while (pNode !== null && pNode !== document) {
    width += pNode.scrollLeft;
    height += pNode.scrollTop;

    pNode = pNode.parentNode;
  }

  return { width: width, height: height };
}

/**
 * 节点在浏览器窗口中的位置
 * @param{domNode} element 起始节点
 */
export function getElementOffsetRoot(element: any) {
  if (!element) return { left: 0, top: 0 };

  let actualTop = element.offsetTop;
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    actualLeft += current.offsetLeft;

    current = current.offsetParent;
  }

  const scroll = getTotalScrollOffsetRoot(element);
  return {
    top: actualTop - scroll.height,
    left: actualLeft - scroll.width,
  };
}

/**
 * 将字符串拷贝到粘贴板
 * @param str
 * @returns
 */
export function copyToClipboard(str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "readonly");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selection = window.getSelection();

  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  if (!selection) return;

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
}

/**
 * 通过a标签下载文件
 * @param url
 * @returns
 */
export function downFileByUrl(url: string) {
  if (!url) return;

  const fileName = url.slice(url.lastIndexOf("/") + 1, url.length);

  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = url;
  tempLink.setAttribute("download", decodeURI(fileName)); // 兼容：某些浏览器不支持HTML5的download属性

  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

/**
 * 将Blob数据一文件形式下载
 * @param binary 待转换的二进制数据
 * @param filename 待下载的文件名
 * @param type MIME 类型
 */
export function convertRes2Blob(binary: any, filename: string, type: string) {
  // 将二进制流转为blob
  const blob = new Blob([binary], { type });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(filename));
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(filename)); // 兼容：某些浏览器不支持HTML5的download属性

    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}
