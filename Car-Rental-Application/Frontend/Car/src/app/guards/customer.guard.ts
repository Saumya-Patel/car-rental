import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role=authService.GetCustomerRole(sessionStorage.getItem('customer'))

  if (authService.isloggedin()){
    if(role === false)return true;
    else {
      router.navigate(['/']);
      return false;
    }
  } 
  else {
    router.navigate(['/']);
    return false;
  }
};

