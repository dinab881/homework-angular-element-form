/**
 * Created by dina on 19.06.18.
 */
import {FormGroup} from '@angular/forms';
/*export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const pwd = AC.get('pwd'); // to get value in input tag
        const confirmPwd = AC.get('confirmPwd'); // to get value in input tag

        // If FormControl objects don't exist, return null
        if (!pwd || !confirmPwd) return null;

        //If they are indeed equal, return null
        if (pwd.value === confirmPwd.value) {
            return null;
        }
        //Else return false
        return {
            mismatch: true
        };
    }
}*/

export function PasswordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
        ? null : {'mismatch': true};
}