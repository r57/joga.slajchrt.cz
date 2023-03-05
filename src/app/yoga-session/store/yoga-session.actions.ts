import { createAction, props } from "@ngrx/store";
import { DateTime } from "luxon";

import { YogaSessionAttendee } from "../yoga-session.model";
import { YogaSession } from "./yoga-session.reducer";

export const loadYogaSessions = createAction(
  "[YogaSession] Load yoga sessions"
);

export const loadYogaSessionsSuccess = createAction(
  "[YogaSession] Load yoga sessions success",
  props<{ sessions: YogaSession[] }>()
);

export const loadYogaSessionsFailure = createAction(
  "[YogaSession] Load yoga sessions failure",
  props<{ message: string }>()
);

export const attendYogaSession = createAction(
  "[YogaSession] Attend yoga session",
  props<{ name: string; phone: string; sessionId: string }>()
);

export const attendYogaSessionSuccess = createAction(
  "[YogaSession] Attend yoga session success",
  props<{ sessionId: string }>()
);

export const attendYogaSessionFailure = createAction(
  "[YogaSession] Attend yoga session failure",
  props<{ message: string }>()
);

export const loadYogaSessionAttendees = createAction(
  "[YogaSession] Load yoga session attendees",
  props<{ sessionId: string }>()
);

export const loadYogaSessionAttendeesSuccess = createAction(
  "[YogaSession] Load yoga session attendees success",
  props<{ attendees: YogaSessionAttendee[] }>()
);

export const loadYogaSessionAttendeesFailure = createAction(
  "[YogaSession] Load yoga session attendees failure",
  props<{ message: string }>()
);

export const updateYogaSession = createAction(
  "[YogaSession] Update yoga session",
  props<{
    capacity: number;
    date: DateTime;
    lockHoursBefore: number;
    place: string;
    sessionId: string;
  }>()
);

export const updateYogaSessionSuccess = createAction(
  "[YogaSession] Update yoga session success"
);

export const updateYogaSessionFailure = createAction(
  "[YogaSession] Update yoga session failure",
  props<{ message: string }>()
);

export const removeYogaSessionAttendee = createAction(
  "[YogaSession] Remove yoga session attendee",
  props<{ sessionId: string, attendeeId: string }>()
);

export const removeYogaSessionAttendeeSuccess = createAction(
  "[YogaSession] Remove yoga session attendee success",
);

export const removeYogaSessionAttendeeFailure = createAction(
  "[YogaSession] Remove yoga session attendee success",
  props<{ message: string }>()
);

export const createYogaSession = createAction(
  "[YogaSession] Create yoga session",
  props<{
    capacity: number;
    date: DateTime;
    lockHoursBefore: number;
    place: string;
  }>()
);

export const createYogaSessionSuccess = createAction(
  "[YogaSession] Create yoga session success"
);

export const createYogaSessionFailure = createAction(
  "[YogaSession] Create yoga session failure",
  props<{ message: string }>()
);