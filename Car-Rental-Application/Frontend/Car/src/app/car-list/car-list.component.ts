import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: any;

  constructor(private service: APIService){

  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.service.getAllCars().subscribe(response=>{
      this.cars=response;
      // console.log(this.cars);
    })
  }
  

}
