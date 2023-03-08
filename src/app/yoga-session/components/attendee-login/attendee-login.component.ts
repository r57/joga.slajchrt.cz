import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { NzMessageService } from "ng-zorro-antd/message";
import { NEVER, Observable } from "rxjs";
import {
  CodeConfirmationHandle,
  PhoneAuthService,
} from "src/app/firebase/phoneauth.service";
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
  sendCodeLoading$: Observable<boolean> = NEVER;
  private confirmationHandle: CodeConfirmationHandle | null = null;

  constructor(
    private fb: FormBuilder,
    private phoneAuth: PhoneAuthService,
    private messageService: NzMessageService,
  ) {}

  onSendCode() {
    const phoneControl = this.phoneAuthForm.controls["phone"];

    if (phoneControl.valid) {
      const phone = phoneControl.value!;
      const phoneWithPrefix = phone.startsWith("+") ? phone : "+420" + phone;

      this.phoneAuth.authenticate(phoneWithPrefix).then(
        (handle) => {
          this.confirmationHandle = handle;
        },
        (error) => {
          console.error(error);
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
