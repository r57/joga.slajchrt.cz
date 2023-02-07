import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DateTime } from 'luxon';
import { EMPTY } from 'rxjs';

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as EventActions from './yoga-session.actions';
import { YogaSession } from './yoga-session.reducer';

interface FirestoreYogaSession {
  date: Timestamp;
  attendees: {
    name: string;
  }[];
}

@Injectable()
export class YogaSessionEffects {

  loadEvents$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(EventActions.loadYogaSessions),
      switchMap(() => this.firestore.collection<FirestoreYogaSession>('yogaSessions').valueChanges()),
      tap(firestoreSessions => console.log(firestoreSessions)),
      map(firestoreSessions => {
        const sessions = firestoreSessions.map<YogaSession>(firestoreSession => ({
          date: DateTime.fromJSDate(firestoreSession.date.toDate()).startOf('day'),
          attendees: firestoreSession.attendees,
        }));

        return EventActions.loadYogaSessionsSuccess({ sessions });
      }),
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    );
  });

  constructor(private actions$: Actions, private firestore: AngularFirestore) {}
}
