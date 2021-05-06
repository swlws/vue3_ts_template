import { reactive } from "vue";

export interface IState {
  code: string;
  access_token: string;
  user: any;
}

export const State: IState = {
  code: "",
  access_token: "",
  user: {},
};

export function createState() {
  return reactive(State);
}
