import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { YogaSession } from '../../store/yoga-session.reducer';
import * as YogaSessionActions from '../../store/yoga-session.actions';
import * as YogaSessionSelectors from '../../store/yoga-session.selectors';
import { nameValidator, phoneValidator } from 'src/app/validators';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {

  yogaSession$: Observable<YogaSession | undefined>;
  yogaSessionLoading$: Observable<boolean>;

  reservationForm = this.fb.group({
    name: ['', [Validators.required, nameValidator]],
    phone: ['', [Validators.required, phoneValidator]],
  });

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {
    this.yogaSession$ = combineLatest([
      store.select(YogaSessionSelectors.selectYogaSessions),
      route.paramMap
    ])
    .pipe(
      map(([yogaSessions, params]) => yogaSessions.find(s => s.id === params.get('id')))
    );

    this.yogaSessionLoading$ = store.select(YogaSessionSelectors.selectYogaSessionsLoading);
  }

  onReservationFormSubmit() {
    const { name, phone } = this.reservationForm.value;
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (this.reservationForm.valid && name && phone && sessionId) {
      this.store.dispatch(YogaSessionActions.attendYogaSession({name, phone, sessionId}));
    }
  }

}
