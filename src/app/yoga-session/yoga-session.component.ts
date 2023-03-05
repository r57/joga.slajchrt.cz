import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DateTime } from "luxon";

import * as YogaSessionSelectors from "./store/yoga-session.selectors";
import * as AppSelectors from "../store/app.selectors";

import {
  YogaSession,
  isSessionAfterLockout,
  isSessionAtCapacity,
} from "./yoga-session.model";

@Component({
  selector: "app-events",
  templateUrl: "./yoga-session.component.html",
  styleUrls: ["./yoga-session.component.scss"],
})
export class YogaSessionComponent {

  $loggedIn: Observable<boolean>;
  $yogaSessions: Observable<YogaSession[]>;
  $yogaSessionsLoading: Observable<boolean>;

  constructor(store: Store) {
    this.$loggedIn = store.select(AppSelectors.selectLoggedIn);
    this.$yogaSessions = store.select(YogaSessionSelectors.selectYogaSessions);
    this.$yogaSessionsLoading = store.select(
      YogaSessionSelectors.selectYogaSessionsLoading
    );
  }

  isReservationDisabled(yogaSession: YogaSession): boolean {
    return (
      isSessionAtCapacity(yogaSession) || isSessionAfterLockout(yogaSession)
    );
  }

  formatDate(date: DateTime): string {
    return date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  }
}
