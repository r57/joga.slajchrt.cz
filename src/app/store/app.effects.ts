import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AngularFireAuth } from "@angular/fire/compat/auth";

import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AppActions from "./app.actions";
import { RemoteConfigService } from "../firebase/remoteconfig.service";
import { of } from "rxjs";

@Injectable()
export class AppEffects {
  loadAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadAuth),
      switchMap(() => this.auth.authState),
      map((authState) =>
        AppActions.authChange({
          email: authState?.email || null,
          phone: authState?.phoneNumber || null,
        })
      )
    );
  });

  loadConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadConfig),
      switchMap(() => this.configService.fetchConfig()),
      map(() => AppActions.loadConfigSuccess()),
      catchError((error) => {
        console.log(error);
        return of(AppActions.loadConfigFailure({ message: "Chyba při načítání konfigurace" }));
      })
    );
  });

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppActions.signOut),
        tap(() => this.auth.signOut())
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private configService: RemoteConfigService
  ) {}
}
