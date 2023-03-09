import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DateTime } from "luxon";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RemoteConfigService } from "src/app/firebase/remoteconfig.service";

export interface YogaSessionFormValue {
  capacity: number;
  date: DateTime;
  place: string;
  lockHoursBefore: number;
}

@Component({
  selector: "app-session-admin-form",
  templateUrl: "./session-admin-form.component.html",
  styleUrls: ["./session-admin-form.component.scss"],
})
export class SessionAdminFormComponent {
  sessionForm = this.fb.group({
    capacity: [0, [Validators.required]],
    date: [new Date(), [Validators.required]],
    lockHoursBefore: [24, [Validators.required]],
    place: ["", [Validators.required]],
  });

  @Output() saveSession = new EventEmitter<YogaSessionFormValue>();

  @Input()
  set session(value: YogaSessionFormValue) {
    const {capacity, date, lockHoursBefore, place} = value;
    this.sessionForm.setValue({
      capacity,
      date: date.toJSDate(),
      lockHoursBefore,
      place,
    });
  }

  sessionPlaceSuggestions: Observable<string[]>;

  constructor(private fb: FormBuilder, configService: RemoteConfigService) {
    this.sessionPlaceSuggestions = configService.config$.pipe(
      map(config => config.sessionPlaces)
    );
  }

  onSessionFormSubmit() {
    const { capacity, date, lockHoursBefore, place } = this.sessionForm.value;
    if (
      this.sessionForm.valid &&
      capacity &&
      date &&
      lockHoursBefore &&
      place
    ) {
      this.saveSession.emit({
        capacity,
        date: DateTime.fromJSDate(date),
        lockHoursBefore,
        place,
      });
    }
  }
}
