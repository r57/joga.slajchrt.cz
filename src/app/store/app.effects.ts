import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { map, switchMap } from 'rxjs/operators';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {

  loadAuth$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(AppActions.loadAuth),
      switchMap(() => this.auth.authState),
      map(authState => AppActions.authChange({ user: authState ? authState.email! : null }))
    );
  });

  constructor(private actions$: Actions, private auth: AngularFireAuth) {
  }
}