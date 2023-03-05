import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

import { NEVER, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

import * as YogaSessionActions from "./yoga-session/store/yoga-session.actions";
import * as AppActions from "./store/app.actions";
import * as AppSelectors from "./store/app.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  $loggedIn: Observable<boolean>;
  title$: Observable<string>;

  constructor(
    store: Store,
    private auth: AngularFireAuth,
    router: Router,
    route: ActivatedRoute,
  ) {
    this.$loggedIn = store.select(AppSelectors.selectLoggedIn);

    store.dispatch(YogaSessionActions.loadYogaSessions());
    store.dispatch(AppActions.loadAuth());

    this.title$ = router.events.pipe(
      switchMap(() => route.firstChild ? route.firstChild.title : NEVER),
      map(maybeTitle => maybeTitle ? maybeTitle : ""),
    );
  }

  onLogin() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  onLogout() {
    this.auth.signOut();
  }
}
