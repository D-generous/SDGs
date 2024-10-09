import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let routes = inject(Router)
  let user = JSON.parse(localStorage.getItem('food')!)

  if(!user){
    routes.navigate(['/signin'])
  }
  
  return true;
};
