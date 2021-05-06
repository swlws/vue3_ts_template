import { IState } from "./state";

function updateToken(state: IState) {
  return (token: string) => {
    state.access_token = token;
  };
}

function updateUser(state: IState) {
  return (user: any) => {
    state.user = user;
  };
}

/**
 * 创建Action
 * @param state
 */
export function createAction(state: IState) {
  return {
    updateToken: updateToken(state),
    updateUser: updateUser(state),
  };
}
