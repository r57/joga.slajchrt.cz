import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { DateTime } from "luxon";

import { YogaSessionFormValue } from "../session-admin-form/session-admin-form.component";
import * as YogaSessionActions from "../../store/yoga-session.actions";

@Component({
  selector: "app-session-create",
  templateUrl: "./session-create.component.html",
  styleUrls: ["./session-create.component.scss"],
})
export class SessionCreateComponent {
  yogaSession: YogaSessionFormValue = {
    capacity: 16,
    date: DateTime.now().set({ hour: 18 }).startOf("hour"),
    lockHoursBefore: 24,
    place: "Tělocvična ZŠ Píšť",
  };

  constructor(private store: Store) {}

  onSessionFormSubmit(value: YogaSessionFormValue) {
    const { capacity, date, lockHoursBefore, place } = value;
    this.store.dispatch(
      YogaSessionActions.createYogaSession({
        capacity,
        date,
        lockHoursBefore,
        place,
      })
    );
  }
}
