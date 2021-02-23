import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthHandlerService } from "./auth-handler.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(private authService: AuthHandlerService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("here!!!")
    if (!this.authService.isSignedIn) {
      console.log("here!")
      this.router.navigate(["/"]); // or home
      return false;
    }
    return true;
  }
}
