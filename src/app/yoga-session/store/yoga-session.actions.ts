import { createAction, props } from '@ngrx/store';
import { YogaSession } from './yoga-session.reducer';

export const loadYogaSessions = createAction(
  '[Event] Load yoga sessions'
);

export const loadYogaSessionsSuccess = createAction(
  '[Event] Load yoga sessions success',
  props<{ sessions: YogaSession[] }>()
)
