import { Action, createReducer, on } from "@ngrx/store";
import * as AppActions from "./app.actions";

export const appFeatureKey = "app";

export interface State {
  loading: boolean;
  admin: boolean;
  attendeePhone: string | null;
}

export const initialState: State = {
  loading: true,
  admin: false,
  attendeePhone: null,
};

export const reducer = createReducer(
  initialState,

  on(AppActions.loadAuth, (state) => state),

  on(AppActions.authChange, (state, action) => {
    return {
      ...state,
      loading: false,
      admin: !!action.email && action.email.endsWith("@slajchrt.cz"),
      attendeePhone: action.phone,
    };
  }),
);
