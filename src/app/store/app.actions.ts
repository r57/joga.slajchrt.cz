import { createAction, props } from '@ngrx/store';

export const loadAuth = createAction(
  '[App] Load auth'
);

export const authChange = createAction(
  '[App] Auth change',
  props<{ user: string | null }>(),
);

