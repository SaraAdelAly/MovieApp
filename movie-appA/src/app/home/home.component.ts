import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['login']); 
  }

  navigateToSignup() {
    this.router.navigate(['register']); 
  }

  navigateToAdminLogin() {
    this.router.navigate(['admin-login']); 
  }

}


