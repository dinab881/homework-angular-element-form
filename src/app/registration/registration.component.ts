import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../User';
import { PasswordValidation } from '../password-validation';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input()
  public showExtended: boolean = false;


  private user:User;
  registerForm: FormGroup;
  private genderList: string[];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password: this.fb.group({
        pwd: ['', [Validators.required, Validators.minLength(8)] ],
        confirmPwd: ['', [Validators.required, Validators.minLength(8)] ]
      }),
      firstName: '',
      lastName: '',
      gender: ''

    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }


  onSubmit() {
    if(this.registerForm.valid) {
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

  get password() { return this.registerForm.get('password'); }

  get gender() { return this.registerForm.get('gender'); }

  get terms() { return this.registerForm.get('terms'); }

}
