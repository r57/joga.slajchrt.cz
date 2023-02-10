import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { YogaSession } from './store/yoga-session.reducer';
import * as YogaSessionSelectors from './store/yoga-session.selectors';
import { DateTime, Duration } from 'luxon';

type SessionState = 'available'

@Component({
  selector: 'app-events',
  templateUrl: './yoga-session.component.html',
  styleUrls: ['./yoga-session.component.scss']
})
export class YogaSessionComponent {

  $yogaSessions: Observable<YogaSession[]>;
  $yogaSessionsLoading: Observable<boolean>;
  
  constructor(store: Store) {
    this.$yogaSessions = store.select(YogaSessionSelectors.selectYogaSessions);
    this.$yogaSessionsLoading = store.select(YogaSessionSelectors.selectYogaSessionsLoading);
  }

  isReservationDisabled(yogaSession: YogaSession): boolean {
    return this.isSessionAtCapacity(yogaSession) || this.isSessionAfterLockout(yogaSession);
  }

  isSessionAtCapacity(yogaSession: YogaSession): boolean {
    return yogaSession.attendees >= yogaSession.capacity;
  }

  isSessionAfterLockout(yogaSession: YogaSession): boolean {
    const lockoutTime = yogaSession.date.startOf('day').minus({ hours: yogaSession.lockHoursBefore });
    return DateTime.now() > lockoutTime;
  }

  formatDate(date: DateTime): string {
    return date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  }

}
