import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { LoginResponse } from '../interfaces/LoginResponse';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule],
  
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  email = '';
  password = '';
  isAdmin:any = 1;
  loading = false;


  constructor(

  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private apiService: ApiService
) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(5)]], 

  });
}
  
  onAdminLogin() {
      const user = this.loginForm.value;
    
      console.log(user)
     
      this.apiService.post<FormData, LoginResponse>("auth/authenticate", user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }).subscribe({
        next: (response: LoginResponse) => {
          const isAdmin = response.isAdmin;
          this.authService.saveToken(response.token);
  
         
          localStorage.setItem('username', this.loginForm.get('email')?.value);
          const tokenStr = 'Bearer ' + response.token;
          localStorage.setItem('token', tokenStr);
         
  
            this.router.navigate(['/admin-dashboard']); // Normal user
        
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password.';
        },
      });}
    //  else {
    //   this.errorMessage = 'Please fill in all required fields.';
    // }
  }
  
  
  
  
  
  