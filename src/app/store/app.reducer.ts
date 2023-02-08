import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export const appFeatureKey = 'app';

export interface State {
  user: string | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,

  on(AppActions.loadAuth, state => state),

  on(AppActions.authChange, (state, action) => ({ ...state, user: action.user }))

);
