/*! \file
This service file is used to register a user and login purposes, also it sets tokens for each user and they can be retrieved also
through this service. Contains functions to set,get and delete user tokens and also to check login status of a user.
*/

import {EventEmitter, Injectable, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string;
  baseUrl = 'http://localhost/sfcode/backend/';

  @Output() getLoggedInState: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }

  /*! \brief
  This function is used to log in the user by posting username and password as it's parameters to the backend php scripts.
  */

  public userLogin(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/login.php', {username, password})
      .pipe(map(user => {
        if (user.length === 0) {
          throw new Error();
        }
        this.setToken(JSON.stringify(user));
        this.getLoggedInState.emit(true);
        return user;
      }));
  }

  /*! \brief
  This function is used to register the user by posting name, email, username and password as it's parameters to the backend php scripts.
  */

  public userReg(name, email, pwd, username): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', {name, email, pwd, username})
      .pipe(map(user => {
        return user;
      }));
  }

  /*! \brief
  This function is used to set token for the user to the local storage.
  */

  setToken(token: string): void {
    localStorage.setItem('sfcode_user_token_2n1289bpxd', token);
  }

  /*! \brief
  This function is used to get token for the user from the local storage.
  */

  getToken(): string {
    return localStorage.getItem('sfcode_user_token_2n1289bpxd');
  }

  /*! \brief
  This function is used to delete token from the local storage.
  */

  deleteToken(): void {
    localStorage.removeItem('sfcode_user_token_2n1289bpxd');
  }

  /*! \brief
  This function is used to check the login state of the user by the availability of token  in local storage.
  */

  isLoggedIn(): boolean {
    const userToken = this.getToken();
    return userToken != null;
  }
}
