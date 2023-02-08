import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectLoggedIn = createSelector(selectAppState, state => state.user === null);