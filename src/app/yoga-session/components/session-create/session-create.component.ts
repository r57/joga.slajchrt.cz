import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { DateTime } from "luxon";

import { YogaSessionFormValue } from "../session-admin-form/session-admin-form.component";
import * as YogaSessionActions from "../../store/yoga-session.actions";
import { RemoteConfigService } from "src/app/firebase/remoteconfig.service";

@Component({
  selector: "app-session-create",
  templateUrl: "./session-create.component.html",
  styleUrls: ["./session-create.component.scss"],
})
export class SessionCreateComponent {
  yogaSession: YogaSessionFormValue;

  constructor(private store: Store, configService: RemoteConfigService) {
    const config = configService.configSnapshot;

    this.yogaSession = {
      capacity: config.defaultSessionCapacity,
      date: DateTime.now().set({ hour: 18 }).startOf("hour"),
      lockHoursBefore: config.defaultSessionLockTime,
      place: config.sessionPlaces[0] ? config.sessionPlaces[0] : "",
      note: null
    };
  }

  onSessionFormSubmit(value: YogaSessionFormValue) {
    const { capacity, date, lockHoursBefore, place, note } = value;
    this.store.dispatch(
      YogaSessionActions.createYogaSession({
        capacity,
        date,
        lockHoursBefore,
        place,
        note,
      })
    );
  }
}
