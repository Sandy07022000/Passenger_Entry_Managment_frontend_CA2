import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  // Vulnerability: Hardcoded API URL (no environment files)
  // Vulnerability: HTTP instead of HTTPS
  private apiUrl = 'http://localhost:5123/api/passengers';

  constructor(private http: HttpClient) { }

  // Vulnerability: No validation or sanitization of data
  // Vulnerability: Sends full object enabling mass assignment on backend
  createPassenger(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Vulnerability: ID accepted directly from uncontrolled user input
  searchPassenger(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Vulnerability: No pagination, no rate limiting
  getAllPassengers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updatePassenger(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deletePassenger(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
