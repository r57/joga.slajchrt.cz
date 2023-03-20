import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, combineLatest, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

import { YogaSession, YogaSessionAttendee } from "../../yoga-session.model";
import * as YogaSessionSelectors from "../../store/yoga-session.selectors";
import * as YogaSessionActions from "../../store/yoga-session.actions";
import { YogaSessionFormValue as YogaSessionFormValue } from "../session-admin-form/session-admin-form.component";

@Component({
  selector: "app-session-admin",
  templateUrl: "./session-admin.component.html",
  styleUrls: ["./session-admin.component.scss"],
})
export class SessionAdminComponent {
  yogaSession$: Observable<YogaSession | undefined>;
  yogaSessionAttendees$: Observable<YogaSessionAttendee[]>;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute) {
    this.yogaSession$ = combineLatest([
      store.select(YogaSessionSelectors.selectYogaSessions),
      route.paramMap,
    ]).pipe(
      map(([yogaSessions, params]) =>
        yogaSessions.find((s) => s.id === params.get("id"))
      )
    );

    this.yogaSessionAttendees$ = store.select(
      YogaSessionSelectors.selectYogaSessionAttendees
    );

    this.yogaSession$
      .pipe(
        takeUntil(this.destroyed$),
        filter((yogaSession) => yogaSession !== undefined)
      )
      .subscribe((yogaSession) => {
        this.store.dispatch(
          YogaSessionActions.loadYogaSessionAttendees({
            sessionId: yogaSession!.id,
          })
        );
      });
  }

  onSessionFormSubmit(formValue: YogaSessionFormValue) {
    const { capacity, date, lockHoursBefore, place, note } = formValue;
    const sessionId = this.route.snapshot.paramMap.get("id")!;
    this.store.dispatch(
      YogaSessionActions.updateYogaSession({
        sessionId,
        capacity,
        date,
        lockHoursBefore,
        place,
        note
      })
    );
  }

  onAttendeeRemove(attendee: YogaSessionAttendee) {
    if (confirm(`Odstranit rezervaci ${attendee.name}?`)) {
      this.store.dispatch(
        YogaSessionActions.removeYogaSessionAttendee({
          sessionId: attendee.sessionId, 
          attendeeId: attendee.id,
        })
      );
    }
  }
}
