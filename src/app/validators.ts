import { AbstractControl, ValidationErrors } from "@angular/forms";

export function nameValidator(control: AbstractControl<string>): ValidationErrors | null {
  const hasName = /^\S{2,}\s+\S{2,}/.test(control.value.trim())
  return hasName ? null : { name: {} }
}

export function phoneValidator(control: AbstractControl<string>): ValidationErrors | null {
  const isPhone = /^\+?[1-9]\d{1,14}$/.test(control.value.trim());
  return isPhone ? null : { phone: {} }
}

export function codeValidator(control: AbstractControl<number>): ValidationErrors | null {
  const isCode = control.value > 99999 && control.value <= 999999;
  return isCode ? null : { code: {} }
}