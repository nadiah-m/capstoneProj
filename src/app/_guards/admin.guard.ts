import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_Services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    const currentUser = this.authService.currentUserSubject.value;

    if (currentUser.email && currentUser.role == 'Admin') {
      return true;
    }
    const error = 'You are not authorized to this page';
    console.log(error);
    window.alert(error);
    this.router.navigate(['/login']);

    return false;
  }
}
