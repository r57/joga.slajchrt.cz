import {
  createAction,
  props,
  createActionGroup,
  emptyProps,
} from "@ngrx/store";
import { DateTime } from "luxon";

import { YogaSessionAttendee } from "../yoga-session.model";
import { YogaSession } from "./yoga-session.reducer";

export const {
  loadYogaSessions,
  loadYogaSessionsFailure,
  loadYogaSessionsSuccess,
} = createActionGroup({
  source: "LoadYogaSession",
  events: {
    "Load yoga sessions": emptyProps(),
    "Load yoga sessions success": props<{ sessions: YogaSession[] }>(),
    "Load yoga sessions failure": props<{ message: string }>(),
  },
});

export const {
  attendYogaSession,
  attendYogaSessionFailure,
  attendYogaSessionSuccess,
} = createActionGroup({
  source: "AttendYogaSession",
  events: {
    "Attend yoga session": props<{
      name: string;
      phone: string;
      sessionId: string;
    }>(),
    "Attend yoga session success": props<{ sessionId: string }>(),
    "Attend yoga session failure": props<{ message: string }>(),
  },
});

export const {
  loadYogaSessionAttendees,
  loadYogaSessionAttendeesSuccess,
  loadYogaSessionAttendeesFailure,
} = createActionGroup({
  source: "LoadYogaSessionAttendees",
  events: {
    "Load yoga session attendees": props<{ sessionId: string }>(),
    "Load yoga session attendees success": props<{
      attendees: YogaSessionAttendee[];
    }>(),
    "Load yoga session attendees failure": props<{ message: string }>(),
  },
});

export const {
  updateYogaSession,
  updateYogaSessionFailure,
  updateYogaSessionSuccess,
} = createActionGroup({
  source: "UpdateYogaSession",
  events: {
    "Update yoga session": props<{
      capacity: number;
      date: DateTime;
      lockHoursBefore: number;
      place: string;
      sessionId: string;
    }>(),
    "Update yoga session success": emptyProps,
    "Update yoga session failure": props<{ message: string }>(),
  },
});

export const {
  removeYogaSessionAttendee,
  removeYogaSessionAttendeeFailure,
  removeYogaSessionAttendeeSuccess,
} = createActionGroup({
  source: "RemoveYogaSessionAttendee",
  events: {
    "Remove yoga session attendee": props<{
      sessionId: string;
      attendeeId: string;
    }>(),
    "Remove yoga session attendee success": emptyProps(),
    "Remove yoga session attendee failure": props<{ message: string }>(),
  },
});

export const {
  createYogaSession,
  createYogaSessionFailure,
  createYogaSessionSuccess,
} = createActionGroup({
  source: "CreateYogaSession",
  events: {
    "Create yoga session": props<{
      capacity: number;
      date: DateTime;
      lockHoursBefore: number;
      place: string;
    }>(),
    "Create yoga session success": emptyProps,
    "Create yoga session failure": props<{ message: string }>(),
  },
});

export const {
  loadOwnYogaAttendance,
  loadOwnYogaAttendanceFailure,
  loadOwnYogaAttendanceSuccess,
} = createActionGroup({
  source: "LoadOwnYogaSessions",
  events: {
    "Load own yoga attendance": props<{ phone: string }>(),
    "Load own yoga attendance success": props<{
      attendees: YogaSessionAttendee[];
    }>(),
    "Load own yoga attendance failure": props<{ message: string }>(),
  },
});
