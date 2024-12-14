import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.GetCustomerRole(sessionStorage.getItem('customer'));

  if(authService.isloggedin()){
    if(role == true) return true;
    else{
      router.navigate(['/home']);
      return false;
    }
  }
  else{
    router.navigate(['/']);
    return false;
  }
};