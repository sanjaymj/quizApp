import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthHandlerService } from 'src/app/services/auth-handler.service';
import { Store } from 'src/app/services/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {

  loginForm: FormGroup;
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading$: Observable<boolean> =this.isLoading$$.asObservable();

  constructor(private auth: AuthHandlerService, private router: Router, private store: Store) {
    this.store.enterLoginScreen();
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy() {
    this.store.exitUserAuthModule();
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.isLoading$$.next(true);
      this.auth.loginUser(this.loginForm.value['username'], this.loginForm.value['password'])
      .then(_val => this.showHomePage())
      .catch(_val => {
        alert("invalid user credentials. Failed to login");
        this.isLoading$$.next(false);
      });
    }
  }

  private showHomePage() {
    this.isLoading$$.next(false);
    this.auth.isSignedIn = true;
    this.router.navigateByUrl("/home");
  }

}
