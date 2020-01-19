import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      // tslint:disable-next-line: no-shadowed-variable
      return this.auth.authState$.pipe(map(state => {
        // tslint:disable-next-line: triple-equals
        if (state !== null && this.auth.getUserRole() == 'admin') { return true; }

        alert('Musisz być administratorem!');
        this.router.navigate(['/list']);
        return false;
        }
      )
    );
  }
}
