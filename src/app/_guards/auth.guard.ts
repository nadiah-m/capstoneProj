import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../_Services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    const currentUser = this.authService.currentUserSubject.value;

    if (currentUser.email) {
      console.log('auth guard', currentUser);
      return true;
    }

    this.router.navigate(['/not-auth']);
    return false;
  }
}
