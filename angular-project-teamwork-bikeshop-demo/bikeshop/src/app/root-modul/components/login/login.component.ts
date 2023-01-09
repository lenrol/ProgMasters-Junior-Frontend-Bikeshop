import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public get email(): FormControl {
    return this.loginForm.controls['email'] as FormControl;
  }

  public get password(): FormControl {
    return this.loginForm.controls['password'] as FormControl;
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public login() {
    this.loginService.login(this.loginForm.value).subscribe();
  }

}
