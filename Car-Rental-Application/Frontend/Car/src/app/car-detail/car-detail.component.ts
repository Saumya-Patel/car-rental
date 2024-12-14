import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { RentDialogComponent } from '../rent-dialog/rent-dialog.component';
import { AuthService } from '../Services/auth.service';
import { AlertService } from '../Services/alert.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: any;
  carId: any;
  carDetail: any
  formData: any
  isFormSubmitted: boolean
  minDate: any;
  startDate: Date = new Date();
  showStartDate: any = "";
  formatStartDate: any = "";
  formatEndDate: any = "";
  endDate: any;
  totalPrice: number = 0;
  totalDays: number = 0;
  userId: any;
  isAvailable: any;
  role: any;

  constructor(private route: ActivatedRoute, private service: APIService, private dialog: MatDialog, private authservice: AuthService, private router: Router, private alertService: AlertService) {

  }

  ngOnInit() {
    this.getDate()
    this.carId = this.route.snapshot.params['id'];
    this.getCar();
    // this.formData= this.service.getRentalFormData();
    // console.log(this.formData);
    // this.isFormSubmitted=this.service.getIsFormSubmitted();
    this.authservice.GetCustomerSession().subscribe((res) => {
      this.userId = this.authservice.GetId(res);
      this.role = this.authservice.GetCustomerRole(res);
    })
  }

  getCar() {
    this.service.getCarDetail(this.carId).subscribe(response => {
      this.carDetail = response;
      // console.log("car-details",this.carDetail)
    })
  }

  getDate() {
    var date: any = new Date();
    var tdate: any = date.getDate();
    if (tdate < 10) {
      tdate = "0" + tdate;
    }
    var month: any = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var year: any = date.getFullYear();
    this.minDate = year + "-" + month + "-" + tdate;

    this.showStartDate = tdate + "-" + month + "-" + year;

  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}T08:00:00`;
  }

  calculateTotal() {


    const endDateModified = new Date(this.endDate);

    this.formatEndDate = this.formatDate(endDateModified);
    this.formatStartDate = this.formatDate(this.startDate);

    const Time = endDateModified.getTime() - this.startDate.getTime();

    this.totalDays = Math.ceil(Time / (1000 * 3600 * 24));


    const rentalPrice = this.carDetail.rentalPrice; //car price from fetched data
    this.totalPrice = this.totalDays * rentalPrice;
  }

  onClick() {
    console.log("Helo");

    console.log(this.userId, parseInt(this.carId));
    console.log("date", this.role)

    const rentInfo = [
      { key: 'startDate', value: this.formatStartDate },
      { key: 'endDate', value: this.formatEndDate },
      { key: 'rentedPrice', value: this.carDetail.rentalPrice },
      { key: 'userId', value: this.userId },
      { key: 'carId', value: parseInt(this.carId) },
    ];
    const rentInfoObject: { [key: string]: any } = {};
    rentInfo.forEach(item => {
      rentInfoObject[item.key] = item.value;
    });


    //available condition , toast
    this.service.checkIsAvailable(this.carId).subscribe((res) => {
      this.isAvailable = res;
      if (this.isAvailable) {
        this.alertService.openSnackBar("available");
        //send rent info
        this.service.postRentInfo(rentInfoObject).subscribe((res) => {
          //this.router.navigate([`/home/my-rental/${this.userId}`]);
          this.router.navigate(['/home']);

        },
          (error) => {
            alert("Error posting rentinfo");
          }
        );

      }
      else {
        this.alertService.openSnackBar("Sorry!! Car is not Available");
        this.router.navigate(['/home']);

      }
    },
      (error) => {
        alert(error.message);

      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(RentDialogComponent, {
      width: '600px',
      position: { top: '10px', left: '24%' },
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Dialog Was Closed');
    });
  }

}
