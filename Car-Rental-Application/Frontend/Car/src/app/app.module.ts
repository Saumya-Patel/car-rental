import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './Admin/cars/cars.component';
import { HeaderComponent } from './header/header.component';
import { CustomersComponent } from './Admin/customers/customers.component';
import { RentsComponent } from './Admin/rents/rents.component';
import { ReturnsComponent } from './Admin/returns/returns.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';

import { DatePipe } from '@angular/common';
import { FilterPipe } from './filter.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCarComponent } from './Admin/edit-car/edit-car.component';
import { CarCardComponent } from './car-card/car-card.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { RentDialogComponent } from './rent-dialog/rent-dialog.component';
import { RentalTabComponent } from './rental-tab/rental-tab.component';
import { AdminRentalsComponent } from './admin-rentals/admin-rentals.component';
import { RentalEditComponent } from './rental-edit/rental-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    HeaderComponent,
    CustomersComponent,
    RentsComponent,
    ReturnsComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    FilterPipe,
    EditCarComponent,
    CarCardComponent,
    CarListComponent,
    CarDetailComponent,
    RentDialogComponent,
    RentalTabComponent,
    AdminRentalsComponent,
    RentalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
