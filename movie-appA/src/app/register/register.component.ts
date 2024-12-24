import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { RegisterResponse } from '../interfaces/register-response';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private authService: AuthService, private apiService:ApiService, private router: Router, private _formBuilder: FormBuilder, private http: HttpClient, private _router: Router) {}

  registerForm!: FormGroup;
  name: string = '';
  email: string = '';
  password: string = '';
  isAdmin: any = 0;  
  emailExists: boolean= false;

  ngOnInit(): void {
 
      this.registerForm = this._formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        isAdmin: [0, [Validators.required]],
      });
  
    }
  
  


  onRegister() {
    const user = this.registerForm.value;
  
    console.log(user)
   
    this.apiService.post<FormData, RegisterResponse>("auth/register", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).subscribe({
      next: (response: RegisterResponse) => {
        localStorage.setItem('username', this.registerForm.get('email')?.value);
        const tokenStr = 'Bearer ' + response.token;
        localStorage.setItem('token', tokenStr);
  
       
        const isAdmin = response.isAdmin;

      if (isAdmin === 1) {
        this._router.navigate(['/admin-dashboard']);
      } else if (isAdmin === 0) {
        this._router.navigate(['/user-dashboard']);
      } else {
        this._router.navigate(['/login']);
      }
    },
      error: (error: any) => {
        console.error('Registration failed:', error);
      },
    });
  }
  validateEmail(){
    console.log(this.email);
    this.apiService.post("auth/email/check",this.email)
    .subscribe({
      next:(response: any)=>{
        console.log("resp " + response)
        this.emailExists=response
      },
      error:(error: any)=>{
        return null;
      }
    }
    );
}

    }
