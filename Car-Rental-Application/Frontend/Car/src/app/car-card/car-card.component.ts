import { Component, Input, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() car:any;
  username:any;

  constructor(private service: APIService, private authservice: AuthService,private router:Router){

  }

  ngOnInit(): void {
    this.authservice.GetCustomerSession().subscribe((response)=>{
      this.username=this.authservice.GetCustomerName(response);
    });
  }

  onClick(){
    if(this.username==null){
      this.router.navigate(['/home/login']);
    }
  }
}

