/*! \file
This file serves as an authenticator for each user which allows only users to access internal components like home, 
files, arena, ide, etc. It is used in routing module for employing such restrictions.
*/

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private dataService: ApiService, private router: Router) {
  }

  /*! \brief
  This function checks the state of router and calls the boolean function isLogin() to check whether a user is logged in or not.
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const routeUrl: string = state.url;
    return this.isLogin(routeUrl);
  }

  /*! \brief
  This function calls Api Service to check the login status of the user and redirects the user to appropriate routes according to status.
  */

  isLogin(routeUrl: string): boolean {
    if (this.dataService.isLoggedIn()) {
      return true;
    }
    this.dataService.redirectUrl = routeUrl;
    this.router.navigate(['/login'], {queryParams: {returnUrl: routeUrl}});
  }
}
