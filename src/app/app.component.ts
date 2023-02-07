import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as YogaSessionActions from './yoga-session/store/yoga-session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(store: Store) {
    store.dispatch(YogaSessionActions.loadYogaSessions());
  }

}
