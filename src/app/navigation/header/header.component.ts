import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarState } from 'src/app/models/navbar.state.model';
import { AuthHandlerService } from 'src/app/services/auth-handler.service';
import { Store } from 'src/app/services/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output()
  public sidenavToggle = new EventEmitter();

  public navbarState = NavbarState;
  constructor(private router: Router, private route: ActivatedRoute, public store: Store, private auth: AuthHandlerService) {}

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public signOut() {
    this.auth.isSignedIn = false;
    localStorage.setItem('quizUserLoggedIn', "false");
    this.router.navigateByUrl("/login");
  }

}
