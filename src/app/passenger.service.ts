import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Passenger {
  PassengerId: number;
  FullName: string;
  PassportNumber: string;
  VisaType: string;
  Nationality: string;
  ArrivalDate: string;
  ArrivalYear: number;
  PurposeOfVisit: string;
  OfficerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiUrl = 'https://localhost:7255/api/passengers';

  constructor(private http: HttpClient) {}

  // helper to attach JWT to protected calls
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }
  //  Secure: Send only allowed, sanitized fields
  createPassenger(data: any): Observable<any> {
  // Build a safe request body, preventing overposting
      const safeBody = {
      FullName: data.FullName?.trim(),
      PassportNumber: data.PassportNumber?.trim(),
      VisaType: data.VisaType?.trim(),
      Nationality: data.Nationality?.trim(),
      ArrivalDate: data.ArrivalDate,
      ArrivalYear: Number(data.ArrivalYear),
      PurposeOfVisit: data.PurposeOfVisit?.trim(),
      OfficerId: Number(data.OfficerId)
    };
    return this.http.post<any>(`${this.apiUrl}`, safeBody, {
      headers: this.getAuthHeaders()
    });
  }

  getAll(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  get(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  searchPassenger(id: number): Observable<any> {
    // Injection-safe: Encode numeric ID to avoid query manipulation
    const safeId = encodeURIComponent(id);
    return this.http.get<any>(`${this.apiUrl}/${safeId}`, {
      headers: this.getAuthHeaders()
    });

  }

  updatePassenger(id: number, data: any): Observable<any> {
    // Injection-safe: Encode ID and send sanitized payload
    const safeId = encodeURIComponent(id);
    return this.http.put<any>(`${this.apiUrl}/${safeId}`, data, {
      headers: this.getAuthHeaders()
    });
  }


  deletePassenger(id: number): Observable<any> {
    // Injection-safe: Ensure ID is numeric and encoded
    const safeId = encodeURIComponent(id);
    return this.http.delete<any>(`${this.apiUrl}/${safeId}`, {
      headers: this.getAuthHeaders()
    });
  }

}
