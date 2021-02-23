import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NavbarState } from "../models/navbar.state.model";

@Injectable({
  providedIn: 'root'
})
export class Store {
  private hideStandardNavBar$$: BehaviorSubject<NavbarState> = new BehaviorSubject<NavbarState>(NavbarState.DEFAULT);
  public hideStandardNavBar$: Observable<NavbarState> = this.hideStandardNavBar$$.asObservable();

  public enterLoginScreen() {
    this.hideStandardNavBar$$.next(NavbarState.LOGIN);
  }

  public enterRegisterScreen() {
    this.hideStandardNavBar$$.next(NavbarState.REGISTER);
  }

  public exitUserAuthModule() {
    this.hideStandardNavBar$$.next(NavbarState.DEFAULT);
  }
}
