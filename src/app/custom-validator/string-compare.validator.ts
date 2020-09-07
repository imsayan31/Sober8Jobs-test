import { FormGroup, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
/*export function StringCompare(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if(matchingControl.errors && !matchingControl.errors.stringMatch) {
			return;
		}

		if(control.value !== matchingControl.value) {
			matchingControl.setErrors({ stringMatch: true});
		} else {
			matchingControl.setErrors(null);
		}
	}
	return null;
}*/

/*export function StringCompare(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: FormGroup): {[key: string]: any} => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if(matchingControl.errors && !matchingControl.errors.stringMatch) {
			return;
		}

		if(control.value !== matchingControl.value) {
			matchingControl.setErrors({ stringMatch: true});
		} else {
			matchingControl.setErrors(null);
		}
	}
}*/

export function StringCompare(targetKey: string, toMatchKey: string): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} => {
    const target = group.controls[targetKey];
    const toMatch = group.controls[toMatchKey];
    
    if (target.touched && toMatch.touched) {
      const isMatch = target.value === toMatch.value;
      
      // set equal value error on dirty controls
      if (!isMatch && target.valid && toMatch.valid) {
        toMatch.setErrors({equalValue: targetKey});
        const message = targetKey + ' != ' + toMatchKey;
        return {'equalValue': message};
      }

      if (isMatch && toMatch.hasError('equalValue')) {
        toMatch.setErrors(null);
      }
    }

    return null;
  };
}