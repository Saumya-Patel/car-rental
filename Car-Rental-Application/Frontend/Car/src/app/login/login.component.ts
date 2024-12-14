import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private _alert:AlertService,
    private service: APIService, 
    private router: Router, 
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  result: any;
  
  loginForm = this.builder.group({
    EmailId: this.builder.control('', [Validators.required, Validators.email]),
    Password: this.builder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)])
  });
  
  Login() {
    if (this.loginForm.valid) {
      this.service.LoginCustomer(this.loginForm.value).subscribe({
        next: (item: any) => {
          this.result = item;
          // console.log(this.result);
          if (this.result != null) {
            if (this.result.password === this.loginForm.value.Password) {
              this.auth.CreatingCustomerSession(this.result)
              this._alert.openSnackBar('Login Successfully');
              this.router.navigate(['/']);
            }
            else {
              this._alert.openSnackBar('Invalid Credentials!');
              this.router.navigate(['/home/login']);
            }
          }
        },
        error:(err:any)=>{
          alert(err.error.message);
        }
      });
    }
  }
}
