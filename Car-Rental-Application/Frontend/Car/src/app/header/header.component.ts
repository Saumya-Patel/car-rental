import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  customerName: string;
  role: boolean;
  customerNameSubscription: Subscription;
  customerId:any;

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.customerNameSubscription = this.authService
      .GetCustomerSession()
      .subscribe((user) => {
        this.customerName = this.authService.GetCustomerName(user);
        this.role = this.authService.GetCustomerRole(user);
        this.customerId=this.authService.GetId(user);
      });
  }

  ngOnDestroy(): void {
    if(this.customerNameSubscription){
      this.customerNameSubscription.unsubscribe();
    }
  }
  
  LogoutButton() {
    this.authService.RemoveCustomerSession();
    this.router.navigate(['/']);
  }
}
