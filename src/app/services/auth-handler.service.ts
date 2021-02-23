import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {
  private authUrl = environment.authApi + 'api/auth/';

  private _isSignedIn: boolean = false;

  constructor(private http: HttpClient) {}

  public loginUser(username: string, password: string) {
    const val = {
      "username": username,
      "password": password
  };
    return this.http.post(this.authUrl + 'signin', val).toPromise();
  }

  public registerUser(email: String, username: string, password: string) {
    const val = {
      "email": email,
      "username": username,
      "password": password
  };
    return this.http.post(this.authUrl + 'signup', val).toPromise();
  }

  public set isSignedIn(val: boolean) {
    this._isSignedIn = val;
    localStorage.setItem('quizUserLoggedIn', "true");
  }

  public get isSignedIn() {
    return JSON.parse(localStorage.getItem('quizUserLoggedIn')) === true;
  }

}
