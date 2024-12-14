import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  private customerSubject = new BehaviorSubject<string>(sessionStorage.getItem('customer'));


  CreatingCustomerSession(customer: any) {
    // sessionStorage.setItem('customer', JSON.stringify(customer));
    // this.customerSubject.next(sessionStorage.getItem('customer'));
    const customerJson= JSON.stringify(customer);
    sessionStorage.setItem('customer',customerJson);
    this.customerSubject.next(customerJson);
    console.log(customerJson);
  }

  RemoveCustomerSession() {
    sessionStorage.removeItem('customer');
    this.customerSubject.next(sessionStorage.getItem('customer'));
  }

  GetCustomerSession(): Observable<any> {
    return this.customerSubject.asObservable();
  }

  GetCustomerName(customer: any) {
    return JSON.parse(customer)?.name?.toUpperCase();
  }

  GetId(customer:any) {
    return JSON.parse(customer)?.userId;
  }

  isloggedin() {
    return sessionStorage.getItem('customer') != null;
  }

  GetCustomerRole(customer: any) {
    return JSON.parse(customer)?.isAdmin;
  }

}
