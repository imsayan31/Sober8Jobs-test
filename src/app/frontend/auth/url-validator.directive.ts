import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';
import { Directive, Input, NgModule } from '@angular/core';

@NgModule()
@Directive({
  selector: '[appURLValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: 'URLValidator', multi: true}]
})
export class URLValidator implements Validator {
  @Input('appURLValidator') urlValidate: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.urlValidate
    ? urlInputValidator(
      new RegExp(this.urlValidate,
      'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'))(control)
    : null;
  }
}

export function urlInputValidator(value: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log(control.value);
    return;
    const forbidden = value.test(control.value);
    /* return forbidden ? { urlValidate : { value: control.value } } : null; */
    return forbidden ? { urlValidate : { valid: false } } : null;
  };
}
