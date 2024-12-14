import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AlertService } from '../Services/alert.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-rentals',
  templateUrl: './admin-rentals.component.html',
  styleUrls: ['./admin-rentals.component.css']
})
export class AdminRentalsComponent implements OnInit {
  username: any;
  totalPrice: any;
  agreementData: any;
  isAvailable: any;
  totalDays: any;
  userId: any;
  returnData: any;
  startDateValue: any;
  endDateValue: any;

  constructor(
    private service: APIService, private route: ActivatedRoute, private authservice: AuthService, private alertservice: AlertService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.authservice.GetCustomerSession().subscribe((res) => {
      this.userId = this.authservice.GetId(res);
    });

    this.listRentals();
  }

  listRentals() {
    this.service
      .getAllRentals().subscribe((res) => {
        this.agreementData = res;
        this.processAgreementData();
      })
  }

  processAgreementData(){
    if(this.agreementData && this.agreementData.length>0){
      this.agreementData.forEach((obj)=>{
        this.startDateValue = this.formatDate(obj.startDate);
        this.endDateValue = this.formatDate(obj.endDate);

        this.service.checkIsAvailable(obj.carId).subscribe(
          (res)=>{
            this.isAvailable=res;
          },
          (error)=>{
            console.log(error.message);
          }
        )
      })
    }
  }

  formatDate(date: any) {
    console.log(date.toString().split('T')[0]);
    const arr = date.toString().split('T')[0].split('-');
    return date.toString().split('T')[0];
  }

  onReturn(id:any){
    this.service.deleteRental(id,this.userId).subscribe((res)=>{
      this.listRentals();
    })
  }

  onClickDelete(id:any){
    this.service.deleteRental(id,this.userId).subscribe((res)=>{
      this.listRentals();
    })
  }

}
