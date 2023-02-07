import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from './yoga-session.reducer';

export const selectEventState = createFeatureSelector<fromEvent.State>(
  fromEvent.eventFeatureKey
);
