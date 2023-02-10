import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from './yoga-session.reducer';

export const selectYogaSessionsState = createFeatureSelector<fromEvent.State>(
  fromEvent.eventFeatureKey
);

export const selectYogaSessions = createSelector(selectYogaSessionsState, s => s.sessions);

export const selectYogaSessionsLoading = createSelector(selectYogaSessionsState, s => s.loading);