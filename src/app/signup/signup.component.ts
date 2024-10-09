import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnvironmentService } from '../services/environment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public userForm:any

  constructor(public http:HttpClient, public formdata:FormBuilder, public service:EnvironmentService, public routes:Router){ }
  ngOnInit(){
    this.userForm = this.formdata.group({
      'name' : ['', Validators.required],
      'lname' : ['', Validators.required],
      'statecode' : ['', [Validators.required, Validators.maxLength(4)]],
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required, this.passwordValidator]]
    })

  }

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const isValid = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value);
    return isValid ? null : { 'invalidPassword': true };
  }

  get statecode() {
    return this.userForm.get('statecode');
  }

  public msg:any =''

  onSubmit(){

    let obj = {
      name: this.userForm.value['name'],
      lname: this.userForm.value['lname'],
      statecode: this.userForm.value['statecode'],
      email: this.userForm.value['email'],
      password: this.userForm.value['password'],

    }

    console.log(obj);

    this.service.signUpUser(obj).subscribe((data: any) => {
      console.log(data);
      
      this.msg = data
      this.showMessageWithTimeout(this.msg, 3000)


      if (data.status === true) {
        alert("Registration Successfull")
        this.routes.navigate(['/signin'])

      }

    })
    
  }


  public showMsg = false

  showMessageWithTimeout(message: string, duration: number) {
    this.showMsg = true;

    setTimeout(() => {
      this.hideMessage();
    }, duration)

  }

  hideMessage() {
    this.msg = '';
    this.showMsg = false
  }
}
