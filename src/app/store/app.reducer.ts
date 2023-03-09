import { Action, createReducer, on } from "@ngrx/store";
import * as AppActions from "./app.actions";

export const appFeatureKey = "app";

export interface State {
  authLoading: boolean;
  configLoading: boolean;
  admin: boolean;
  attendeePhone: string | null;
}

export const initialState: State = {
  authLoading: true,
  configLoading: true,
  admin: false,
  attendeePhone: null,
};

export const reducer = createReducer(
  initialState,

  on(AppActions.authChange, (state, action) => {
    return {
      ...state,
      authLoading: false,
      admin: !!action.email && action.email.endsWith("@slajchrt.cz"),
      attendeePhone: action.phone,
    };
  }),

  on(AppActions.loadConfigSuccess, (state) => ({
    ...state,
    configLoading: false,
  }))
);
