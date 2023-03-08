import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEvent from './yoga-session.reducer';

export const selectYogaSessionsState = createFeatureSelector<fromEvent.State>(
  fromEvent.eventFeatureKey
);

export const selectYogaSessions = createSelector(selectYogaSessionsState, s => s.sessions);

export const selectYogaSession = (id: string) => createSelector(selectYogaSessions, (sessions) => sessions.find(s => s.id === id))

export const selectYogaSessionsLoading = createSelector(selectYogaSessionsState, s => s.sessionsLoading);

export const selectYogaSessionAttendees = createSelector(selectYogaSessionsState, s => s.attendees);

export const selectYogaSessionAttendeesLoading = createSelector(selectYogaSessionsState, s => s.attendeesLoading);

export const selectAnyLoading = createSelector(selectYogaSessionsState, s => s.sessionsLoading || s.attendeesLoading);