import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {
  private authUrl = environment.authApi + 'api/auth/';

  private static LOCAL_STORAGE_USER_LOGGED_IN_KEY = "quizUserLoggedIn";

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
      "password": password,
      "roles": ["user"]
  };
    return this.http.post(this.authUrl + 'signup', val).toPromise();
  }

  public set isSignedIn(val: boolean) {
    localStorage.setItem(AuthHandlerService.LOCAL_STORAGE_USER_LOGGED_IN_KEY, "true");
  }

  public get isSignedIn() {
    return JSON.parse(localStorage.getItem(AuthHandlerService.LOCAL_STORAGE_USER_LOGGED_IN_KEY)) === true;
  }

}
