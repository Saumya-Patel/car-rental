import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { AlertService } from '../Services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../Services/api.service';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.css']
})
export class RentalEditComponent implements OnInit {
  rentId:any;
  userId:any;
  rentalData:any; 
  
  totalDays: number=0; 
  startDateVal:any;

  minEndDate: any="";
  totalPrice: number=0;
  role: any;

  constructor(private formBuilder:FormBuilder,private service:APIService, private authservice:AuthService, private alertservice: AlertService,private router:Router,private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.rentId=this.route.snapshot.params['id'];
    if(this.rentId){
      this.service.getRentalByRentId(this.rentId).subscribe({
        next:(res:any)=>{
          this.rentalData=res;
          this.editRentalForm=this.formBuilder.group({
            startDate: this.formBuilder.control({
              value:this.formatStartDate(res.startDate),
              disabled:true
            },
            [Validators.required]),
            endDate:this.formBuilder.control(this.formatEndDate(res.endDate),[Validators.required]),
          });
        }
      })
    }
    this.authservice.GetCustomerSession().subscribe((res)=>{
      this.role=this.authservice.GetCustomerRole(res);
      this.userId=this.authservice.GetId(res);
    })
  }

  editRentalForm=this.formBuilder.group({
    startDate:this.formBuilder.control(new Date(),[Validators.required]),
    endDate:this.formBuilder.control(new Date(),[Validators.required])
  })

  formatStartDate(date:any){
    const arr= date.toString().split("T")[0].split("-");
    this.startDateVal=date.toString().split("T")[0];
    return date.toString().split("T")[0];
  }

  formatEndDate(date:any){
    console.log(date.toString().split("T")[0]);
    const arr= date.toString().split("T")[0].split("-");
    return date.toString().split("T")[0];
  }

  calculateTotal(e){
    const endDateChanged=new Date(e.target.value);
    
    const Time=endDateChanged.getTime()-new Date(this.startDateVal).getTime();
    
    console.log(endDateChanged,"time-",Time);
    
    this.totalDays=Math.ceil(Time/(1000 * 3600 *24));
    
    const rentalPrice = this.rentalData.rentalPrice; 
    
    this.totalPrice = this.totalDays * rentalPrice;
  }


  onSubmit(){
    if (this.editRentalForm.valid) {
      if(this.rentId){
        this.service.editRentalAgreement(this.rentId, this.editRentalForm.value).subscribe({
          next: (val:any)=>{
            this.alertservice.openSnackBar('Saved');
            if(this.role){
              this.router.navigate(['/admin/all-rental']);

            }
            else{
              this.router.navigate([`/user-rental/${this.rentalData.userId}`]);
            }
          },
          error:(err:any)=>{
            console.warn("error");
          }
        });
        
      }

    }

  }

  onBack(){
    if(this.role){
      this.router.navigate([`/admin/all-rental/`]);
    }
    else{
      this.router.navigate([`/user-rental/${this.userId}`]);
    }
  }
}
