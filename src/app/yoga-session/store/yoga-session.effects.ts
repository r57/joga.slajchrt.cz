import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { of } from "rxjs";
import {
  switchMap,
  map,
  catchError,
  concatMap,
  tap,
  takeUntil,
} from "rxjs/operators";
import { NzMessageService } from "ng-zorro-antd/message";
import {
  FirestoreService,
  AttendYogaSessionError,
  UpdateYogaSessionError,
} from "src/app/firebase/firestore.service";

import * as YogaSessionActions from "./yoga-session.actions";
import * as AppActions from "../../store/app.actions";

@Injectable()
export class YogaSessionEffects {
  loadSessions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.loadYogaSessions),
      switchMap(({ showPast: includePast }) => this.firestoreService.getYogaSessions(includePast)),
      map((sessions) =>
        YogaSessionActions.loadYogaSessionsSuccess({ sessions })
      ),
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

  loadSessionAttendees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.loadYogaSessionAttendees),
      switchMap((action) =>
        this.firestoreService.getYogaSessionAttendees(action.sessionId)
      ),
      map((attendees) =>
        YogaSessionActions.loadYogaSessionAttendeesSuccess({ attendees })
      ),
      catchError((err) => {
        console.error(err);
        return of(
          YogaSessionActions.loadYogaSessionAttendeesFailure({
            message: "Nepodařilo se načíst rezervace",
          })
        );
      })
    );
  });

  attendYogaSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.attendYogaSession),
      concatMap(async ({ sessionId, name, phone }) => {
        await this.firestoreService.attendYogaSession(sessionId, name, phone);
        return YogaSessionActions.attendYogaSessionSuccess({
          sessionId: sessionId,
        });
      }),
      catchError((error) => {
        if (error instanceof AttendYogaSessionError) {
          return of(
            YogaSessionActions.attendYogaSessionFailure({
              message: error.message,
            })
          );
        } else {
          console.error(error);
          return of(
            YogaSessionActions.attendYogaSessionFailure({
              message: "Rezervace se nezdařila",
            })
          );
        }
      })
    );
  });

  attendYogaSessionSuccessRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(YogaSessionActions.attendYogaSessionSuccess),
        tap((action) =>
          this.router.navigate([
            "terminy",
            action.sessionId,
            "rezervace",
            "rezervovano",
          ])
        )
      );
    },
    { dispatch: false }
  );

  updateYogaSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.updateYogaSession),
      switchMap(
        async ({ sessionId, capacity, date, lockHoursBefore, place, note }) => {
          await this.firestoreService.updateYogaSession(
            sessionId,
            capacity,
            date,
            lockHoursBefore,
            place,
            note,
          );
          return YogaSessionActions.updateYogaSessionSuccess();
        }
      ),
      catchError((error) => {
        if (error instanceof UpdateYogaSessionError) {
          return of(
            YogaSessionActions.updateYogaSessionFailure({
              message: error.message,
            })
          );
        } else {
          console.error(error);
          return of(
            YogaSessionActions.updateYogaSessionFailure({
              message: "Rezervace se nezdařila",
            })
          );
        }
      })
    );
  });

  updateYogaSessionSuccessNotify$ = this.notificationEffectCreator(
    YogaSessionActions.updateYogaSessionSuccess,
    "success",
    "Termín uložen"
  );

  removeYogaSessionAttendee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.removeYogaSessionAttendee),
      concatMap(async ({ sessionId, attendeeId }) => {
        await this.firestoreService.removeYogaSessionAttendee(
          sessionId,
          attendeeId
        );
        return YogaSessionActions.removeYogaSessionAttendeeSuccess();
      }),
      catchError((error) => {
        console.error(error);
        return of(
          YogaSessionActions.removeYogaSessionAttendeeFailure({
            message: "Zrušení rezervace se nezdařilo",
          })
        );
      })
    );
  });

  removeYogaSessionAttendeeSuccessNotify$ = this.notificationEffectCreator(
    YogaSessionActions.removeYogaSessionAttendeeSuccess,
    "success",
    "Rezervace zrušena"
  );

  createYogaSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(YogaSessionActions.createYogaSession),
      concatMap(async ({ capacity, date, lockHoursBefore, place, note }) => {
        await this.firestoreService.createYogaSession(
          capacity,
          date,
          lockHoursBefore,
          place,
          note,
        );
        return YogaSessionActions.createYogaSessionSuccess();
      }),
      catchError((error) => {
        console.error(error);
        return of(
          YogaSessionActions.createYogaSessionFailure({
            message: "Vytvoření termínu se nezdařilo",
          })
        );
      })
    );
  });

  createYogaSessionSuccessNotify$ = this.notificationEffectCreator(
    YogaSessionActions.createYogaSessionSuccess,
    "success",
    `Termín byl vytvořen`
  );

  createYogaSessionSuccessRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(YogaSessionActions.createYogaSessionSuccess),
        tap(() => this.router.navigate(["terminy"]))
      );
    },
    { dispatch: false }
  );

  getOwnYogaSessions$ = createEffect(() => {
    const signOuts$ = this.actions$.pipe(ofType(AppActions.signOut));

    return this.actions$.pipe(
      ofType(YogaSessionActions.loadOwnYogaAttendance),
      switchMap((action) =>
        this.firestoreService
          .getAttendeesByPhone(action.phone)
          .pipe(takeUntil(signOuts$))
      ),
      map((attendees) =>
        YogaSessionActions.loadOwnYogaAttendanceSuccess({ attendees })
      ),
      catchError((err) => {
        console.error(err);
        return of(
          YogaSessionActions.loadOwnYogaAttendanceFailure({
            message: "Nepodařilo se načíst vaše rezervace",
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private firestoreService: FirestoreService,
    private messageService: NzMessageService
  ) {}

  private notificationEffectCreator(
    action: Action,
    kind: "success" | "failure",
    message: string | ((action: Action) => string)
  ) {
    return createEffect(
      () => {
        return this.actions$.pipe(
          ofType(action.type),
          tap((action) => {
            const resolvedMessage =
              typeof message === "string" ? message : message(action);

            switch (kind) {
              case "success":
                this.messageService.success(resolvedMessage);
                break;
              case "failure":
                this.messageService.error(resolvedMessage);
                break;
            }
          })
        );
      },
      { dispatch: false }
    );
  }
}
