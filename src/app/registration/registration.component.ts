import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';


import { User } from './../User';
import { PasswordMatchValidator } from '../password-validation';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnChanges {
  private _extended = false;

 @Input()
 set extended(extended) {
   if (extended === null) {
     this._extended = true;
   }
   if (extended === undefined) {
     this._extended = false;
   }
 }
  get extended(): boolean { return this._extended; }

 @Output() formIsValid = new EventEmitter();
 @Output() formIsInvalid = new EventEmitter();
 @Output() formIsSubmitted = new EventEmitter();


  private user: User;
  registerForm: FormGroup;
  private genderList: string[];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)] ],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)] ]
      }, {
        validator: PasswordMatchValidator // your validation method
      })/*,
      firstName: '',
      lastName: '',
      gender: ''*/

    });
    // console.log('---',this.registerForm);
  }

  ngOnChanges(changes) {
    console.log('Changed', changes.extended.currentValue, changes.extended.previousValue);
    if ( this.extended ) {
      this.registerForm.addControl('firstName', new FormControl());
      this.registerForm.addControl('lastName', new FormControl());
      this.registerForm.addControl('gender', new FormControl());

    } else {
      this.registerForm.removeControl('firstName');
      this.registerForm.removeControl('lastName');
      this.registerForm.removeControl('gender');
    }
  }

  onSubmit() {
    if ( this.registerForm.valid ) {
      this.user = this.registerForm.value;
      this.formIsSubmitted.emit();
      console.log(this.user);
      /* Any API call logic via services goes here */
   }
  }

  ngOnInit() {
    console.log('ext', this.extended);

    this.genderList =  ['Male', 'Female', 'Others'];

    this.registerForm.statusChanges.pipe(
      filter(status => status === 'INVALID'))
      .subscribe(() => {
        // console.log('form errors', this.registerForm.errors);
        // console.log('status changes');

        let errs = [];
        errs = this.findInvalidControls(this.registerForm);

        this.formIsInvalid.emit(errs);
      });

    this.registerForm.statusChanges.pipe(
      distinctUntilChanged(),
      filter(status => status === 'VALID'))
      .subscribe(() => {
        this.formIsValid.emit();
      });

    }

  saveUser() {
    const formModel = this.registerForm.value;
  }

  get email() { return this.registerForm.get('email'); }

  get passwordGroup() { return this.registerForm.get('passwordGroup'); }

  get password() {
    // console.log(this.registerForm.get('passwordGroup.password'));
    return this.registerForm.get('passwordGroup.password');
  }
  get confirmPassword() { return this.registerForm.get('passwordGroup.confirmPassword'); }

  get gender() { return this.registerForm.get('gender'); }

  get terms() { return this.registerForm.get('terms'); }

  public findInvalidControls(formGroup, errs = []) {
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        if (controls[name] instanceof FormGroup) {
           // console.log('type',typeof controls[name]);
           this.findInvalidControls(controls[name], errs);
        }
        else {
         // console.log('here2',controls[name], name);
          errs[name] = formGroup.get(name).errors;
        }

      }
    }
    return errs;
  }

}
