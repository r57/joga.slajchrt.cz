import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

import { NEVER, Observable } from "rxjs";
import { map, startWith, switchMap, tap } from "rxjs/operators";

import * as YogaSessionActions from "./yoga-session/store/yoga-session.actions";
import * as AppActions from "./store/app.actions";
import * as AppSelectors from "./store/app.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  loggedIn$: Observable<boolean>;
  title$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private auth: AngularFireAuth,
    router: Router,
    route: ActivatedRoute,
  ) {
    this.loggedIn$ = store.select(AppSelectors.selectAdmin);

    store.dispatch(YogaSessionActions.loadYogaSessions({ showPast: false }));
    store.dispatch(AppActions.loadAuth());
    store.dispatch(AppActions.loadConfig());

    this.loading$ = this.store.select(AppSelectors.selectLoading);

    this.title$ = router.events.pipe(
      startWith(null), // force first title update
      switchMap(() => route.firstChild ? route.firstChild.title : NEVER),
      map(maybeTitle => maybeTitle ? maybeTitle : ""),
    );
  }

  onLogin() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  onLogout() {
    this.store.dispatch(AppActions.signOut());
  }
}
