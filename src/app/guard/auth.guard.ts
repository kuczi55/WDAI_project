import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      // tslint:disable-next-line: no-shadowed-variable
      return this.auth.authState$.pipe(map(state => {
        if (state !== null) { return true; }
        alert('Musisz być zalogowany!');
        this.router.navigate(['/list']);
        return false;
        }
      )
    );
  }
}
