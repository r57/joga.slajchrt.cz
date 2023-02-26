import { createReducer, on } from '@ngrx/store';

import { YogaSession } from '../yoga-session.model';
import * as yogaSessionActions from './yoga-session.actions';

export const eventFeatureKey = 'event';

export interface State {
  loading: boolean;
  sessions: YogaSession[];
}

export const initialState: State = {
  loading: false,
  sessions: [],
};

export const reducer = createReducer(
  initialState,

  on(yogaSessionActions.loadYogaSessions, state => ({ ...state, loading: true })),

  on(yogaSessionActions.loadYogaSessionsSuccess, (state, action) => ({ ...state, loading: false, sessions: action.sessions }))

);

export { YogaSession };
