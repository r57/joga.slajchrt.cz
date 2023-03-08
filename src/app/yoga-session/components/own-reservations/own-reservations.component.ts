import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";

import * as AppActions from "../../../store/app.actions";
import * as AppSelectors from "../../../store/app.selectors";
import * as YogaSessionSelectors from "../../store/yoga-session.selectors";
import * as YogaSessionActions from "../../store/yoga-session.actions";
import { YogaSessionReservation } from "../../yoga-session.model";
import { dateFormatMedium } from "src/app/utils";
import { PhoneAuthService } from "src/app/firebase/phoneauth.service";

@Component({
  selector: "app-own-reservations",
  templateUrl: "./own-reservations.component.html",
  styleUrls: ["./own-reservations.component.scss"],
})
export class OwnReservationsComponent implements OnDestroy {
  loading$: Observable<boolean>;
  attendeePhone$: Observable<string | null>;
  attendeeLoggedIn$: Observable<boolean>;
  attendeeReservations$: Observable<YogaSessionReservation[]>;

  private destroyed: Subject<void> = new Subject();

  constructor(
    private store: Store
  ) {
    this.attendeePhone$ = this.store
      .select(AppSelectors.selectAttendeePhone)
      .pipe(filter((phone) => phone !== null));

    this.attendeeLoggedIn$ = this.store
      .select(AppSelectors.selectAttendeePhone)
      .pipe(map((phone) => phone !== null));

    this.attendeeReservations$ = combineLatest([
      this.store.select(YogaSessionSelectors.selectYogaSessionAttendees),
      this.store.select(YogaSessionSelectors.selectYogaSessions),
    ]).pipe(
      map(([yogaSessionAttendees, yogaSessions]) => {
        return yogaSessionAttendees
          .reduce<YogaSessionReservation[]>((reservations, attendee) => {
            const session = yogaSessions.find(
              (session) => session.id === attendee.sessionId
            );
            if (session) {
              return [
                ...reservations,
                {
                  session,
                  attendee,
                },
              ];
            } else {
              return reservations;
            }
          }, [])
          .sort((a, b) => a.session.date.valueOf() - b.session.date.valueOf());
      })
    );

    this.loading$ = combineLatest([
      this.store.select(AppSelectors.selectLoading),
      this.store.select(YogaSessionSelectors.selectAnyLoading),
    ]).pipe(
      map(([appLoading, sessionsLoading]) => appLoading || sessionsLoading)
    );

    // TODO move to effects?
    this.store
      .select(AppSelectors.selectAttendeePhone)
      .pipe(takeUntil(this.destroyed))
      .subscribe((attendeePhone) => {
        if (attendeePhone) {
          this.store.dispatch(
            YogaSessionActions.loadOwnYogaAttendance({ phone: attendeePhone })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }

  onAttendeeRemove(reservation: YogaSessionReservation) {
    const dateStr = dateFormatMedium(reservation.session.date);

    if (confirm(`Zrušit rezervaci na ${dateStr}?`)) {
      this.store.dispatch(
        YogaSessionActions.removeYogaSessionAttendee({
          sessionId: reservation.session.id,
          attendeeId: reservation.attendee.id,
        })
      );
    }
  }

  onDifferentNumberClick() {
    this.store.dispatch(AppActions.signOut());
  }
}
