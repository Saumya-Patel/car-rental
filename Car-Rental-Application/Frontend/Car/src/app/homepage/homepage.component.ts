import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  customerName: string;
  role: boolean;
  customerNameSubscription: Subscription;

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.customerNameSubscription = this.authService
      .GetCustomerSession()
      .subscribe((customer) => {
        this.customerName = this.authService.GetCustomerName(customer);
        this.role = this.authService.GetCustomerRole(customer);
      });
  }

  ngOnDestroy(): void {
    this.customerNameSubscription.unsubscribe();
  }
}
