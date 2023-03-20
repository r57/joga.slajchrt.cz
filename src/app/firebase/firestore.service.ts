import { Injectable } from "@angular/core";
import { AngularFirestore, QueryFn } from "@angular/fire/compat/firestore";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  Transaction,
} from "@angular/fire/firestore";
import { DateTime } from "luxon";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  YogaSession,
  YogaSessionAttendee,
} from "../yoga-session/yoga-session.model";
import { sanitizePhone } from "../utils";

interface FirestoreYogaSession {
  attendees: number;
  capacity: number;
  date: Timestamp;
  lockHoursBefore: number;
  place: string;
  note: string | null;
}

interface FirestoreYogaSessionAttendee {
  sessionId: string;
  name: string;
  phone: string;
}

const YogaSessionCollection = "yogaSessions";
const YogaSessionAttendeeCollection = "yogaSessionAttendees";

export class YogaSessionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AttendYogaSessionError extends YogaSessionError {
  constructor(message: string) {
    super(message);
  }
}

export class UpdateYogaSessionError extends YogaSessionError {
  constructor(message: string) {
    super(message);
  }
}

@Injectable()
export class FirestoreService {
  constructor(private angularFirestore: AngularFirestore) {}

  attendYogaSession(
    sessionId: string,
    name: string,
    phone: string
  ): Promise<void> {
    return this.angularFirestore.firestore.runTransaction(
      async (transaction) => {
        const sessionPath = `${YogaSessionCollection}/${sessionId}`;
        const sessionRef = this.angularFirestore.firestore.doc(sessionPath);
        const sessionDoc = await sessionRef.get();
        if (sessionDoc.exists) {
          const firestoreSession = sessionDoc.data() as FirestoreYogaSession;

          if (firestoreSession.attendees >= firestoreSession.capacity) {
            throw new AttendYogaSessionError("Termín je již plný");
          } else {
            transaction.update(sessionRef, {
              attendees: firestoreSession.attendees + 1,
            });

            const attendeePath = `${YogaSessionAttendeeCollection}/${this.angularFirestore.createId()}`;
            const attendeeRef =
              this.angularFirestore.firestore.doc(attendeePath);
            const attendeeData: FirestoreYogaSessionAttendee = {
              sessionId: sessionId,
              name: name,
              phone: sanitizePhone(phone),
            };
            transaction.set(attendeeRef, attendeeData);
          }
        } else {
          throw new AttendYogaSessionError("Termín neexistuje");
        }
      }
    );
  }

  createYogaSession(
    capacity: number,
    date: DateTime,
    lockHoursBefore: number,
    place: string,
    note: string | null,
  ): Promise<void> {
    const sessionPath = `${YogaSessionCollection}/${this.angularFirestore.createId()}`;
    const sessionRef = this.angularFirestore.firestore.doc(sessionPath);
    const sessionData: FirestoreYogaSession = {
      attendees: 0,
      capacity,
      date: Timestamp.fromDate(date.toJSDate()),
      lockHoursBefore,
      place,
      note
    };

    return sessionRef.set(sessionData);
  }

  getYogaSessions(): Observable<YogaSession[]> {
    return this.angularFirestore
      .collection<FirestoreYogaSession>(YogaSessionCollection, (ref) =>
        ref.orderBy("date", "asc")
      )
      .valueChanges({ idField: "id" })
      .pipe(
        map((firestoreSessions) => {
          return firestoreSessions.map<YogaSession>((firestoreSession) => ({
            id: firestoreSession.id,
            attendees: firestoreSession.attendees,
            capacity: firestoreSession.capacity,
            date: DateTime.fromJSDate(firestoreSession.date.toDate()),
            place: firestoreSession.place,
            lockHoursBefore: firestoreSession.lockHoursBefore,
            note: firestoreSession.note
          }));
        })
      );
  }

  getYogaSessionAttendees(
    sessionId: string
  ): Observable<YogaSessionAttendee[]> {
    return this.queryYogaSessionAttendees((ref) =>
      ref.where("sessionId", "==", sessionId)
    );
  }

  getAttendeesByPhone(attendeePhone: string): Observable<YogaSessionAttendee[]> {
    return this.queryYogaSessionAttendees((ref) =>
      ref.where("phone", "==", attendeePhone)
    );
  }

  removeYogaSessionAttendee(
    sessionId: string,
    attendeeId: string
  ): Promise<void> {
    return this.runSessionTransaction(
      sessionId,
      async (transaction, sessionRef, sessionSnapshot) => {
        const yogaSession = sessionSnapshot.data() as YogaSession;

        transaction.update(sessionRef, {
          attendees: yogaSession.attendees - 1,
        });

        const attendeePath = `${YogaSessionAttendeeCollection}/${attendeeId}`;
        const attendeeRef = this.angularFirestore.firestore.doc(attendeePath);
        transaction.delete(attendeeRef as any);
      }
    );
  }

  updateYogaSession(
    sessionId: string,
    capacity: number,
    date: DateTime,
    lockHoursBefore: number,
    place: string,
    note: string | null,
  ): Promise<void> {
    return this.runSessionTransaction(
      sessionId,
      async (transaction, sessionRef) => {
        transaction.update(sessionRef, {
          capacity,
          date: Timestamp.fromDate(date.toJSDate()),
          place,
          lockHoursBefore,
          note
        });
      }
    );
  }

  private queryYogaSessionAttendees(
    query: QueryFn
  ): Observable<YogaSessionAttendee[]> {
    return this.angularFirestore
      .collection<FirestoreYogaSessionAttendee>(
        YogaSessionAttendeeCollection,
        query
      )
      .valueChanges({ idField: "id" })
      .pipe(
        map((firestoreAttendees) => {
          return firestoreAttendees.map<YogaSessionAttendee>(
            (firestoreAttendee) => ({
              id: firestoreAttendee.id,
              name: firestoreAttendee.name,
              phone: firestoreAttendee.phone,
              sessionId: firestoreAttendee.sessionId,
            })
          );
        })
      );
  }

  private runSessionTransaction<T>(
    sessionId: string,
    sessionOp: (
      transaction: Transaction,
      sessionRef: DocumentReference<DocumentData>,
      sessionSnapshot: DocumentSnapshot<DocumentData>
    ) => Promise<T>
  ): Promise<T> {
    return this.angularFirestore.firestore.runTransaction(
      async (transaction) => {
        const sessionPath = `${YogaSessionCollection}/${sessionId}`;
        const sessionRef = this.angularFirestore.firestore.doc(sessionPath);
        const sessionDoc = await sessionRef.get();
        if (sessionDoc.exists) {
          return await sessionOp(
            transaction as any,
            sessionRef as any,
            sessionDoc as any
          );
        } else {
          throw new YogaSessionError("Termín neexistuje");
        }
      }
    );
  }
}
