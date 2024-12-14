import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { AlertService } from '../Services/alert.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rental-tab',
  templateUrl: './rental-tab.component.html',
  styleUrls: ['./rental-tab.component.css']
})
export class RentalTabComponent implements OnInit {

  userId:any;
  rentalsData:any;
  rentId:any;
  isAvailable:any;
  returnReq:boolean=false;
  startDateVal:any;
  endDateVal:any;

  acceeptedRental:any;
  requestRental:any;


  constructor(private service:APIService, private authservice: AuthService, private alertservice: AlertService){

  }

  ngOnInit(): void {
    this.authservice.GetCustomerSession().subscribe((res)=>{
      this.userId=this.authservice.GetId(res);
    });
    this.listRentals();
  }

  listRentals(){
    this.service.getUserRentals(this.userId).subscribe((res:any)=>{
      console.log('list rentals',res);
      this.rentalsData=res;

      this.processRentalData();
    },
    (error)=>{
      console.log("Error Fetching Rental Data",error);
    })
  }

  processRentalData(){
    if(this.rentalsData && this.rentalsData.length>0){
      this.rentalsData.forEach((item)=>{
        this.startDateVal=this.formatDate(item.startDate);
        this.endDateVal=this.formatDate(item.endDate);
        this.service.checkIsAvailable(item.carId).subscribe(
          (res)=>{
            this.rentId=item.rentId;
            this.isAvailable=res;
          },
          (error)=>{
            console.log(error.message);
          }
        )
      })
    }
  }

  formatDate(date:any){
    return date.toString().split("T")[0];
  }

  onClickDelete(id:any){
    this.service.deleteRental(id,this.userId).subscribe((res)=>{
      this.listRentals();
    })
  }

  onAccept(id:any){
    this.service.getRentalByRentId(id).subscribe((res)=>{
      this.acceeptedRental=res;
      this.acceeptedRental.isAccepted=true;

      const body={...this.acceeptedRental,"userId":this.userId};

      this.service.editRentalAgreement(id,body).subscribe({
        next:(res:any)=>{
          alert("Click Ok to accept Terms and Conditions");
          this.alertservice.openSnackBar("Accepted");
          this.listRentals();
        },
        error:(err:any)=>{
          console.log(err.error.message);
        }
      })
    })
  }

  onRequestReturn(id:any){
    this.service.getRentalByRentId(id).subscribe((res)=>{
      this.requestRental=res;
      this.requestRental.returnReq=true;
      this.returnReq=this.requestRental.returnReq;
      const body={...this.requestRental,"userId":this.userId};

      this.service.editRentalAgreement(id,body).subscribe({
        next:(res:any)=>{
          this.alertservice.openSnackBar("Request Sent");
          this.listRentals();
        },
        error:(err:any)=>{
          console.log(err.error.message);
        }
      })
    })
  }
}
