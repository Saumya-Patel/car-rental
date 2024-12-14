import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private builder: FormBuilder, 
    private _alert:AlertService,
    private service: APIService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  result: any;

  registerForm = this.builder.group({
    FullName: this.builder.control('',[Validators.required,Validators.maxLength(50),Validators.pattern("^[a-zA-Z ]*$")]),
    Address: this.builder.control('',[Validators.required,Validators.maxLength(50),Validators.pattern("^[a-zA-Z ]*$")]),
    EmailId: this.builder.control('', [Validators.required, Validators.email]),
    PhoneNumber:this.builder.control('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]),
    Password: this.builder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    ConfirmPassword: this.builder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)])
  });

  Register() {
    if (this.registerForm.valid) {
      if(this.registerForm.value.ConfirmPassword===this.registerForm.value.Password){
        this.service.RegisterCustomer(this.registerForm.value).subscribe({
          next: (item : any) => {
            this.result = item;    
            if (this.result != null) {  
              this._alert.openSnackBar('Registraton Done');
              this.router.navigate(['/homepage/login']);
            } 
            else {
              this._alert.openSnackBar('Already Registerd with same Email Id');
            }
          }, error: (err: any) => {
            console.log(err);
          },
        });
      }
      else{
        this._alert.openSnackBar('Password Does Not Match')
      }
    } else {
      this._alert.openSnackBar('Please fill all records with valid data !');
    }
  }
}
