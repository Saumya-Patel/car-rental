import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DateValidator } from './date.validator';
import {Subscription} from 'rxjs'
import { APIService } from '../Services/api.service';

@Component({
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  styleUrls: ['./rent-dialog.component.css']
})
export class RentDialogComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean;

  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<RentDialogComponent>,private router: Router, private activatedRoute: ActivatedRoute, private service : APIService){
    this.form=this.formBuilder.group({
      name:this.formBuilder.control('',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      email:this.formBuilder.control('',[Validators.required, Validators.email]),
      startDate:this.formBuilder.control(null,[Validators.required,DateValidator.validateDate]),
      endDate:this.formBuilder.control(null,[Validators.required,DateValidator.validateDate])
    })
  }

  ngOnInit(): void {
    // this.form.valueChanges.subscribe(()=>{
    //   console.log('form validity on value change',this.form.valid);
    // })
  }

  // routeSubscription= this.router.events.subscribe(event=>{
  //   if(event instanceof NavigationEnd){
  //     if(this.activatedRoute.snapshot.routeConfig?.path==='rent-dailog')
  //     this.form.reset();
  //   }
  // })

  onSubmit(){
    console.log('Form validity on submit',this.form.valid)
    if(this.form.valid){
      this.isSubmitted=true;
      this.service.setIsFormSubmitted(true);
      console.log('Form submitted',this.form.value);
      
      this.service.setRentalFormData(this.form.value);

      this.dialogRef.close();
      this.form.reset();
      // this.router.navigate(['/rental-tab'])
    }
  }
  

  get nameControl(){
    console.log('name validity',this.form.get('name').valid);
    return this.form.get('name');
  }

  get emailControl(){
    console.log('name validity',this.form.get('email').valid);
    return this.form.get('email')
  }

  get startDateControl(){
    console.log('startDate validity',this.form.get('startDate').valid);
    return this.form.get('startDate')
  }

  get endDateControl(){
    console.log('endDate validity',this.form.get('endDate').valid);
    return this.form.get('endDate')
  }



  onUserAction(){
    this.updateUserName();
    this.updateUserEmail();
    this.updateUserStartdate();
    this.updateUserEndDate();
  }

  updateUserName(){
    const inputValue= this.form.get('name').value;
    this.form.get('name').setValue(inputValue);
  }

  updateUserEmail(){
    const inputValue= this.form.get('email').value;
    this.form.get('email').setValue(inputValue);
  }

  updateUserStartdate(){
    const inputValue= this.form.get('startDate').value;
    this.form.get('startDate').setValue(inputValue);
  }

  updateUserEndDate(){
    const inputValue= this.form.get('endDate').value;
    this.form.get('endDate').setValue(inputValue);
  }

  // dateRangeValidator(group:FormGroup): {[key:string]:any}| null{
  //   const startDate= group.get('startDate').value;
  //   const endDate= group.get('enddate').value;

  //   if(startDate!= null && endDate!=null && startDate>=endDate){
  //     return {dateRangeValidator:true};
  //   }
  //   return null;
  // }
  

  onCancel(){
    this.dialogRef.close();
  }

  ngOnDestroy(){
    //this.routeSubscription.unsubscribe();
  }
}
