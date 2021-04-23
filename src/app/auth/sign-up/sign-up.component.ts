import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthHandlerService } from 'src/app/services/auth-handler.service';
import { Store } from 'src/app/services/store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {
  signupForm: FormGroup;

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading$: Observable<boolean> =this.isLoading$$.asObservable();

  constructor(private auth: AuthHandlerService, private router: Router, private store: Store) {
    this.store.enterRegisterScreen();
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy() {
    this.store.exitUserAuthModule();
  }

  onSubmit() {
    if(this.signupForm.valid) {
      this.isLoading$$.next(true);
      this.auth.registerUser(this.signupForm.value['email'], this.signupForm.value['username'], this.signupForm.value['password'])
      .then(_val => this.showHomePage())
      .catch(_val => {
        alert("Failed to register user")
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
