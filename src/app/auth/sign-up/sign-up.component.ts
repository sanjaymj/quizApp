import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHandlerService } from 'src/app/services/auth-handler.service';
import { Store } from 'src/app/services/store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {
  signupForm: FormGroup;

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
      this.auth.registerUser(this.signupForm.value['email'], this.signupForm.value['username'], this.signupForm.value['password'])
      .then(val => this.showHomePage())
      .catch(val => console.log(val));
    }
  }

  private showHomePage() {
    this.auth.isSignedIn = true;
    this.router.navigateByUrl("/home");
  }

}
