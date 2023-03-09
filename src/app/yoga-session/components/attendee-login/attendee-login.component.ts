import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { BehaviorSubject, Observable } from "rxjs";
import {
  CodeConfirmationHandle,
  PhoneAuthService,
} from "src/app/firebase/phoneauth.service";
import { RemoteConfigService } from "src/app/firebase/remoteconfig.service";
import { phoneValidator, codeValidator } from "src/app/validators";

@Component({
  selector: "app-attendee-login",
  templateUrl: "./attendee-login.component.html",
  styleUrls: ["./attendee-login.component.scss"],
})
export class AttendeeLoginComponent {
  phoneAuthForm = this.fb.group({
    code: ["", [Validators.required, codeValidator]],
    phone: ["", [Validators.required, phoneValidator]],
  });

  @Output() attendeeLogin: EventEmitter<void> = new EventEmitter();

  sendCodeCoolDown$: Observable<boolean>;

  private confirmationHandle: CodeConfirmationHandle | null = null;
  private sendCodeCoolDownSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private phoneAuth: PhoneAuthService,
    private messageService: NzMessageService,
    private configService: RemoteConfigService
  ) {
    this.sendCodeCoolDown$ = this.sendCodeCoolDownSubject.asObservable();
  }

  onSendCode() {
    const phoneControl = this.phoneAuthForm.controls["phone"];
    const onCoolDown = this.sendCodeCoolDownSubject.getValue();

    if (phoneControl.valid && !onCoolDown) {
      const phone = phoneControl.value!;
      const phoneWithPrefix = phone.startsWith("+") ? phone : "+420" + phone;
      const coolDown = this.configService.configSnapshot.sendCodeCoolDown;

      this.sendCodeCoolDownSubject.next(true);
      this.phoneAuth.authenticate(phoneWithPrefix).then(
        (handle) => {
          setTimeout(() => {
            this.sendCodeCoolDownSubject.next(false);
          }, coolDown * 1000);
          this.confirmationHandle = handle;
        },
        (error) => {
          console.error(error);
          this.sendCodeCoolDownSubject.next(false);
          this.messageService.error(
            "Nepodařilo se zaslat kód, zkuste to prosím později."
          );
        }
      );
    } else {
      // forces display of validation message
      phoneControl.markAsDirty();
      phoneControl.setErrors({ phone: true });
    }
  }

  onPhoneAuthFormSubmit() {
    const { code } = this.phoneAuthForm.value;

    if (code && this.confirmationHandle) {
      this.confirmationHandle.confirm(code).then(
        () => {
          this.confirmationHandle = null;
          this.attendeeLogin.emit();
        },
        (error) => {
          console.error(error);
          this.messageService.error(
            "Nepodařilo se ověřit kód, zkuste to prosím později."
          );
        }
      );
    }
  }

  awaitingConfirmation(): boolean {
    return this.confirmationHandle !== null;
  }
}
