import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/LoginResponse';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

 
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/authenticate`, { email, password }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Failed to login. Please try again.'));
      })
    );
  }

  register(name: string, email: string, password: string, isAdmin: boolean) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { name, email, password, isAdmin }).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Failed to register. Please try again.'));
      }),
      switchMap((response) => {
        this.saveToken(response.token);
        
        return this.login(email, password);
      })
    );
  }

  

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  
    const role = this.getUserRole();
    if (role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'USER') {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  

  getToken() {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean { 
    const token = this.getToken();
    if (!token) {
      console.warn('No token found');
      return false;
    }
  
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid token format');
        return false;
      }
  
      const payload = JSON.parse(atob(parts[1])); 
      console.log('Token is valid:', payload);
  
      return true;
    } catch (error) {
      console.error('Invalid token:', error); 
      return false; 
    }
  }
  
  
  
  getAuthHeaders() {
    const token = this.getToken();
    return token
      ? {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        }
      : {};
  }
  

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1])); 
    if (Array.isArray(payload.authorities) && payload.authorities.length > 0) {
      return payload.authorities[0]; 
    }
    return ''; 
  }
  
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/home']);
  }

  
  
}
