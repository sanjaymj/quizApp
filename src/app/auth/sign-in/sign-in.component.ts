import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthHandlerService } from 'src/app/services/auth-handler.service';
import { Store } from 'src/app/services/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {

  loginForm: FormGroup;
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
      this.auth.loginUser(this.loginForm.value['username'], this.loginForm.value['password'])
      .then(val => this.showHomePage())
      .catch(val => console.log(val));
    }
  }

  private showHomePage() {
    this.auth.isSignedIn = true;
    this.router.navigateByUrl("/home");
  }

}
