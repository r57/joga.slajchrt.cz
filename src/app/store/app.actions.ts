import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";

export const loadAuth = createAction("[Auth] Load auth");

export const {
  loadConfig,
  loadConfigSuccess,
  loadConfigFailure
} = createActionGroup({
  source: "Config",
  events: {
    "Load config": emptyProps(),
    "Load config success": emptyProps(),
    "Load config failure": props<{ message: string }>(),
  }
});

export const signOut = createAction("[Auth] Sign out");

export const authChange = createAction(
  "[App] Auth change",
  props<{ email: string | null; phone: string | null }>()
);
