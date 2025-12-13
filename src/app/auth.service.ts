import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'https://localhost:7255/api/auth';
  private tokenKey = 'jwt_token';
  private roleKey = 'user_role';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }

        // store role if backend includes it in response payload
        if (res?.role) {
          localStorage.setItem(this.roleKey, res.role);
        } else {
          // fallback: decode token to extract role claim
          try {
            const payload = JSON.parse(atob(res.token.split('.')[1]));
            const decodedRole =
              payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (decodedRole) localStorage.setItem(this.roleKey, decodedRole);
          } catch {}
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /* Decode JWT to get username and role */
  getUser(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username:
          payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role:
          payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
}
