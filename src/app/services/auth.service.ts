import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login'; // Remplacez par l'URL réelle de votre API Django

  constructor(private http: HttpClient) { }

  private getCsrfToken(): string | null {
    return document.cookie.split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1] || null;
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCsrfToken() || ''  // Inclure le CSRF token
    });

    return this.http.post<any>(this.loginUrl, { email, password }, { headers }).pipe(
      tap(response => {
        if (response.jwt) {
          // Stocker le token JWT dans le localStorage ou sessionStorage
          localStorage.setItem('jwt', response.jwt);
        }
      })
    );
  }
  logout(): void {
    localStorage.removeItem('jwt'); // Supprimez le token lors de la déconnexion
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Vérifie si un token est présent
  }
  
}
