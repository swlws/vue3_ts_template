import { PlainObject } from "./app";

/**
 * 数据表格
 */
export declare namespace DataGrid {
  interface Column {
    label: string;
    prop: string;
    formatter?: (row: PlainObject, index: number, value: any) => any;
  }
}
