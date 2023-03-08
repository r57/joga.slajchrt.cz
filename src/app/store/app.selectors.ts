import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectAdmin = createSelector(selectAppState, state => state.admin);

export const selectAttendeePhone = createSelector(selectAppState, state => state.attendeePhone);

export const selectLoading = createSelector(selectAppState, state => state.loading);