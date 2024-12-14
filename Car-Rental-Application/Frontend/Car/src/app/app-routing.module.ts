import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { RentalTabComponent } from './rental-tab/rental-tab.component';
import { RentalEditComponent } from './rental-edit/rental-edit.component';
import { AdminRentalsComponent } from './admin-rentals/admin-rentals.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'home/login', component: LoginComponent },
  { path: 'home/register', component: RegisterComponent },
  { path: 'car-detail/:id', component:CarDetailComponent},
  { path: 'user-rental/:id',component:RentalTabComponent},
  { path: 'edit-rental/:id',component:RentalEditComponent},
  { path: 'admin/all-rental',component:AdminRentalsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
