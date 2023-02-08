import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


import * as YogaSessionActions from './yoga-session/store/yoga-session.actions';
import * as AppActions from './store/app.actions';
import * as AppSelectors from './store/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  $loggedIn: Observable<boolean>;

  constructor(store: Store, private auth: AngularFireAuth) {
    this.$loggedIn = store.select(AppSelectors.selectLoggedIn);

    store.dispatch(YogaSessionActions.loadYogaSessions());
    store.dispatch(AppActions.loadAuth());

  }

  onLogin() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  
  onLogout() {
    this.auth.signOut();
  }

}
