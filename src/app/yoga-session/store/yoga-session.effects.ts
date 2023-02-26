import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Timestamp } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DateTime } from "luxon";
import { of } from "rxjs";

import { switchMap, map, catchError, concatMap, tap } from "rxjs/operators";
import * as YogaSessionActions from "./yoga-session.actions";
import { YogaSession } from "./yoga-session.reducer";

const YogaSessionCollection = "yogaSessions";
const YogaSessionAttendeeCollection = "yogaSessionAttendees";

interface FirestoreYogaSession {
  attendees: number;
  capacity: number;
  date: Timestamp;
  lockHoursBefore: number;
}

interface FirestoreYogaSessionAttendee {
  sessionId: string;
  name: string;
  phone: string;
}

@Injectable()
export class YogaSessionEffects {
  loadEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.loadYogaSessions),
      switchMap(() =>
        this.angularFirestore
          .collection<FirestoreYogaSession>(YogaSessionCollection)
          .valueChanges({ idField: "id" })
      ),
      map((firestoreSessions) => {
        const sessions = firestoreSessions.map<YogaSession>(
          (firestoreSession) => ({
            id: firestoreSession.id,
            attendees: firestoreSession.attendees,
            capacity: firestoreSession.capacity,
            date: DateTime.fromJSDate(firestoreSession.date.toDate()).startOf(
              "day"
            ),
            lockHoursBefore: firestoreSession.lockHoursBefore,
          })
        ).sort((a, b) => a.date.toUnixInteger() - b.date.toUnixInteger());

        return YogaSessionActions.loadYogaSessionsSuccess({ sessions });
      }),
      catchError((err) => {
        console.error(err);
        return of(
          YogaSessionActions.loadYogaSessionsFailure({
            message: "Nepodařilo se načíst termíny",
          })
        );
      })
    );
  });

  attendYogaSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.attendYogaSession),
      concatMap((action) => {
        return this.angularFirestore.firestore.runTransaction(
          async (transaction) => {
            const sessionPath = `${YogaSessionCollection}/${action.sessionId}`;
            const sessionRef = this.angularFirestore.firestore.doc(sessionPath);
            const sessionDoc = await sessionRef.get();
            if (sessionDoc.exists) {
              const firestoreSession =
                sessionDoc.data() as FirestoreYogaSession;

              if (firestoreSession.attendees >= firestoreSession.capacity) {
                return YogaSessionActions.attendYogaSessionFailure({
                  message: "Termín je již plný",
                });
              } else {
                transaction.update(sessionRef, {
                  attendees: firestoreSession.attendees + 1,
                });

                const attendeePath = `${YogaSessionAttendeeCollection}/${this.angularFirestore.createId()}`;
                const attendeeRef =
                  this.angularFirestore.firestore.doc(attendeePath);
                const attendeeData: FirestoreYogaSessionAttendee = {
                  sessionId: action.sessionId,
                  name: action.name,
                  phone: action.phone,
                };
                transaction.set(attendeeRef, attendeeData);
                return YogaSessionActions.attendYogaSessionSuccess({ sessionId: action.sessionId });
              }
            } else {
              return YogaSessionActions.attendYogaSessionFailure({
                message: "Termín neexistuje",
              });
            }
          }
        );
      }),
      catchError((err) => {
        console.error(err);
        return of(
          YogaSessionActions.attendYogaSessionFailure({
            message: "Rezervace se nezdařila",
          })
        );
      })
    );
  });

  attendYogaSessionSuccessRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.attendYogaSessionSuccess),
      tap((action) => this.router.navigate(['terminy', action.sessionId, 'rezervace', 'rezervovano'])),
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) {}
}

