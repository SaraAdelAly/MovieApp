import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class adminGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log("loggggggged")
      return true;
    }
    this.router.navigate(['/home']);
    console.log("NOOOOOOOOOOOOOOOOOOOOtloggggggged")

    return false;
  }
}
