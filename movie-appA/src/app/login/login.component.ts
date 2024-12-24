
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../interfaces/LoginResponse';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  email = '';
  password = '';
  isAdmin:any = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(5)]], 
    });
  }

  onLogin() {
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
       
        

          this.router.navigate(['/user-dashboard']); ;
        
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





