import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable()
export class AuthService {
  public errorStream$: Subject<string> = new Subject<string>();
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  get token(): any {
    const expToken = localStorage.getItem('token-exp-date');
    const expDate = new Date(Number(expToken));
    const token = localStorage.getItem('token');
    if (new Date() > expDate) {
      this.logout();
      return null;
    } else {
      return token;
    }
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${environment.apiPaths.user.login}`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    return this.setToken(null);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    const { error } = errorResponse;
    this.errorStream$.next(error);
    return throwError(errorResponse);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('token-exp-date', expDate.toString());
      localStorage.setItem('token', response);
    } else {
      localStorage.clear();
    }
  }
}
