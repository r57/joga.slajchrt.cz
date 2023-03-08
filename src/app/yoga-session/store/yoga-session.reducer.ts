import { createReducer, on } from "@ngrx/store";

import { YogaSession, YogaSessionAttendee } from "../yoga-session.model";
import * as YogaSessionActions from "./yoga-session.actions";

export const eventFeatureKey = "event";

export interface State {
  sessions: YogaSession[];
  sessionsLoading: boolean;
  attendees: YogaSessionAttendee[];
  attendeesLoading: boolean;
}

export const initialState: State = {
  sessions: [],
  sessionsLoading: false,
  attendees: [],
  attendeesLoading: false,
};

export const reducer = createReducer(
  initialState,

  on(YogaSessionActions.loadYogaSessions, (state) => ({
    ...state,
    sessionsLoading: true,
  })),

  on(YogaSessionActions.loadYogaSessionsSuccess, (state, action) => ({
    ...state,
    sessionsLoading: false,
    sessions: action.sessions,
  })),

  on(YogaSessionActions.loadYogaSessionAttendees, (state) => ({
    ...state,
    attendeesLoading: true,
  })),
  
  on(YogaSessionActions.loadYogaSessionAttendeesSuccess, (state, action) => ({
    ...state,
    attendees: action.attendees,
    attendeesLoading: false,
  })),

  on(YogaSessionActions.loadOwnYogaAttendance, (state) => ({
    ...state,
    attendeesLoading: true,
  })),

  on(YogaSessionActions.loadOwnYogaAttendanceSuccess, (state, action) => ({
    ...state,
    attendees: action.attendees,
    attendeesLoading: false,
  }))
);

export { YogaSession };
