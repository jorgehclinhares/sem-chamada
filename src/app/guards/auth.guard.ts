import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RequestService } from '../providers/request.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private request: RequestService
  ) { };

  async canActivate(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      if (!this.request.getToken()) {
        throw new Error();
      }
      return Promise.resolve(true);
    } catch (err) {
      this.router.navigate(['/logout']);
      return Promise.reject(false);
    }
  }

}
