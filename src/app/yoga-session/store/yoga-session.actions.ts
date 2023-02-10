import { createAction, props } from '@ngrx/store';
import { YogaSession } from './yoga-session.reducer';

export const loadYogaSessions = createAction(
  '[YogaSession] Load yoga sessions'
);

export const loadYogaSessionsSuccess = createAction(
  '[YogaSession] Load yoga sessions success',
  props<{ sessions: YogaSession[] }>()
);

export const attendYogaSession = createAction(
  '[YogaSession] Attend yoga session',
  props<{ name: string; phone: string; sessionId: string }>()
);

export const attendYogaSessionSuccess = createAction(
  '[YogaSession] Attend yoga session success',
);

export const attendYogaSessionFailure = createAction(
  '[YogaSession] Attend yoga session failure',
  props<{ message: string }>()
);