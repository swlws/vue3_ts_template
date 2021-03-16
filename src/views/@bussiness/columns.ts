import { dateFormat } from "@/lib/tool";
import { FreeObject } from "@/types/app";

export const COLUMNS_PROJECT_ISSUE_USER = [
  { prop: "pname", label: "项目" },
  { prop: "summary", label: "问题" },
  { prop: "lower_user_name", label: "用户" },
  {
    prop: "timeworked",
    label: "工作时长",
    formatter: (row: FreeObject, index: number, value: any) => {
      return Number(value).toFixed(2);
    },
  },
  { prop: "worklogbody", label: "日志" },
  {
    prop: "created",
    label: "记录时间",
    formatter: (row: FreeObject, index: number, value: any) => {
      return dateFormat(value);
    },
  },
];

export const COLUMNS_USER_PROJECT_ISSUE = [
  { prop: "lower_user_name", label: "用户" },
  { prop: "pname", label: "项目" },
  { prop: "summary", label: "问题" },
  {
    prop: "timeworked",
    label: "工作时长",
    formatter: (row: FreeObject, index: number, value: any) => {
      return Number(value).toFixed(2);
    },
  },
  { prop: "worklogbody", label: "日志" },
  {
    prop: "created",
    label: "记录时间",
    formatter: (row: FreeObject, index: number, value: any) => {
      return dateFormat(value);
    },
  },
];
