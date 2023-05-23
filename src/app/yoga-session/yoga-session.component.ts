import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DateTime } from "luxon";

import * as YogaSessionSelectors from "./store/yoga-session.selectors";
import * as YogaSessionActions from "./store/yoga-session.actions";
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
  $yogaSessionsEmpty: Observable<boolean>;
  $yogaSessionsShowPast: Observable<boolean>;

  constructor(private store: Store) {
    this.$loggedIn = store.select(AppSelectors.selectAdmin);
    this.$yogaSessions = store.select(YogaSessionSelectors.selectYogaSessions);
    this.$yogaSessionsLoading = store.select(
      YogaSessionSelectors.selectYogaSessionsLoading
    );
    this.$yogaSessionsEmpty = store.select(YogaSessionSelectors.selectYogaSessionsEmpty);
    this.$yogaSessionsShowPast = store.select(YogaSessionSelectors.selectYogaSessionsShowPast)
  }

  isReservationDisabled(yogaSession: YogaSession): boolean {
    return (
      isSessionAtCapacity(yogaSession) || isSessionAfterLockout(yogaSession)
    );
  }

  formatDate(date: DateTime): string {
    return date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  }

  onShowPastClicked(showPast: boolean) {
    this.store.dispatch(YogaSessionActions.loadYogaSessions({ showPast }));
  }

}
