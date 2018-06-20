import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../User';
import { PasswordMatchValidator } from '../password-validation';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

 @Input() showExtended: boolean = false;

  @Output()
  formValid = new EventEmitter();


  private user:User;
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
    //console.log('---',this.registerForm);
    if(this.showExtended){
      //console.log('---',this.registerForm);
      this.registerForm.addControl('firstName', new FormControl());
      this.registerForm.addControl('lastName', new FormControl());
      this.registerForm.addControl('gender', new FormControl());

    }

  }


  onSubmit() {
    if(this.registerForm.valid) {
      this.formValid.next();
      this.user = this.registerForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
    }
  }

  ngOnInit() {
    this.genderList =  ['Male', 'Female', 'Others'];
  }

  saveUser(){
    const formModel = this.registerForm.value;
  }

  get email() { return this.registerForm.get('email'); }

  get passwordGroup() { return this.registerForm.get('passwordGroup'); }

  get password() {
    //console.log(this.registerForm.get('passwordGroup.password'));
    return this.registerForm.get('passwordGroup.password');
  }
  get confirmPassword() { return this.registerForm.get('passwordGroup.confirmPassword'); }

  get gender() { return this.registerForm.get('gender'); }

  get terms() { return this.registerForm.get('terms'); }

}
