import { DateTime } from "luxon";

export interface YogaSession {
  id: string;
  attendees: number;
  capacity: number,
  date: DateTime;
  place: string;
  lockHoursBefore: number;
}

export interface YogaSessionAttendee {
  id: string;
  name: string;
  phone: string;
  sessionId: string;
}

export interface YogaSessionReservation {
  attendee: YogaSessionAttendee;
  session: YogaSession;
}

export function isSessionAfterLockout(yogaSession: YogaSession): boolean {
  const lockoutTime = yogaSession.date.minus({ hours: yogaSession.lockHoursBefore });
  return !isSessionHistory(yogaSession) && DateTime.now() > lockoutTime;
}

export function isSessionAtCapacity(yogaSession: YogaSession): boolean {
  return yogaSession.attendees >= yogaSession.capacity;
}

export function isSessionHistory(yogaSession: YogaSession): boolean {
  return DateTime.now() > yogaSession.date;
}