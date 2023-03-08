import { Injectable } from "@angular/core";
import { RecaptchaVerifier, getAuth } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";

export class CodeConfirmationHandle {
  constructor(private confirmFn: (code: string) => Promise<void>) {}

  confirm(code: string): Promise<void> {
    return this.confirmFn(code);
  }
}

@Injectable()
export class PhoneAuthService {
  private auth = getAuth();
  private recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    },
    this.auth
  );

  constructor(private angularFireAuth: AngularFireAuth) {}

  async authenticate(phone: string): Promise<CodeConfirmationHandle> {
    const confirmationResult = await this.angularFireAuth.signInWithPhoneNumber(
      phone,
      this.recaptchaVerifier
    );

    return new CodeConfirmationHandle((code) =>
      confirmationResult.confirm(code).then()
    );
  }

}
