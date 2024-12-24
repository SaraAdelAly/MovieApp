import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private basic: string = "http://localhost:8081/api";

  constructor(private http: HttpClient) {}


get<T>(url: string, options?: { params?: HttpParams, headers?: HttpHeaders }): Observable<T> {
  return this.http.get<T>(`${this.basic}/${url}`, { ...options });
}


      post<T, U>(url: string, body: T, options?: { headers?: HttpHeaders }): Observable<U> {
        return this.http.post<U>(`${this.basic}/${url}`, body, options);
      }

      delete<T>(url: string, id: number, options?: { headers?: HttpHeaders }): Observable<T> {
          return this.http.delete<T>(`${this.basic}/${url}/${id}`,{...options});
      }

      
     put<T, U>(url: string, body: T, options?: { headers?: HttpHeaders }): Observable<U> {
        return this.http.put<U>(`${this.basic}/${url}`, body, options);
      }
}