import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../Services/api.service';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  manageCarsform: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: APIService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.manageCarsform = this.builder.group({
      VehicleId: this.builder.control('', [Validators.required, Validators.maxLength(10)]),
      Brand: this.builder.control('', [Validators.required, Validators.maxLength(20)]),
      Model: this.builder.control('', [Validators.required, Validators.maxLength(20)]),
      RentalPrice: this.builder.control('', [Validators.required, Validators.min(0.1)]),
      IsAvailable: this.builder.control(false, [Validators.required]) // Initialize with false (unavailable)
    });

    // Subscribe to Availability form control changes
    this.manageCarsform.get('IsAvailable').valueChanges.subscribe((value) => {
      // Check if the new value is different from the current value before setting it
      const currentAvailability = this.manageCarsform.get('IsAvailable').value;
      if (value !== currentAvailability) {
        // Convert the selected value to a boolean
        this.manageCarsform.get('IsAvailable').setValue(value === 'true');
      }
    });
  }

  manageCars() {
    console.log("Starting manageCars function");

    // Temporarily remove validation
    this.manageCarsform.clearValidators();
    this.manageCarsform.updateValueAndValidity();

    // Convert the selected value to a boolean
    const isAvailableValue = this.manageCarsform.get('IsAvailable').value === 'true';

    // Update the IsAvailable form control with the boolean value
    this.manageCarsform.get('IsAvailable').setValue(isAvailableValue);

    this.service.ManageCar(this.manageCarsform.value).subscribe({
        next: (item: any) => {
            console.log("API call successful");
            this._alert.openSnackBar('!! Product Added !!');
        },
        error: (error: any) => {
            console.error("API call error:", error);
            // Handle the error, e.g., display an error message to the user
        },
    });

    // After submission, you can reapply validation if needed
    this.addValidation();
}

  

  // Add validation back to the form controls
  addValidation() {
    this.manageCarsform.setValidators([
      Validators.required,
      Validators.maxLength(10), // Adjust validators as needed
      // Add more validators here
    ]);
    this.manageCarsform.updateValueAndValidity();
  }
}
