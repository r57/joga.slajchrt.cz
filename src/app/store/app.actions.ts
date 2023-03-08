import { createAction, props } from "@ngrx/store";

export const loadAuth = createAction("[Auth] Load auth");

export const signOut = createAction("[Auth] Sign out");

export const authChange = createAction(
  "[App] Auth change",
  props<{ email: string | null; phone: string | null }>()
);
