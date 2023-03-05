import { createReducer, on } from "@ngrx/store";

import { YogaSession, YogaSessionAttendee } from "../yoga-session.model";
import * as YogaSessionActions from "./yoga-session.actions";

export const eventFeatureKey = "event";

export interface State {
  loading: boolean;
  sessions: YogaSession[];
  attendees: YogaSessionAttendee[];
}

export const initialState: State = {
  loading: false,
  sessions: [],
  attendees: [],
};

export const reducer = createReducer(
  initialState,

  on(YogaSessionActions.loadYogaSessions, (state) => ({
    ...state,
    loading: true,
  })),

  on(YogaSessionActions.loadYogaSessionsSuccess, (state, action) => ({
    ...state,
    loading: false,
    sessions: action.sessions,
  })),

  on(YogaSessionActions.loadYogaSessionAttendeesSuccess, (state, action) => ({
    ...state,
    attendees: action.attendees,
  }))
);

export { YogaSession };
